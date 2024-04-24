import React, { useState, useRef } from 'react';
import styles from './styles.module.css';
import CheckBoxForm from 'common/CheckBoxForm';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from '../../util/js/icon';

export default function Input({
  text = '',
  bonusText = '',
  type = '',
  value,
  setData = (e) => {},
  textStyles = '',
  placeholder = '',
  canChange = true,
  onEnter = (e) => {},
  defaultValue = '',
  isSelect = false,
}) {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const [canSeen, setCanSeen] = useState(false);
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      width: '100%',
      height: '50px',
      borderRadius: '8px',
      border: '1px solid #e6e6f0',
      padding: '0 6px',
      backgroundColor: 'white',
      color: '#757575',
    }),
  };
  const selectRef = useRef();
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////

  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const handlePassword = () => {
    setCanSeen(!canSeen);
  };

  const checkIsRow = (ctn) => {
    if (ctn === 'root') {
      return type.includes('row') ? 'h-40' : 'flex-column mBottom10';
    }
    if (ctn === 'input') {
      return type.includes('row') ? styles.input2 : styles.input;
    }
    if (ctn === 'text') {
      return !type.includes('row') ? 'mBottom10' : styles.textCtn1;
    }
  };

  const handleOptions = () => {
    const options = [];
    if (value !== undefined) {
      if (isSelect) {
        for (let i = 0; i < value.length; i++) {
          options.push({ value: value[i], label: value[i].Name });
        }
      }
      else {
        for (let i = 0; i < value.length; i++) {
          options.push({ value: value[i], label: value[i] });
        }
      }
    }
    return options;
  };

  const handleOnKeyDown = (e) => {
    if (e.code === 'Enter' && type.includes('keydown')) {
      setData(e.target.value);
    }
  };

  const handleChangeSelect = (value) => {
    setData(value);
  };
  //////////////////////////////////////////////////
  // #endregion FUNCTIONS //////////////////////////

  // #region    VIEWS //////////////////////////////
  //////////////////////////////////////////////////
  const renderInput = () => {
    if (type.includes('select')) {
      return (
        <div className={`${styles.selectCtn}`}>
          <Select
            ref={selectRef}
            value={{
              value: placeholder !== '' ? placeholder : defaultValue,
              label: placeholder !== '' ? placeholder : defaultValue,
            }}
            options={handleOptions()}
            styles={colourStyles}
            onChange={(item) => handleChangeSelect(item.value)}
            onKeyDown={(e) => handleOnKeyDown(e)}
          />
        </div>
      );
    }
    if (type.includes('date')) {
      return (
        <div>
          <input
            type="date"
            className={`${checkIsRow('input')} ${styles.inputDate}`}
            onChange={(e) => setData(e.target.value)}
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onEnter();
            }}
          />
        </div>
      );
    }
    if (type.includes('checkbox')) {
      return (
        <div className="mTop10">
          <CheckBoxForm
            text={text}
            textStyles={textStyles}
            checked={placeholder}
            setCheck={setData}
          />
        </div>
      );
    }
    if (type.includes('textarea')) {
      return (
        <div>
          <textarea
            className={`${styles.textareaCtn}`}
            value={value}
            onChange={(e) => setData(e.target.value)}
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onEnter();
            }}
          ></textarea>
        </div>
      );
    }
    if (type.includes('password')) {
      return (
        <div>
          <input
            type={!canSeen ? 'password' : 'text'}
            className={`${checkIsRow('input')}`}
            value={value}
            onChange={(e) => setData(e.target.value)}
            placeholder={placeholder}
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = placeholder)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onEnter();
            }}
          />
          {type === 'password' && (
            <div className={styles.icon} onClick={() => handlePassword()}>
              {canSeen ? (
                <FontAwesomeIcon icon={icon.eye} />
              ) : (
                <FontAwesomeIcon icon={icon.eyeSlash} />
              )}
            </div>
          )}
        </div>
      );
    }
    if (type.includes('text')) {
      return (
        <div>
          {canChange ? (
            <input
              type="text"
              className={`${checkIsRow('input')}`}
              value={value}
              onChange={(e) => setData(e.target.value)}
              placeholder={placeholder}
              onFocus={(e) => (e.target.placeholder = '')}
              onBlur={(e) => (e.target.placeholder = placeholder)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onEnter();
              }}
            />
          ) : (
            <div className={`text14SemiBold ${styles.cantChangeInput}`}>
              {value}
            </div>
          )}
        </div>
      );
    }
    return <></>;
  };
  //////////////////////////////////////////////////
  // #endregion VIEWS //////////////////////////////
  return (
    <div className={`${styles.root} ${checkIsRow('root')}`}>
      {type !== 'checkbox' && (
        <div className={`${styles.textCtn} ${checkIsRow('text')}`}>
          <p className="textH6Bold text-nowrap">{text}</p>
          {bonusText !== '' && (
            <p className={`text14 mLeft10 ${styles.text}`}>{bonusText}</p>
          )}
        </div>
      )}
      <div className={`${styles.inputCtn}`}>{renderInput()}</div>
    </div>
  );
}

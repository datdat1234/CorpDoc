import React, { useState } from 'react';
import styles from './styles.module.css';

export default function CheckBoxForm({
  text = '',
  textStyles = '',
  checked = false,
  arrChecked = [],
  setArrChecked = (value) => {},
  setCheckAll = (value) => {},
  isCheckAllInput = false,
  setIsCheckAllInput = (value) => {},
  index = -1
}) {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const [change, setChange] = useState(true);
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////

  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const handleCheck = () => {
    let items = arrChecked;
    
    if (index > -1) {
      items[index] = !items[index];
      setArrChecked(items);
    }
    else {
      if (isCheckAllInput) {
        for (let i=0; i<items.length; i++) items[i] = !isCheckAllInput;
      }
      else {
        for (let i=0; i<items.length; i++) items[i] = !isCheckAllInput;
      }
      setIsCheckAllInput(!isCheckAllInput);
    }
    setChange(!change);
  };
  //////////////////////////////////////////////////
  // #endregion FUNCTIONS //////////////////////////

  // #region    VIEWS //////////////////////////////
  //////////////////////////////////////////////////

  //////////////////////////////////////////////////
  // #endregion VIEWS //////////////////////////////
  return (
    <div className={`${styles.root}`}>
      <div
        className={`form-check d-flex align-items-center ${styles.checkBoxCtn}`}
      >
        <input
          className={`form-check-input ${styles.checkBox}`}
          type="checkbox"
          checked={index === -1? isCheckAllInput: arrChecked[index]}
          onChange={handleCheck}
        />
        <label className={`form-check-label ${textStyles} ${styles.text}`}>
          {text}
        </label>
      </div>
    </div>
  );
}

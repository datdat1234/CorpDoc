import React, { useState } from 'react';
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from 'util/js/icon';

export default function CriteriaTag({
  text = '',
  style = '',
  handleClick,
  isShowIcon = true,
}) {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////

  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////

  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////

  //////////////////////////////////////////////////
  // #endregion FUNCTIONS //////////////////////////

  // #region    VIEWS //////////////////////////////
  //////////////////////////////////////////////////

  //////////////////////////////////////////////////
  // #endregion VIEWS //////////////////////////////
  return (
    <div className={`${styles.root} ${style}`}>
      <p className="text14Bold">{text}</p>
      {isShowIcon && (
        <button className="mLeft10" onClick={() => handleClick(text)}>
          <FontAwesomeIcon icon={icon.xmark} />
        </button>
      )}
    </div>
  );
}

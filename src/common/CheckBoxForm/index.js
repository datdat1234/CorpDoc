import React, { useState } from 'react';
import styles from './styles.module.css';

export default function CheckBoxForm({
  text = '',
  checkBoxStyles = {},
  textStyles = {},
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
    <div className={`${styles.root}`}>
      <div
        className={`form-check d-flex align-items-center ${styles.checkBoxCtn}`}
      >
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          style={checkBoxStyles}
        />
        <label
          className="form-check-label"
          style={textStyles}
        >
          {text}
        </label>
      </div>
    </div>
  );
}
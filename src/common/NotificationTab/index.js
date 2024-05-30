import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

export default function NotificationTab({ noti }) {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const date = Date.parse(noti.Time)
  const formattedDate = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', year: 'numeric', month: 'numeric', day: 'numeric' }).format(date);


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
    <div
      className={`w-100 text14
        ${styles.root} 
        ${!noti.IsSeen && 'bg-subColor1'}`}
      onClick={() => { console.log("click") }}
    >
      <div className={`ellipsis text14SemiBold`}>
        {noti.Title}
      </div>
      <div className={`${styles.descrCtn}`}>
        {noti.Description}.
      </div>
      <div
        className={`text-end text mTop5 fst-italic`}
      >
        {formattedDate}
      </div>
    </div>
  );
}

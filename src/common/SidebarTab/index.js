import React from 'react';
import styles from './styles.module.css';

export default function SidebarTab({
  tabItems = [],
  ctnStyles = '',
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
  const renderTab = () => {
    const tabs = [];
    for (let i = 0; i < tabItems.length; i++) {
      tabs.push(
        <li className="w-100 nav-item" key={i}>
          {tabItems[i]}
        </li>
      );
    }

    return tabs;
  };
  //////////////////////////////////////////////////
  // #endregion VIEWS //////////////////////////////
  return (
    <div className={`w-100 ${styles.root} ${ctnStyles}`}>
      <ul className="nav nav-pills nav-fill d-flex flex-column">
        {renderTab()}
      </ul>
    </div>
  );
}

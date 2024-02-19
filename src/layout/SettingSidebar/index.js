import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import SidebarTab from 'common/SidebarTab';
import Button from 'common/Button';
import {
  PROFILE_TABS,
  PROFILE_TABS_ICON,
  PROFILE_NAVIGATE,
  PROFILE_TABS_MANAGER,
  PROFILE_TABS_MANAGER_ICON,
  PROFILE_NAVIGATE_MANAGER,
  PROFILE_TABS_ADMIN,
  PROFILE_TABS_ADMIN_ICON,
  PROFILE_NAVIGATE_ADMIN 
} from 'util/js/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navigate } from 'react-router-dom';

export default function SettingSidebar() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const userInfo = useSelector((state) => state.app.userInfo);
  let profileTab, profileTabIcon, profileNavigate;
  switch (userInfo.role){
    case 'admin':
      profileTab = PROFILE_TABS_ADMIN;
      profileTabIcon = PROFILE_TABS_ADMIN_ICON;
      profileNavigate = PROFILE_NAVIGATE_ADMIN;
      break;
    case 'manager':
      profileTab = PROFILE_TABS_MANAGER;
      profileTabIcon = PROFILE_TABS_MANAGER_ICON;
      profileNavigate = PROFILE_NAVIGATE_MANAGER;
      break;
    default:
      profileTab = PROFILE_TABS;
      profileTabIcon = PROFILE_TABS_ICON;
      profileNavigate = PROFILE_NAVIGATE;
  }
  console.log(profileNavigate);
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
  
  const renderTabItems = () => {
    const tabItems = [];
    for (let i = 0; i < profileTab.length-1; i++) {
      tabItems.push(
        <div key={i} className={`mBottom5 ${styles.tabCtn}`}>
          <Button
            name={profileTab[i]}
            btnStyles={`textH6ExtraBold ${styles.buttonText}
            ${currentTab === i ? 'bg-header' : 'bg-bgColor4'}`}
            ctnStyles={`br-TopRight-10 br-BottomRight-10 p10 border-bottom-1 border-header border-style-solid
              ${currentTab === i ? 'bg-header' : 'bg-bgColor4'}
            `}
            icon1={<FontAwesomeIcon icon={profileTabIcon[i].left} />}
            onClick={() => {
              setCurrentTab(i);
              profileNavigate[i] !== '' && navigate(profileNavigate[i]);
            }}
          />
        </div>
      );
    }
    return tabItems;
  };
  //////////////////////////////////////////////////
  // #endregion VIEWS //////////////////////////////
  return (
    <div className={`${styles.root}`}>
      <SidebarTab
        tabItems={renderTabItems()}
        ctnStyles="pVertical50 pRight40"
      />
    </div>
  );
}

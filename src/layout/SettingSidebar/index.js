import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

export default function SettingSidebar() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(0);
  const userInfo = useSelector((state) => state.app.userInfo);
  let profileTab, profileTabIcon, profileNavigate;
  switch (userInfo.Role){
    case 'Admin':
      profileTab = PROFILE_TABS_ADMIN;
      profileTabIcon = PROFILE_TABS_ADMIN_ICON;
      profileNavigate = PROFILE_NAVIGATE_ADMIN;
      break;
    case 'Manager':
      profileTab = PROFILE_TABS_MANAGER;
      profileTabIcon = PROFILE_TABS_MANAGER_ICON;
      profileNavigate = PROFILE_NAVIGATE_MANAGER;
      break;
    default:
      profileTab = PROFILE_TABS;
      profileTabIcon = PROFILE_TABS_ICON;
      profileNavigate = PROFILE_NAVIGATE;
  }
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(()=>{
    switch (location.pathname){
      case '/staff-manage':
        setCurrentTab(userInfo.Role === 'Manager'? 1 : 3);
        break;
      case '/dept-manage':
        setCurrentTab(2);
        break;
      case '/company-manage':
        setCurrentTab(1);
        break;
      default: setCurrentTab(0);
    }
  },[])

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

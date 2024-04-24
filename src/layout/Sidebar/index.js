import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './styles.module.css';
import SidebarTab from 'common/SidebarTab';
import FolderStruct from 'common/FolderStruct';
import FolderSupStruct from 'common/FolderSupStruct';
import Button from 'common/Button';
import {
  SIDEBAR_TABS,
  SIDEBAR_NAVIGATE,
  SIDEBAR_ICONS,
  SIDEBAR_TABS_ADMIN,
  SIDEBAR_NAVIGATE_ADMIN,
  SIDEBAR_ICONS_ADMIN,
  SIDEBAR_STRUCTURE,
} from 'util/js/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getChildByFolderId, getSupportStructure, getUsedStorage, getCrtDept } from 'util/js/APIs';

export default function Sidebar({}) {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(0);
  const [child, setChild] = useState([]);
  const userInfo = useSelector((state) => state.app.userInfo);
  var switchFolder = useSelector((state) => state.app.folderPage);
  const [adminDomain, setAdminDomain] = useState({name: 'Văn bản hành chính', childs: []});
  const [bookDomain, setBookDomain] = useState({name: 'Thư viện sách', childs: []});
  const [usedStorage, setUsedStorage] = useState(0);
  const [crtDept, setCrtDept] = useState('');
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      const rootId = await localStorage.getItem('root');
      const childRes = await getChildByFolderId(rootId);
      setChild(childRes?.data?.data?.child);

      // get support tree
      const adminDomainRes = await getSupportStructure(userInfo.DeptID, 'admin-doc');
      const adminDomain = adminDomainRes?.data?.data?.dataRes;
      setAdminDomain(adminDomain);
      const bookDomainRes = await getSupportStructure(userInfo.DeptID, 'book');
      const bookDomain = bookDomainRes?.data?.data?.dataRes;
      setBookDomain(bookDomain);

      //get used storage
      const usedStorageRes = await getUsedStorage (userInfo.DeptID);
      setUsedStorage(usedStorageRes?.data?.data > 1.5 ? 1.5 : usedStorageRes.data?.data); 

      //get name dept
      const crtDeptRes = await getCrtDept();
      setCrtDept(crtDeptRes?.data?.data?.deptInfo?.Name);
      
    };

    fetchData();
  }, [switchFolder]);

  useEffect(()=>{
    if (location.pathname === '/home') {
      if (userInfo.Role === 'Admin') setCurrentTab(1);
      else setCurrentTab(0);
    }
  },[location.pathname])
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
    if (userInfo.Role === 'Admin') {
      for (let i = 0; i < SIDEBAR_TABS_ADMIN.length; i++) {
        tabItems.push(
          <div
            key={SIDEBAR_TABS_ADMIN.length - i + 2}
            className={`mBottom5 ${styles.tabCtn}`}
          >
            <Button
              name={SIDEBAR_TABS_ADMIN[i] + (i===1 ? crtDept : '')}
              btnStyles={`textH6ExtraBold ${styles.buttonText}
              ${currentTab === i ? 'bg-header' : 'bg-bgColor4'}`}
              ctnStyles={`br-TopRight-10 br-BottomRight-10 p10 border-bottom-1 border-header border-style-solid
                ${currentTab === i ? 'bg-header' : 'bg-bgColor4'}
              `}
              icon1={<FontAwesomeIcon icon={SIDEBAR_ICONS_ADMIN[i]} />}
              onClick={() => {
                setCurrentTab(i);
                navigate(SIDEBAR_NAVIGATE_ADMIN[i])
              }}
            />
          </div>
        );
      }
    }
    else {
      for (let i = 0; i < SIDEBAR_TABS.length; i++) {
        if (
          userInfo.Role === 'Manager' ||
          (userInfo.Role === 'Staff' && SIDEBAR_TABS[i] !== 'Thùng rác')
        ) {
          tabItems.push(
            <div key={i} className={`mBottom5 ${styles.tabCtn}`}>
              <Button
                name={SIDEBAR_TABS[i] + (i===0 ? crtDept : '')}
                btnStyles={`textH6ExtraBold ${styles.buttonText}
                ${currentTab === i ? 'bg-header' : 'bg-bgColor4'}`}
                ctnStyles={`br-TopRight-10 br-BottomRight-10 p10 border-bottom-1 border-header border-style-solid
                  ${currentTab === i ? 'bg-header' : 'bg-bgColor4'}
                `}
                icon1={<FontAwesomeIcon icon={SIDEBAR_ICONS[i]} />}
                onClick={() => {
                  setCurrentTab(i);
                  navigate(SIDEBAR_NAVIGATE[i]);
                }}
              />
            </div>
          );
        }
      }
    }
    return tabItems;
  };

  const renderFolderStructs = () => {
    const tabItems = [];
    tabItems.push(
      <div key={1}>
        <FolderSupStruct
          name={adminDomain.name}
          childs={adminDomain.childs}
          typeDoc={"admin-doc"}
        />
      </div>,
      <div key={2}>
        <FolderSupStruct
          name={bookDomain?.name}
          childs={bookDomain?.childs}
          typeDoc={"book"}
        />
      </div>
    );
    return tabItems;
  };

  const renderUserStructs = () => {
    if (!child) return [];
    const tabItems = [];
    for (let i = 0; i < child.length; i++) {
      tabItems.push(
        <div key={i}>
          <FolderStruct
            name={child[i].Name}
            ident={child[i].FolderID}
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
        ctnStyles="pVertical20 pRight60"
      />
      <div className={`${styles.folderStruct}`}>
        <div className={`${styles.structCtn}`}>{renderFolderStructs()}</div>
        <div className={`${styles.spacer}`}></div>
        <div className={`${styles.structCtn}`}>{renderUserStructs()}</div>
      </div>
      <div className={`${styles.storageCtn} pVertical15 pHorizontal15`}>
        <p className="text14 pVertical5">
          {1.5-usedStorage < 0.5 && <p className="error text14Bold">Đã sử dụng gần hết bộ nhớ</p>}
          Đã sử dụng {usedStorage} GB trong tổng số 1.5 GB ({Math.round(((100 / 1.5) * usedStorage) * 100) / 100}%)
        </p>
        <div className={`${styles.progressCtn} progress bg-text60`}>
          <div
            className={`${styles.progressBar} progress-bar bg-main`}
            style={{ width: (((100 / 1.5) * usedStorage))+'%' }}
          ></div>
        </div>
      </div>
    </div>
  );
}

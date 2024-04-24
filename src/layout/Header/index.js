import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo1 from 'asset/images/logo1.png';
import styles from './styles.module.css';
import Button from 'common/Button';
import HoverModal from 'common/HoverModal';
import NotificationBox from 'common/NotificationBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from 'util/js/icon';
import {
  UPLOAD_TABS,
  CREATE_STRUCTURE,
  UPLOAD_TABS_ICON,
  SEARCH_TABS,
  SEARCH_TABS_ICON,
  PROFILE_TABS,
  PROFILE_NAVIGATE,
  PROFILE_TABS_MANAGER,
  PROFILE_NAVIGATE_MANAGER,
  PROFILE_TABS_ADMIN,
  PROFILE_NAVIGATE_ADMIN,
} from 'util/js/constant';
import { getDomainFolder, getNoti, getDept, getCrtDept, setCrtDeptAdmin } from 'util/js/APIs';
import Select from 'react-select';
import { setFolderPage, setUserInfo } from '../../redux/action/app';

////////API IMPORT //////////////////////////////////
////////////////////////////////////////////////////
import { logout } from 'util/js/APICaller';

export default function Header() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.app.userInfo);
  const switchFolder = useSelector((state) => state.app.folderPage);
  const [isHovered, setIsHovered] = useState(0);
  const [openNoti, setOpenNoti] = useState(false);
  const [uploadTab, setUploadTab] = useState([]);
  const [uploadNavigate, setUploadNavigate] = useState([]);
  const [uploadIcon, setUploadIcon] = useState([]);
  const [smallhoverIDs, setSmallhoverIDs] = useState([]);
  const [uploadSmallhover, setUploadSmallhover] = useState([]);
  const [noti, setNoti] = useState([]);
  const [notiAlert, setNotiAlert] = useState(false);
  let profileTab, profileTabIcon, profileNavigate;
  switch (userInfo.Role) {
    case 'admin':
      profileTab = PROFILE_TABS_ADMIN;
      profileNavigate = PROFILE_NAVIGATE_ADMIN;
      break;
    case 'Manager':
      profileTab = PROFILE_TABS_MANAGER;
      profileNavigate = PROFILE_NAVIGATE_MANAGER;
      break;
    default:
      profileTab = PROFILE_TABS;
      profileNavigate = PROFILE_NAVIGATE;
  }
  profileTabIcon = Array(profileTab.length - 1).fill({
    left: null,
    right: icon.caretRight,
  });
  profileTabIcon.push({ left: null, right: icon.rightFromBracket });

  // Dept for Admin
  const [depts, setDepts] = useState([]);
  const [crtDept, setCrtDept] = useState({DeptID: '', Name: ''});
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      width: '100%',
      borderRadius: '15px',
      padding: '10px 10px',
      border: 'none',
      backgroundColor: '#dfe0df',
      fontWeight: '900',
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      width: '100%',
      height: '50px',
      padding: '15px 15px',
      fontWeight: '500',
      backgroundColor: isFocused && '#402e32',
      color: isFocused? '#fff' : '#000',
    })
  };
  const selectRef = useRef();
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      if (userInfo && userInfo.DeptID) {
        // Get Dept for Admin
        if (userInfo.Role === 'Admin') {
          const deptsRes = await getDept();
          setDepts(deptsRes?.data?.data?.dept);
          const crtDeptAdminRes = await getCrtDept();
          const crtDeptAdmin = crtDeptAdminRes?.data?.data?.deptInfo;
          setCrtDept(crtDeptAdmin? crtDeptAdmin : deptsRes?.data?.data?.dept[0]);
        }

        // get domainfolder
        const folderRes = await getDomainFolder(userInfo?.DeptID);
        const folders = folderRes?.data?.data?.domainIds;
        let domainUpload = [];
        if (userInfo.Role === 'Admin') {
          domainUpload = [
            'Tài liệu mật',
            'Thư viện sách',
            'Văn bản hành chính',
          ]; 
        }
        else {
          domainUpload = [
            'Thư viện sách',
            'Văn bản hành chính',
          ]; 
        }
        let domainNavigate = [];
        if (userInfo.Role === 'Admin') {
          domainNavigate = [
            () => {
              handleMouseLeave();
              navigate('/upload-file-private');
            },
            () => {
              handleMouseLeave();
              navigate('/upload-file-support', {
                state: { supportType: 'book' },
              });
            },
            () => {
              handleMouseLeave();
              navigate('/upload-file-support', {
                state: { supportType: 'admin-docs' },
              });
            },
          ]; 
        } 
        else {
          domainNavigate = [
            () => {
              handleMouseLeave();
              navigate('/upload-file-support', {
                state: { supportType: 'book' },
              });
            },
            () => {
              handleMouseLeave();
              navigate('/upload-file-support', {
                state: { supportType: 'admin-docs' },
              });
            },
          ]; 
        }
        let domainIcon = [];
        if (userInfo.Role === 'Admin') {
          domainIcon = [
            { left: null, right: icon.caretRight },
            { left: null, right: icon.caretRight },
            { left: null, right: icon.caretRight },
          ]; 
        }
        else {
          domainIcon = [
            { left: null, right: icon.caretRight },
            { left: null, right: icon.caretRight },
          ];
        }
        let domainSmallhover = [];
        if (folders !== undefined) {
          for (let i = 0; i < folders.length; i++) {
            domainUpload.push(folders[i].Name);
            domainNavigate.push(() => {
              handleMouseLeave();
              navigate('/upload-file', { state: { id: folders[i].FolderID } });
            })
            domainIcon.push({ left: null, right: icon.caretRight });
            if (userInfo.Role === 'Admin') domainSmallhover.push(i+3);
            else domainSmallhover.push(i+2);
            setUploadSmallhover(prevState => ([...prevState, folders[i].FolderID]))
          }
        }

        if (userInfo?.Role !== 'Staff') {
          domainUpload.push(CREATE_STRUCTURE[0]);
          domainNavigate.push(
            () => {
              handleMouseLeave();
              navigate('/upload-folder', { state: { newStructure: true } });
            }
          );
          domainIcon.push(UPLOAD_TABS_ICON[0]);
        }

        setUploadTab(domainUpload);
        setUploadNavigate(domainNavigate);
        setUploadIcon(domainIcon);
        setSmallhoverIDs(domainSmallhover);
        // Get noti

        const notiRes = await getNoti(userInfo.UserID);
        const notis = notiRes?.data?.data?.noti;
        const isNotiAlert = notiRes?.data?.data?.isNew;
        setNoti(notis);
        setNotiAlert(isNotiAlert);

      }
    };

    fetchData();
  }, [userInfo || crtDept]);

  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const setOnClick = (profileNavigate) => {
    let onClick = [];
    profileNavigate.forEach((element) => {
      if (element === '')
        onClick.push(() => {
          handleMouseLeave();
          // console.log('ok');
        });
      else if (element === '/login')
        onClick.push(() => {
          logout();
        });
      else
        onClick.push(() => {
          handleMouseLeave();
          navigate(element);
        });
    });
    return onClick;
  };

  const handleMouseEnter = (i) => {
    setIsHovered(i);
  };

  const handleMouseLeave = () => {
    setIsHovered(0);
  };

  const handleClickNotiBtn = async () => {
    setOpenNoti(!openNoti);
  };
  //////////////////////////////////////////////////
  // #endregion FUNCTIONS //////////////////////////
  const handleOptions = () => {
    const options = [];
    if (depts !== undefined) {
      for (let i = 0; i < depts.length; i++) {
        options.push({ value: depts[i], label: depts[i].Name });
      }
    }
    return options;
  };

  const handleChangeSelect = async (value) => {
    setCrtDept(value);
    await setCrtDeptAdmin(value.DeptID);
    dispatch(setFolderPage(!switchFolder))
    userInfo.DeptID = value.DeptID;
    dispatch(setUserInfo(userInfo));
  };

  // #region    VIEWS //////////////////////////////
  //////////////////////////////////////////////////
  const renderUserInfo = () => {
    return (
      <div>
        <p className={`${styles.name} ellipsis`}>{userInfo.Name}</p>
        <p className={`${styles.role}`}>
          {userInfo.Role === 'Staff' && 'Nhân viên'}
          {userInfo.Role === 'Manager' && 'Trưởng phòng'}
          {userInfo.Role === 'Admin' && 'Quản trị viên'}
        </p>
      </div>
    );
  };

  //////////////////////////////////////////////////
  // #endregion VIEWS //////////////////////////////
  return (
    <div
      className={`row-2 d-flex align-items-center justify-content-start ${styles.headerCtn}`}
    >
      <div className={styles.logoCtn} onClick={() => navigate('/home')}>
        <img className={styles.logo} src={logo1} alt={'Logo'}></img>
      </div>
      <div className={styles.remainCtn}></div>
      {userInfo.Role === 'Admin' && (
        <div className="position-relative">
          {isHovered === 1 || isHovered === 2 ? (
            <Button
              ctnStyles="d-flex align-items-center justify-content-between pHorizontal15 br-15 bg-bgColor3"
              icon1Styles="text"
              icon1={<FontAwesomeIcon icon={icon.userGroup} size={`lg`} />}
              onClick={() => ({})}
            />
          ) : (
            <div className='d-flex align-items-center justify-content-between br-15 bg-bgColor3'>
            <Select
              ref={selectRef}
              value={{ value: crtDept?.DeptID, label: crtDept?.Name }}
              options={handleOptions()}
              styles={colourStyles}
              onChange={(item) => handleChangeSelect(item.value)}
            />
            </div>
          )}
        </div>
      )}
      <div
        className="position-relative"
        onMouseEnter={() => handleMouseEnter(1)}
        onMouseLeave={() => handleMouseLeave()}
      >
        {isHovered === 1 ? (
          <Button
            name={'Tải lên tài liệu'}
            ctnStyles="d-flex align-items-center justify-content-between pHorizontal15 br-TopLeft-15 br-TopRight-15 bg-bgColor5"
            icon1Styles="header"
            icon2Styles="header mLeft10"
            btnStyles="textH6Black bg-bgColor5 header mHorizontal5"
            icon1={<FontAwesomeIcon icon={icon.fileArrowUp} size={`lg`} />}
            icon2={<FontAwesomeIcon icon={icon.chevronDown} />}
            onClick={() => ({})}
          />
        ) : (
          <Button
            ctnStyles="d-flex align-items-center justify-content-between pHorizontal15 br-15 bg-bgColor5"
            icon1Styles="header"
            icon1={<FontAwesomeIcon icon={icon.fileArrowUp} size={`lg`} />}
            onClick={() => ({})}
          />
        )}
        {isHovered === 1 && (
          <HoverModal
            ctnStyles="bg-bgColor4 border-color-bg5"
            icon={uploadIcon}
            name={uploadTab}
            lastBtnStyles={
              userInfo.Role === 'Staff' ? '' : 'textH6Black header bg-bgColor5'
            }
            lastBtnColor={
              userInfo.Role === 'Staff' ? 'bg-bgColor4' : 'bg-bgColor5'
            }
            isFolder={true}
            onClick={uploadNavigate}
            smallHoverIDs={smallhoverIDs}
            onClickSmallHover={uploadSmallhover}
            setIsHovered1={setIsHovered}
          />
        )}
      </div>
      <div
        className="position-relative"
        onMouseEnter={() => handleMouseEnter(2)}
        onMouseLeave={() => handleMouseLeave()}
      >
        {isHovered === 2 ? (
          <Button
            name={'Tìm kiếm'}
            ctnStyles="d-flex align-items-center justify-content-between pHorizontal15 br-TopLeft-15 br-TopRight-15 bg-bgColor5"
            icon1Styles="header"
            icon2Styles="header mLeft10"
            btnStyles="textH6Black bg-bgColor5 header mHorizontal5"
            icon1={<FontAwesomeIcon icon={icon.magnifyingGlass} size={`lg`} />}
            icon2={<FontAwesomeIcon icon={icon.chevronDown} />}
            onClick={() => ({})}
          />
        ) : (
          <Button
            ctnStyles="d-flex align-items-center justify-content-between pHorizontal15 br-15 bg-bgColor5"
            icon1Styles="header"
            icon1={<FontAwesomeIcon icon={icon.magnifyingGlass} size={`lg`} />}
            onClick={() => ({})}
          />
        )}
        {isHovered === 2 && (
          <HoverModal
            ctnStyles="bg-bgColor4 border-color-text"
            icon={SEARCH_TABS_ICON}
            name={SEARCH_TABS}
            onClick={[
              () => {
                handleMouseLeave();
                navigate('/search-file');
              },
              () => {
                handleMouseLeave();
                navigate('/search-folder');
              },
            ]}
          />
        )}
      </div>
      {userInfo.Role !== 'Staff' && (
        <div
          className="position-relative"
          onMouseEnter={() => handleMouseEnter()}
          onMouseLeave={() => handleMouseLeave()}
        >
          <Button
            ctnStyles="d-flex align-items-center justify-content-between pHorizontal15 br-15 bg-bgColor3"
            icon1Styles="text"
            icon1={<FontAwesomeIcon icon={icon.fileCircleCheck} size={`2x`} />}
            onClick={() => navigate('/approval')}
          />
        </div>
      )}
      <div
        className="position-relative"
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
      >
        {!openNoti ? (
          <div className={`${styles.notiBtnCtn}`}>
            <Button
              ctnStyles="d-flex align-items-center justify-content-between pHorizontal15 br-15 bg-bgColor3"
              icon1Styles="text"
              icon1={<FontAwesomeIcon icon={icon.bell} size={`2x`} />}
              onClick={handleClickNotiBtn}
            />
            {notiAlert && <div className={`${styles.notiBtnAlert}`}></div>}
          </div>
        ) : (
          <Button
            ctnStyles="d-flex align-items-center justify-content-between pHorizontal15 br-15 br-BottomRight-2 bg-bgColor3"
            icon1Styles="text"
            icon1={<FontAwesomeIcon icon={icon.bell} size={`2x`} />}
            onClick={handleClickNotiBtn}
          />
        )}
        {openNoti && <NotificationBox notis={noti} />}
      </div>
      <div
        className="position-relative"
        onMouseEnter={() => handleMouseEnter(3)}
        onMouseLeave={() => handleMouseLeave()}
      >
        {isHovered === 3 ? (
          <Button
            name={renderUserInfo()}
            ctnStyles="d-flex align-items-center justify-content-between pHorizontal15 br-TopLeft-15 br-TopRight-15 bg-header"
            icon2Styles="text mLeft10"
            icon2={<FontAwesomeIcon icon={icon.chevronDown} />}
            onClick={() => ({})}
          />
        ) : (
          <Button
            name={renderUserInfo()}
            ctnStyles="d-flex align-items-center justify-content-between pHorizontal15 br-15 bg-header"
            icon2Styles="text mLeft10"
            icon2={<FontAwesomeIcon icon={icon.chevronDown} />}
            onClick={() => ({})}
          />
        )}
        {isHovered === 3 && (
          <HoverModal
            ctnStyles="bg-bgColor4 border-color-header"
            icon={profileTabIcon}
            name={profileTab}
            lastBtnStyles="textH6Black bg-header"
            lastBtnColor="bgColor5 bg-header"
            spacerColor="bg-header"
            onClick={setOnClick(profileNavigate)}
          />
        )}
      </div>
    </div>
  );
}

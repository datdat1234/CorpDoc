import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import Button from 'common/Button';
import SrcItem from 'common/SrcItem';
import Pagination from 'common/Pagination';
import Input from 'common/Input';
import { STAFF_ADMIN_MANAGE_GRIDS } from 'util/js/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from 'util/js/icon';
import { getDeptName, resetPasswordUser, changeStatusUser, getAllUsers } from 'util/js/APIs';
import { getNameRole, setNotification } from 'util/js/helper';

export default function StaffAdminManagePage() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const itemPerPage = 10;
  const userInfo = useSelector((state) => state.app.userInfo);
  const [arrChecked, setArrChecked] = useState([]);
  const [isCheckAllInput, setIsCheckAllInput] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [change, setChange] = useState(true);
  const [crtPage, setCrtPage] = useState(1);

  // search
  const [allDept, setAllDept] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchUserName, setSearchUserName] = useState('');
  const [searchDept, setSearchDept] = useState('Tất cả');
  const [searchRole, setSearchRole] = useState('Tất cả');
  const [displayItems, setDisplayItems] = useState([]);
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////
  
  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(()=>{
    const fetchData = async()=>{
      const users = await getAllUsers();
      setUsersData(users?.data?.data?.users);
      setDisplayItems(users?.data?.data?.users);
      setArrChecked(Array(users?.data?.data?.users.length).fill(false));  
      const deptRes = await getDeptName();
      const dept = deptRes?.data?.data?.dept;
      dept.push('Tất cả')
      setAllDept(dept);    
    }

    fetchData();
  },[change])

  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const value = [
    {
      text: '',
      type: 'checkbox',
      arrChecked: arrChecked,
      setArrChecked: setArrChecked,
      isCheckAllInput: isCheckAllInput, 
      setIsCheckAllInput: setIsCheckAllInput,
      index: -1,
    },
    {
      text: 'Họ và tên',
      type: 'header',
    },
    {
      text: 'Phòng ban',
      type: 'header',
    },
    {
      text: 'Tên tài khoản',
      type: 'header',
    },
    {
      text: 'Phân quyền',
      type: 'header',
    },
    {
      text: '',
      type: '',
    },
  ];

  const handleResetPassword = async () => {
    let ids= [];
    let n = 0;
    for (let i = 0; i < displayItems.length; i++) {
      if (arrChecked[i]) {
        ids.push(displayItems[i].UserID);
        n++;
      }
    }
    await resetPasswordUser(ids).then((res) => {
      if (res?.data?.resultCode === "00001") {
        let mess = 'Đã cài đặt lại mật khẩu cho người dùng đã chọn ('+ n +').';
        if (isCheckAllInput) mess = 'Đã cài đặt lại mật khẩu cho toàn bộ người dùng('+ n +').'
        setNotification('success', mess);
      } else {
        setNotification('error', res?.data?.resultMessage?.vi);
      }
    });
    setChange(!change)
  }

  const handleBlockUser = async () => {
    let ids= [];
    let n = 0;
    for (let i = 0; i < displayItems.length; i++) {
      if (arrChecked[i] && displayItems[i].UserID !== userInfo.UserID) {
        ids.push(displayItems[i].UserID);
        n++;
      }
    }
    await changeStatusUser(ids, 'Active').then((res) => {
      if (res?.data?.resultCode === "00001") {
        let mess = 'Đã chặn người dùng đã chọn ('+ n +').';
        if (isCheckAllInput) mess = 'Đã chặn toàn bộ người dùng('+ n +').'
        setNotification('success', mess);
      } else {
        setNotification('error', res?.data?.resultMessage?.vi);
      }
    });
    setChange(!change)
  }

  const handleSearchBtn = () => {
    setDisplayItems(
      usersData.filter(
        (user) => 
        user.Name.toLowerCase().search(searchName.toLowerCase()) !== -1 &&
        (user.DeptName.toLowerCase().search(searchDept.toLowerCase()) !== -1 || searchDept === 'Tất cả')&&
        user.Username.toLowerCase().search(searchUserName.toLowerCase()) !== -1 &&
        (getNameRole(user.Role).search(searchRole) !== -1 || searchRole === 'Tất cả')
      )
    );
  }
  //////////////////////////////////////////////////
  // #endregion FUNCTIONS //////////////////////////

  // #region    VIEWS //////////////////////////////
  //////////////////////////////////////////////////

  //////////////////////////////////////////////////
  // #endregion VIEWS //////////////////////////////
  return (
    <div className={`${styles.root}`}>
      <div className={`${styles.contentCtn} mTop20`}>
        <div className={`${styles.searchCtn}`}>
          <div className={`${styles.inputCtn} mBottom20`}>
            <div className={`${styles.inputDetailCtn}`}>
              <Input type="row-text" text="Tên" value={searchName} setData={setSearchName} />
            </div>
            <div className={`${styles.inputDetailCtn} ms-2`}>
              <Input type="row-text" text="Tên tài khoản" value={searchUserName} setData={setSearchUserName}/>
            </div>
          </div>
          <div className={`${styles.inputCtn} mBottom20`}>
            <div className={`${styles.inputDetailCtn} ms-2`}>
              <Input type="row-select" text="Phòng ban" defaultValue={searchDept} value={allDept} setData={setSearchDept} />
            </div>
            <div className={`${styles.inputDetailCtn} ms-2`}>
              <Input type="row-select" text="Chức vụ" defaultValue={searchRole} value={['Quản trị viên', 'Nhân viên', 'Trưởng phòng', 'Tất cả']} setData={setSearchRole} />
            </div>
          </div>
          <div className={`${styles.inputCtn} justify-content-end`}>
            <div className={`${styles.inputWrapper}`}>
              <Button
                name="Tìm kiếm"
                ctnStyles="pHorizontal43 textH6Bold br-10 bg-header justify-content-end"
                icon1={<FontAwesomeIcon icon={icon.magnifyingGlass} />}
                icon1Styles="fs-20 black"
                btnStyles="bg-header black d-flex justify-content-center align-items-center"
                onClick={handleSearchBtn}
              />
            </div>
          </div>
        </div>
        <div className={`${styles.btnCtn}`}>
          <div className={`${styles.btnWrapper} bg-bgColor3 mRight5`}>
            <Button
              name="Cài đặt lại mật khẩu"
              ctnStyles="pHorizontal15 pVertical10 br-10 text14Bold bg-bgColor3"
              btnStyles="bg-bgColor3 black"
              onClick={()=>handleResetPassword()}
            />
          </div>
          <div className={`${styles.btnWrapper} bg-error`}>
            <Button
              name="Chặn tài khoản"
              ctnStyles="pHorizontal15 pVertical10 br-10 text14Bold bg-error"
              btnStyles="bg-error white"
              onClick={()=>handleBlockUser()}
            />
          </div>
          <div className={`${styles.totalWrapper} text-end main text20Black`}>
            Tổng cộng: {displayItems.length}
          </div>
        </div>
        <div className={`${styles.resultCtn} ps-1 w-100`}>
          <SrcItem grid={STAFF_ADMIN_MANAGE_GRIDS} value={value} />
          {displayItems.map((user, index)=> {
            if (index >= (crtPage-1)*itemPerPage && index < (crtPage)*itemPerPage) {
              let userInfo = [
                {
                  text: '',
                  type: 'checkbox',
                  arrChecked: arrChecked,
                  setArrChecked: setArrChecked,
                  isCheckAllInput: isCheckAllInput, 
                  setIsCheckAllInput: setIsCheckAllInput,
                  index: index,
                },
                {
                  text: user.Name,
                  type: 'text',
                  id: user.UserID,
                  status: user.Status,
                },
                {
                  text: user.DeptName,
                  type: 'text',
                  id: user.DeptID
                },
                {
                  text: user.Username,
                  type: 'text',
                },
                {
                  text: getNameRole(user.Role),
                  type: 'text',
                  value: user.Role,
                },
                {
                  text: 'userModal',
                  type: 'manage',
                },
              ];
              return(
                <SrcItem grid={STAFF_ADMIN_MANAGE_GRIDS} value={userInfo} setUpdate={setChange} update={change}/>
              )
            }
          })}
        </div>
        <div className={`${styles.pagination}`}>
          <Pagination selectedPage={crtPage} setSelectedPage={setCrtPage} itemLength={displayItems.length} itemPerPage={itemPerPage}/>
        </div>
      </div>
    </div>
  );
}

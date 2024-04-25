import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import Button from 'common/Button';
import SrcItem from 'common/SrcItem';
import Pagination from 'common/Pagination';
import Input from 'common/Input';
import { STAFF_MANAGE_GRIDS } from 'util/js/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from 'util/js/icon';
import { getUsedStorage, getAllUsersDept, resetPasswordUser, changeStatusUser } from 'util/js/APIs';
import { getNameRole, setNotification } from 'util/js/helper';

export default function StaffManagePage() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  const itemPerPage = 10;
  const userInfo = useSelector((state) => state.app.userInfo);
  const [isChecked, setIsChecked] = useState(false);
  const [arrChecked, setArrChecked] = useState([]);
  const [isCheckAllInput, setIsCheckAllInput] = useState(true);
  const [usedStorage, setUsedStorage] = useState(0);
  const [deptData, setDeptData] = useState({Name: ''});
  const [usersData, setUsersData] = useState([]);
  const [change, setChange] = useState(true);
  const [page, setPage] = useState(1);
  const [crtPage, setCrtPage] = useState(1);
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////
  
  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(()=>{
    const fetchData = async()=>{
      const usedStorageRes = await getUsedStorage (userInfo.DeptID);
      setUsedStorage(usedStorageRes?.data?.data > 1.5 ? 1.5 : usedStorageRes.data?.data); 

      const deptInfoRes = await getAllUsersDept();
      setDeptData(deptInfoRes?.data?.data?.deptInfo);
      setUsersData(deptInfoRes?.data?.data?.usersInDept);
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
      isChecked: isChecked && isCheckAllInput,
      setCheckAll: setIsChecked,
      isCheckAllInput: true,
      setIsCheckAllInput: setIsCheckAllInput,
    },
    {
      text: 'Họ và tên',
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
    if (isCheckAllInput) {
      let ids= [];
      for (let i = 0; i < usersData.length; i++) {
        ids.push(usersData[i].UserID);
      }
      await resetPasswordUser(ids).then((res) => {
        if (res?.data?.data) {
          setNotification(
            'success',
            'Đã cài đặt lại mật khẩu cho toàn bộ người dùng.'
          );
        } else {
          setNotification('error', res?.data?.resultMessage?.vi);
        }
      });
    }
  }

  const handleBlockUser = async () => {
    if (isCheckAllInput) {
      let ids= [];
      for (let i = 0; i < usersData.length; i++) {
        ids.push(usersData[i].UserID);
      }
      await changeStatusUser(ids, 'Active').then((res) => {
        if (res?.data?.resultCode === "00001") {
          setNotification(
            'success',
            'Đã chặn toàn bộ người dùng.'
          );
          setChange(!change)
        } else {
          setNotification('error', res?.data?.resultMessage?.vi);
        }
      });
    }
  }
  //////////////////////////////////////////////////
  // #endregion FUNCTIONS //////////////////////////

  // #region    VIEWS //////////////////////////////
  //////////////////////////////////////////////////

  //////////////////////////////////////////////////
  // #endregion VIEWS //////////////////////////////
  return (
    <div className={`${styles.root}`}>
      <div className={`border-bottom-1 border-style-solid border-bg5-60 br-10 ${styles.navCtn}`}>
        <div className='col-12'>
          <Button
            name={deptData.Name}
            ctnStyles="h-100 text24Black"
            btnStyles="bg-bgColor4 pLeft10 main"
            onClick={() => {}}
          />
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
      <div className={`${styles.contentCtn}`}>
        <div className={`${styles.searchCtn}`}>
          <div className={`${styles.inputCtn} mBottom20`}>
            <div className={`${styles.inputDetailCtn}`}>
              <Input type="row-text" text="Tên" />
            </div>
            <div className={`${styles.inputDetailCtn}`}>
              <Input type="row-text" text="Tài khoản" />
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
            Tổng cộng: {usersData.length}
          </div>
        </div>
        <div className={`${styles.resultCtn} ps-1 w-100`}>
          {/* <div className="w-100"> */}
            <SrcItem grid={STAFF_MANAGE_GRIDS} value={value} />
            {usersData.map((user, index)=> {
              if (index > (crtPage-1)*itemPerPage && index <= (crtPage)*itemPerPage) {
                let userInfo = [
                  {
                    text: '',
                    type: 'checkbox',
                    isChecked: isChecked,
                    setCheckAll: setIsChecked,
                    setIsCheckAllInput: setIsCheckAllInput,
                  },
                  {
                    text: user.Name,
                    type: 'text',
                    id: user.UserID,
                  },
                  {
                    text: user.Username,
                    type: 'text',
                  },
                  {
                    text: getNameRole(user.Role),
                    type: 'text',
                  },
                  {
                    text: user.Status,
                    type: 'manage',
                  },
                ];
                return(
                  <SrcItem grid={STAFF_MANAGE_GRIDS} value={userInfo} setUpdate={setChange} update={change}/>
                )
              }
            })}
          {/* </div> */}
        </div>
        <div className={`${styles.pagination}`}>
          <Pagination selectedPage={crtPage} setSelectedPage={setCrtPage} itemLength={usersData.length} itemPerPage={itemPerPage}/>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styles from './styles.module.css';
import Button from 'common/Button';
import Input from 'common/Input';
import { setNotification } from 'util/js/helper';
import { getCompany, editCompanyInfo } from '../../util/js/APIs';
import { logout } from '../../util/js/APICaller';

export default function CompanyManagePage() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const userInfo = useSelector((state) => state.app.userInfo);
  const dispatch = useDispatch();
  const [name, setName] = useState(userInfo.Name);
  const [defaultPassword, setDefaultPassword] = useState('');
  const [companyInfo, setCompanyInfo] = useState({});
  const [planInfo, setPlanInfo] = useState({PlanName: '', AdminAcctNum: 0, EmplAcctNum: 0, MgrAcctNum: 0});
  const [handleBtn, setHandleBtn] = useState(false);
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(()=>{
    const fetchData = async()=>{
      const companyInfoRes = await getCompany();
      
      setName(companyInfoRes?.data?.data?.company?.CompanyName);
      setDefaultPassword(companyInfoRes?.data?.data?.company?.DefaultPassword);
      setCompanyInfo(companyInfoRes?.data?.data?.company);
      setPlanInfo(companyInfoRes?.data?.data?.plan);

    };

    fetchData();
  },[])

  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const handleSubmitBtn = async () => {
    setHandleBtn(true);

    if(name === '') {
      setHandleBtn(false);
      setNotification('warning', 'Vui lòng nhập tên công ty!');
      return;
    }
    if(defaultPassword === '') {
      setHandleBtn(false);
      setNotification('warning', 'Vui lòng nhập mật khẩu mặc định!');
      return;
    }

    const data = {
      name: name,
      defaultPassword: defaultPassword,
    }
    try {
      const res = await editCompanyInfo(data);
      if (res.status === 200) {
        setName(res?.data?.data?.company?.Name);
        setDefaultPassword(res?.data?.data?.company?.DefaultPassword);
        setCompanyInfo(res?.data?.data?.company);
        setNotification('success', 'Cập nhật thông tin thành công!');
      }
      setHandleBtn(false);
    } catch (err) {
      logout();
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
      <div className={`${styles.contentCtn}`}>
        <div className={`${styles.infoCtn}`}>
        <div className={`${styles.rowCtn}`}>
            <div className={`${styles.inputRowDetailCtn} mRight10`}>
              <Input 
                type="text" 
                text="Tài khoản" 
                value={planInfo.PlanName}
                canChange={false}
                onEnter={() => {handleSubmitBtn()}}
              />
            </div>
            <div className={`${styles.inputRowDetailCtn}`}>
              <Input 
                type="text" 
                text="Số quản trị viên tối đa" 
                value={planInfo.AdminAcctNum}
                canChange={false}
                onEnter={() => {handleSubmitBtn()}}
              />
            </div>
          </div>
          <div className={`${styles.rowCtn}`}>
            <div className={`${styles.inputRowDetailCtn} mRight10`}>
              <Input
                type="text"
                text="Số phòng ban tối đa"
                value={planInfo.MgrAcctNum}
                canChange={false}
                onEnter={() => {handleSubmitBtn()}}
              />
            </div>
            <div className={`${styles.inputRowDetailCtn}`}>
              <Input 
                type="text" 
                text="Số người dùng tối đa" 
                value={planInfo.EmplAcctNum}
                canChange={false}
                onEnter={() => {handleSubmitBtn()}}
              />
            </div>
          </div>
          <Input 
            type="text" 
            text="Tên công ty" 
            value={name} 
            setData={setName}
            onEnter={() => {handleSubmitBtn()}} 
          />
          <Input 
            type="text" 
            text="Mật khẩu khởi tạo" 
            placeholder="Nhập mật khẩu mới" 
            value={defaultPassword} setData={setDefaultPassword}
            onEnter={() => {handleSubmitBtn()}} 
          />
          <div className={`${styles.btnCtn}`}>
            <div className={`${styles.btnWrapper}`}>
              <Button
                name="XÁC NHẬN"
                ctnStyles="h-100 textH6Bold br-10 bg-text justify-content-end"
                btnStyles="bg-text white d-flex justify-content-center align-items-center"
                onClick={() => handleSubmitBtn()}
                isLoad = {handleBtn}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

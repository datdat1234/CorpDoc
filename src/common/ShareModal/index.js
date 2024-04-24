import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UseOnClickOutside from 'util/hook/useOnClickOutside';
import styles from './styles.module.css';
import Button from 'common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from 'util/js/icon';
import Input from 'common/Input';
import { getAllOtherDept, getDeptShared, setSharedDeptIds } from 'util/js/APIs';
import CriteriaTag from 'common/CriteriaTag';
import { setOpenModal } from '../../redux/action/app';

export default function ShareModal({infoItm = ''}) {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.app.userInfo);
  const [deptData, setDeptData] = useState([]);
  const [sharedDepts, setSharedDepts] = useState([]);

  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(() =>{
    const fetchData = async()=>{
      const deptRes = await getAllOtherDept();
      setDeptData(deptRes?.data?.data?.dept);
      const sharedDeptsRes = await getDeptShared(infoItm);
      setSharedDepts(sharedDeptsRes?.data?.data?.dept);
    }

    fetchData()
  },[]);

  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const handleCloseShareDept = (dept) => {
    setSharedDepts(sharedDepts.filter((value) => value !== dept));
  };

  const handleSetShareDept = (dept) => {
    if (sharedDepts.find(o => o.DeptID === dept.DeptID) || dept === '') return;
    else {
      setSharedDepts([...sharedDepts, dept]);
    }
  };

  const handleCloseModal = () => {
    dispatch(setOpenModal({type: '', infoItm:{}}));
  }

  const handleSaveBtn = async () => {
    let ids = [];
    for(let i = 0; i<sharedDepts.length; i++) ids.push(sharedDepts[i].DeptID)
    await setSharedDeptIds(infoItm, ids);
    handleCloseModal();
  }
  //////////////////////////////////////////////////
  // #endregion FUNCTIONS //////////////////////////

  // #region    VIEWS //////////////////////////////
  //////////////////////////////////////////////////
  const renderSharedTag = () => {
    return sharedDepts?.map((dept, index) => {
      return (
        <CriteriaTag
          key={index}
          text={dept}
          handleClick={handleCloseShareDept}
        />
      );
    });
  };
  //////////////////////////////////////////////////
  // #endregion VIEWS //////////////////////////////
  return (
    <div className={`${styles.root}`}>
      <div className={`${styles.mainCtn}`}>
        <div className={`${styles.title} textH5Black`}>
          Chọn phòng ban chia sẻ
          <FontAwesomeIcon icon={icon.xmark} size='lg' className={`${styles.icon} pointer`} onClick={handleCloseModal} />
        </div>
        <div className={`${styles.body}`}>
          <Input 
            type="select" 
            text="Phòng ban"
            value={deptData}
            defaultValue={'Chọn phòng ban'}
            setData={handleSetShareDept}
            isSelect={true}
          />
          <div className={`${styles.checkboxCtn}`}>{renderSharedTag()}</div>
        </div>
        <div className={`${styles.footer}`}>
          <div className={`${styles.btnCtn}`}>
            <Button
              name="XÁC NHẬN"
              ctnStyles="h-100 textH6Bold br-10 bg-text justify-content-end"
              btnStyles="bg-text white d-flex justify-content-center align-items-center"
              onClick={handleSaveBtn}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import Button from 'common/Button';
import SrcItem from 'common/SrcItem';
import Pagination from 'common/Pagination';
import Input from 'common/Input';
import { DEPT_MANAGE_GRIDS } from 'util/js/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from 'util/js/icon';
import { getDept, getAmountUsersDept, getCompany } from 'util/js/APIs';

export default function DeptManagePage() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  const itemPerPage = 10;
  const [arrChecked, setArrChecked] = useState([]);
  const [isCheckAllInput, setIsCheckAllInput] = useState(false);
  const [deptsData, setDeptsData] = useState([]);
  const [change, setChange] = useState(true);
  const [crtPage, setCrtPage] = useState(1);
  const [usedStorage, setUsedStorage] = useState(0);
  const [planInfo, setPlanInfo] = useState({PlanName: '', AdminAcctNum: 0, EmplAcctNum: 0, MgrAcctNum: 0});
  const [displayItems, setDisplayItems] = useState([]);

  // search
  const [searchName, setSearchName] = useState('');
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////
  
  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(()=>{
    const fetchData = async()=>{
      const deptInfoRes = await getDept();
      let deptInfo = deptInfoRes?.data?.data?.dept;
      let deptsSetStorage = 0;
      for (let i=0; i<deptInfo.length; i++) {
        const usersInDeptRes = await getAmountUsersDept(deptInfo[i].DeptID);
        deptInfo[i].amountStaff = usersInDeptRes?.data?.data?.usersInDept.length;
        deptsSetStorage += deptInfo[i].Storage
      }
      setDeptsData(deptInfo);
      setDisplayItems(deptInfo);
      setUsedStorage(deptsSetStorage);

      const companyInfoRes = await getCompany();
      setPlanInfo(companyInfoRes?.data?.data?.plan);
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
      text: 'Tên phòng ban',
      type: 'header',
    },
    {
      text: 'Dung lượng tối đa',
      type: 'header',
    },
    {
      text: 'Số nhân viên',
      type: 'header',
    },
    {
      text: '',
      type: '',
    },
  ];

  const handleSearchBtn = () => {
    setDisplayItems(
      deptsData.filter(
        (dept) => dept.Name.toLowerCase().search(searchName.toLowerCase()) !== -1
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
      <div className={`${styles.contentCtn}`}>
        <div className={`${styles.searchCtn} mTop20`}>
          <div className={`${styles.inputCtn} mBottom20`}>
            <div className={`${styles.inputDetailCtn}`}>
              <Input 
                type="row-text" 
                text="Tên"
                value={searchName}
                setData={setSearchName}
              />
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
          <div className={`${styles.btnWrapper} bg-header`}>
            <Button
              name={"Dung lượng tối đa: " + planInfo.Storage + " GB"}
              ctnStyles="pHorizontal15 pVertical10 br-10 text14Bold bg-header"
              btnStyles="bg-header black"
              onClick={()=>console.log(1)}
            />
          </div>
          <div className={`${styles.btnWrapper} bg-text ms-1`}>
            <Button
              name={"Dung lượng đã cài đặt: " + usedStorage + " GB"}
              ctnStyles="pHorizontal15 pVertical10 br-10 text14Bold bg-text"
              btnStyles="bg-text white"
              onClick={()=>console.log(1)}
            />
          </div>
          <div className={`${styles.totalWrapper} text-end main text20Black`}>
            Tổng cộng: {displayItems.length}
          </div>
        </div>
        <div className={`${styles.resultCtn} ps-1 w-100`}>
          <SrcItem grid={DEPT_MANAGE_GRIDS} value={value} />
          {displayItems.map((dept, index)=> {
            if (index >= (crtPage-1)*itemPerPage && index < (crtPage)*itemPerPage) {
              let deptInfo = [
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
                  text: dept.Name,
                  type: 'text',
                  id: dept.DeptID,
                },
                {
                  text: dept.Storage,
                  type: 'text',
                  maxStorage: planInfo.Storage - usedStorage,
                },
                {
                  text: dept.amountStaff,
                  type: 'text',
                },
                {
                  text: 'deptModal',
                  type: 'manage',
                },
              ];
              return(
                <SrcItem grid={DEPT_MANAGE_GRIDS} value={deptInfo} setUpdate={setChange} update={change}/>
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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import Button from 'common/Button';
import SrcItem from 'common/SrcItem';
import Pagination from 'common/Pagination';
import Input from 'common/Input';
import { APPROVAL_GRIDS } from 'util/js/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from 'util/js/icon';
import { getPendingFiles, setApproveFiles, setDeniedFiles, getDeptName } from 'util/js/APIs';
import { formatItemPendingFile, setNotification } from 'util/js/helper';

export default function ApprovalPage() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  const [isCheckAllInput, setIsCheckAllInput] = useState(false);
  const [arrChecked, setArrChecked] = useState([]);
  const [items, setItems] = useState([]);
  const [crtPage, setCrtPage] = useState(1);
  const itemPerPage = 10;
  const [change, setChange] = useState(true);

  // search
  const [allDept, setAllDept] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchUserName, setSearchUserName] = useState('');
  const [searchDept, setSearchDept] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [displayItems, setDisplayItems] = useState([]);
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      const pendingFilesRes = await getPendingFiles();

      setItems(formatItemPendingFile(pendingFilesRes?.data?.data?.files));
      setArrChecked(Array(pendingFilesRes?.data?.data?.files.length).fill(false));

      const deptRes = await getDeptName();
      setAllDept(deptRes?.data?.data?.dept); 
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
      text: 'Tên',
      type: 'header',
    },
    {
      text: 'Phòng ban',
      type: 'header',
    },
    {
      text: 'Ngày đăng tải',
      type: 'header',
    },
    {
      text: 'Kích thước',
      type: 'header',
    },
    {
      text: 'Loại',
      type: 'header',
    },
    {
      text: '',
      type: '',
    },
  ];

  const handleApproveBtn = async () => {
    let ids= [];
    for (let i = 0; i < items.length; i++) {
      if (arrChecked[i]) {
        ids.push(items[i][0].id);
      }
    }
    await setApproveFiles(ids).then((res) => {
      if (res?.data?.resultCode === "00001") {
        setNotification('success', 'Tác vụ thành công.');
        setChange(!change);
        setIsCheckAllInput(false);
      } else {
        setNotification('error', res?.data?.resultMessage?.vi);
      }
    });
  }

  const handleDeniedBtn = async () => {
    let ids= [];
    for (let i = 0; i < items.length; i++) {
      if (arrChecked[i]) {
        ids.push(items[i][0].id);
      }
    }
    await setDeniedFiles(ids).then((res) => {
      if (res?.data?.resultCode === "00001") {
        setNotification('success', 'Tác vụ thành công.');
        setChange(!change);
        setIsCheckAllInput(false);
      } else {
        setNotification('error', res?.data?.resultMessage?.vi);
      }
    });
  }
  const handleSearchBtn = () => {
    setDisplayItems(
      items.filter(
        (item) => 
        item.Name.toLowerCase().search(searchName.toLowerCase()) !== -1 &&
        item.DeptName.toLowerCase().search(searchDept.toLowerCase()) !== -1 &&
        item.Username.toLowerCase().search(searchUserName.toLowerCase()) !== -1
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
      <div className={`${styles.navCtn}`}>
        <Button
          name="Yêu cầu xét duyệt"
          ctnStyles="h-100 text18SemiBold border-bottom-1 border-style-solid border-bg5-60 br-10"
          btnStyles="bg-bgColor4 pLeft10"
          icon1Styles="w-24 h-24 d-flex justify-content-center align-items-center"
          icon1={<FontAwesomeIcon icon={icon.angleLeft} />}
          onClick={() => navigate(-1)}
        />
      </div>
      <div className={`${styles.searchCtn}`}>
        <div className={`${styles.inputCtn} mBottom20`}>
          <div className={`${styles.inputDetailCtn}`}>
            <Input type="row-text" text="Tên văn bản" value={searchName} setData={setSearchName}/>
          </div>
          <div className={`${styles.inputDetailCtn}`}>
            <Input type="row-text" text="Tên nhân viên" value={searchUserName} setData={setSearchUserName}/>
          </div>
        </div>
        <div className={`${styles.inputCtn} mBottom20`}>
          <div className={`${styles.inputDetailCtn}`}>
            <Input type="row-select" text="Phòng ban" defaultValue={searchDept} value={allDept} setData={setSearchDept} />
          </div>
          <div className={`${styles.inputDetailCtn}`}>
            <Input type="row-date" text="Ngày đăng tải" />
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
        <div className={`${styles.btnWrapper} bg-success mRight5`}>
          <Button
            name="Chấp nhận"
            ctnStyles="pHorizontal15 pVertical10 br-10 text14Bold bg-success"
            btnStyles="bg-success white"
            onClick={handleApproveBtn}
          />
        </div>
        <div className={`${styles.btnWrapper} bg-error`}>
          <Button
            name="Không chấp nhận"
            ctnStyles="pHorizontal15 pVertical10 br-10 textH6Bold bg-error"
            btnStyles="bg-error white"
            onClick={handleDeniedBtn}
          />
        </div>
      </div>
      <div className={`${styles.resultCtn}`}>
        <div className="w-100">
          <SrcItem grid={APPROVAL_GRIDS} value={value} />
          {displayItems.map((file, index)=> {
            if (index >= (crtPage-1)*itemPerPage && index < (crtPage)*itemPerPage) {
              let fileInfo = [
                {
                  text: '',
                  type: 'checkbox',
                  arrChecked: arrChecked,
                  setArrChecked: setArrChecked,
                  isCheckAllInput: isCheckAllInput, 
                  setIsCheckAllInput: setIsCheckAllInput,
                  index: index,
                },
                ...file,
              ];
              return(
                <SrcItem grid={APPROVAL_GRIDS} value={fileInfo} setUpdate={setChange} update={change}/>
              )
            }
          })}
        </div>
        <div className={`${styles.pagination}`}>
          <p className="text14 mLeft10">
            Có <span className="text14Bold">{items.length}</span> yêu cầu chưa được xét duyệt.
          </p>
          <Pagination selectedPage={crtPage} setSelectedPage={setCrtPage} itemLength={items.length} itemPerPage={itemPerPage}/>
        </div>
      </div>
    </div>
  );
}

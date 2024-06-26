import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import icon from 'util/js/icon';
import Button from 'common/Button';
import Input from 'common/Input';
import CriteriaTag from 'common/CriteriaTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  getFileCriteria,
  getDeptName,
} from 'util/js/APIs';

export default function SearchFilePage() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.app.userInfo);
  const [criteria, setCritetia] = useState([]);
  const [deptData, setDeptData] = useState([]);
  const [name, setName] = useState('');
  const [dept, setDept] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState(null);
  const [isSave, setIsSave] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [fileCriteria, setFileCriteria] = useState([]);
  const [desc, setDesc] = useState('');
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      const critRes = await getFileCriteria();
      const deptRes = await getDeptName(userInfo?.DeptID);
      setCritetia(critRes?.data?.data?.criteria);

      var deptArr = deptRes?.data?.data?.dept;
      deptArr.push('Phòng ban của bạn');

      setDeptData(deptArr);
    };

    fetchData();
  }, []);
  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const handleSearchFile = async () => {
    const searchData = {
      name: name,
      dept: dept,
      author: author,
      date: date,
      criteria: fileCriteria,
      isSave: isSave,
      desc: desc,
      // isShare: isShare,
    };

    if (dept === 'Phòng ban của bạn') {
      searchData.dept = '';
    }

    navigate('/search-file-result', {
      state: {
        DeptID: userInfo?.DeptID,
        UserID: userInfo?.UserID,
        searchData: searchData,
      },
    });
  };

  const handleSetCriteria = (criterion) => {
    if (fileCriteria.includes(criterion) || criterion === '') return;
    else {
      setFileCriteria([...fileCriteria, criterion]);
    }
  };

  const handleCloseCriteria = (criterion) => {
    setFileCriteria(fileCriteria.filter((value) => value !== criterion));
  };
  //////////////////////////////////////////////////
  // #endregion FUNCTIONS //////////////////////////

  // #region    VIEWS //////////////////////////////
  //////////////////////////////////////////////////
  const renderCriterionTag = () => {
    return fileCriteria.map((criterion, index) => {
      return (
        <CriteriaTag
          key={index}
          text={criterion}
          handleClick={handleCloseCriteria}
        />
      );
    });
  };
  //////////////////////////////////////////////////
  // #endregion VIEWS //////////////////////////////
  return (
    <div className={`${styles.root}`}>
      <div className={`${styles.navCtn}`}>
        <Button
          name="Tìm kiếm tài liệu"
          ctnStyles="h-100 text18SemiBold border-bottom-1 border-style-solid border-bg5-60 br-10"
          btnStyles="bg-bgColor4 pLeft10"
          icon1Styles="w-24 h-24 d-flex justify-content-center align-items-center"
          icon1={<FontAwesomeIcon icon={icon.angleLeft} />}
          onClick={() => navigate('/home')}
        />
      </div>
      <div className={`${styles.input}`}>
        <Input
          type="text"
          text="Từ khóa"
          bonusText="(tối đa 50 ký tự)"
          value={name}
          setData={setName}
        />
        <div className={`${styles.inputRowCtn}`}>
          <div className={`${styles.inputRowDetailCtn} mRight10`}>
            <Input
              type="select"
              text="Phòng ban"
              placeholder={deptData.length !== 0 ? dept : ''}
              value={deptData}
              setData={setDept}
            />
          </div>
          <div className={`${styles.inputRowDetailCtn}`}>
            <Input
              type="text"
              text="Tác giả"
              value={author}
              setData={setAuthor}
            />
          </div>
        </div>
        {/* <Input
          type="select"
          text="Thư mục"
          value={handlePathValue()}
          setData={handleSetParentInfo}
        /> */}
        <div className={`${styles.inputRowCtn}`}>
          <div className={`${styles.inputRowDetailCtn}`}>
            <Input type="date" text="Ngày tạo" value={date} setData={setDate} />
          </div>
          {/* <div className={`${styles.inputRowDetailCtn}`}>
            <Input type="date" text="Ngày được xác nhận" />
          </div> */}
        </div>
        <Input
          type="textarea"
          text="Mô tả"
          value={desc}
          setData={setDesc}
        />
        <Input
          type="select"
          text="Tiêu chí của tài liệu"
          value={criteria}
          setData={handleSetCriteria}
        />
        <div className={`${styles.checkboxCtn}`}>{renderCriterionTag()}</div>
        <div className={`${styles.checkboxCtn}`}>
          <Input
            type="checkbox"
            text="Tài liệu đã lưu"
            textStyles="textH6Bold mRight10"
            value={isSave}
            setData={setIsSave}
          />
          {/* <Input
            type="checkbox"
            text="Tài liệu được chia sẻ"
            textStyles="textH6Bold"
            value={isShare}
            setData={setIsShare}
          /> */}
        </div>
        <div className={`${styles.btnCtn} mBottom10`}>
          <div className={`${styles.btnWrapper}`}>
            <Button
              name="XÁC NHẬN"
              ctnStyles="h-100 textH6Bold br-10 bg-text justify-content-end"
              btnStyles="bg-text white d-flex justify-content-center align-items-center"
              onClick={handleSearchFile}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

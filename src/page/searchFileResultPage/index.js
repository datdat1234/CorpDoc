import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './styles.module.css';
import Button from 'common/Button';
import SrcItem from 'common/SrcItem';
import Pagination from 'common/Pagination';
import { SEARCH_RESULT_GRIDS } from 'util/js/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from 'util/js/icon';
import { searchFile, getDept } from 'util/js/APIs';

export default function SearchFileResultPage() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  const { state } = useLocation();
  const { DeptID, UserID, searchData } = state;
  const [deptData, setDeptData] = useState([]);
  const [resData, setResData] = useState([]);
  const [recordCount, setRecordCount] = useState(0);
  const value = [
    {
      text: '',
      type: '',
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
      text: '',
      type: '',
    },
  ];
  const [crtPage, setCrtPage] = useState(1);
  const itemPerPage = 20;
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      const deptRes = await getDept();
      const searchRes = await searchFile(DeptID, UserID, searchData);
      setDeptData(deptRes?.data?.data?.dept);
      setResData(searchRes?.data?.data?.data || []);
      setRecordCount(searchRes?.data?.data?.count || 0);
    };

    fetchData();
  }, []);
  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const getFileDept = (deptId) => {
    const dept = deptData.find((dept) => dept.DeptID === deptId);
    return dept?.Name;
  };
  //////////////////////////////////////////////////
  // #endregion FUNCTIONS //////////////////////////

  // #region    VIEWS //////////////////////////////
  //////////////////////////////////////////////////
  const renderSearchResult = () => {
    return resData.map((file, index) => {
      if (index >= (crtPage-1)*itemPerPage && index < (crtPage)*itemPerPage) {
        const fileData = [
          {
            text: '',
            type: 'save',
          },
          {
            text: file?._source?.Name,
            type: 'file',
            id: file?._source?.FileID,
          },
          {
            text: getFileDept(file?._source?.DeptID),
            type: 'text',
          },
          {
            text: file?._source?.CreatedDate,
            type: 'text',
          },
          {
            text: file?._source?.Size,
            type: 'text-size',
          },
          {
            text: '',
            type: 'edit',
          },
        ];
        return <SrcItem grid={SEARCH_RESULT_GRIDS} value={fileData} />;
      }
    });
  };
  //////////////////////////////////////////////////
  // #endregion VIEWS //////////////////////////////
  return (
    <div className={`${styles.root}`}>
      <div className={`${styles.navCtn}`}>
        <Button
          name="Kết quả tìm kiếm"
          ctnStyles="h-100 text18SemiBold border-bottom-1 border-style-solid border-bg5-60 br-10"
          btnStyles="bg-bgColor4 pLeft10"
          icon1Styles="w-24 h-24 d-flex justify-content-center align-items-center"
          icon1={<FontAwesomeIcon icon={icon.angleLeft} />}
          onClick={() => navigate(-1)}
        />
      </div>
      <div className={`${styles.resultCtn}`}>
        <div className="w-100">
          <SrcItem grid={SEARCH_RESULT_GRIDS} value={value} />
          {renderSearchResult()}
        </div>
        <div className={`${styles.pagination}`}>
          <p className="text14 mLeft10">
            Tìm thấy <span className="text14Bold">{recordCount}</span> kết quả
            tài liệu phù hợp.
          </p>
          <Pagination selectedPage={crtPage} setSelectedPage={setCrtPage} itemLength={resData.length} itemPerPage={itemPerPage}/>
        </div>
      </div>
    </div>
  );
}

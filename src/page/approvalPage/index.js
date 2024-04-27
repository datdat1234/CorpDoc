import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import Button from 'common/Button';
import SrcItem from 'common/SrcItem';
import Pagination from 'common/Pagination';
import Input from 'common/Input';
import { APPROVAL_GRIDS } from 'util/js/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from 'util/js/icon';

export default function ApprovalPage() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckAllInput, setIsCheckAllInput] = useState(true);
  const [crtPage, setCrtPage] = useState(1);
  const itemPerPage = 20;
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////

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
      text: 'Địa điểm',
      type: 'header',
    },
    {
      text: '',
      type: '',
    },
  ];

  const value1 = [
    {
      text: '',
      type: 'checkbox',
      isChecked: isChecked,
      setCheckAll: setIsChecked,
      setIsCheckAllInput: setIsCheckAllInput,
    },
    {
      text: 'Truyện hư cấu',
      type: 'folder',
    },
    {
      text: 'Phòng nhân sự',
      type: 'text',
    },
    {
      text: '1/12/2024 11:52 PM',
      type: 'text',
    },
    {
      text: '1,111,111 KB',
      type: 'text-size',
    },
    {
      text: 'Tài liệu của tôi/Truyện hư cấu',
      type: 'text',
    },
    {
      text: '',
      type: 'approval',
    },
  ];
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
            <Input type="row-text" text="Tên" />
          </div>
          <div className={`${styles.inputDetailCtn}`}>
            <Input
              type="row-select"
              text="Miền cấu trúc"
              value={[]}
              setData={() => console.log(1)}
            />
          </div>
        </div>
        <div className={`${styles.inputCtn} mBottom20`}>
          <div className={`${styles.inputDetailCtn}`}>
            <Input
              type="row-select"
              text="Nhân viên"
              value={[]}
              setData={() => console.log(1)}
            />
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
          />
        </div>
        <div className={`${styles.btnWrapper} bg-error`}>
          <Button
            name="Không chấp nhận"
            ctnStyles="pHorizontal15 pVertical10 br-10 textH6Bold bg-error"
            btnStyles="bg-error white"
          />
        </div>
      </div>
      <div className={`${styles.resultCtn}`}>
        <div className="w-100">
          <SrcItem grid={APPROVAL_GRIDS} value={value} />
          <SrcItem grid={APPROVAL_GRIDS} value={value1} />
          <SrcItem grid={APPROVAL_GRIDS} value={value1} />
          <SrcItem grid={APPROVAL_GRIDS} value={value1} />
        </div>
        <div className={`${styles.pagination}`}>
          <p className="text14 mLeft10">
            Tìm thấy <span className="text14Bold">3</span> kết quả thư mục phù
            hợp.
          </p>
          <Pagination />
        </div>
      </div>
    </div>
  );
}

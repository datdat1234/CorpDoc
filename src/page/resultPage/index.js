import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import icon from 'util/js/icon';
import Button from 'common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ResultPage() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  var userInfo = useSelector((state) => state.app.userInfo);
  const { state } = useLocation();
  const { type, status, isNew, action, isSupport } = state;
  const [pageType, setPageType] = useState(type || 'file');
  const [pageStatus, setPageStatus] = useState(status || 'error');
  const [newPage, setNewPage] = useState(isNew || false);
  const [name, setName] = useState('');
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(() => {
    let str = '';
    switch (action) {
      case 'add': str = pageType === 'file' ? 'Tải lên tài liệu' : (isNew ? 'Tạo mới miền cấu trúc' : 'Tạo mới thư mục'); break;
      case 'edit': str = 'Chỉnh sửa' + (pageType === 'file' ? ' tài liệu' : ' thư mục'); break;
      default: str = 'Tải lên tài liệu'
    }
    setName(str)
  }, [])
  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const handleBigText = () => {
    if (pageType === 'file') {
      if (pageStatus === 'success') {
        return action === 'edit' ? 'CHỈNH SỬA THÀNH CÔNG' : 'TẢI LÊN THÀNH CÔNG';
      } else {
        return action === 'edit' ? 'CHỈNH SỬA THẤT BẠI' : 'TẢI LÊN THẤT BẠI';
      }
    } else {
      if (pageStatus === 'success') {
        if (newPage === true) return 'TẠO MIỀN CẤU TRÚC MỚI THÀNH CÔNG';
        return action === 'edit' ? 'CHỈNH SỬA THÀNH CÔNG' : 'TẠO THƯ MỤC THÀNH CÔNG';
      } else {
        if (newPage === true) return 'TẠO MIỀN CẤU TRÚC MỚI KHÔNG THÀNH CÔNG';
        return action === 'edit' ? 'CHỈNH SỬA KHÔNG THÀNH CÔNG' : 'TẠO THƯ MỤC MỚI KHÔNG THÀNH CÔNG';
      }
    }
  };

  const renderSmallText = () => {
    if (pageType === 'file') {
      if (pageStatus === 'success') {
        if (userInfo.Role === 'Staff') {
          return (
            <div>
              Yêu cầu {action === 'edit' ? 'chỉnh sửa' : 'tải lên'} đã được gửi đến{' '}
              <span className="text18Bold">trưởng phòng ban</span>. Vui lòng đợi
              xác nhận để có thể hiển thị và sử dụng.
            </div>
          );
        }
        else {
          if (isSupport) {
            return <div>
              Văn bản hiện đang được xử lý phân loại. Vui lòng đợi trong giây lát.
            </div>;
          }
        }
      } else {
        return <div>{action === 'edit' ? 'Chỉnh sửa' : 'Tải lên'} không thành công. Vui lòng thử lại.</div>;
      }
    }
  };

  const renderBtnText = () => {
    if (pageStatus === 'success') {
      return 'Quay về trang chủ';
    } else {
      return 'Thử lại';
    }
  };

  const renderColor = (kind) => {
    if (kind === 'icon') {
      if (pageStatus === 'success') {
        return 'success';
      } else {
        return 'error';
      }
    }
    if (kind === 'text') {
      if (pageStatus === 'success') {
        return 'success';
      } else {
        return 'textError';
      }
    }
  };
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
          name={name}
          ctnStyles="h-100 text18SemiBold border-bottom-1 border-style-solid border-bg5-60 br-10"
          btnStyles="bg-bgColor4 pLeft10"
          icon1Styles="w-24 h-24 d-flex justify-content-center align-items-center"
          icon1={<FontAwesomeIcon icon={icon.angleLeft} />}
          onClick={() => navigate(-1)}
        />
      </div>
      <div className={`${styles.notiCtn}`}>
        <FontAwesomeIcon
          icon={icon.circleCheck}
          className={`${styles.icon} ${renderColor('icon')}`}
        />
        <div className={`text24Black ${renderColor('text')}`}>
          {handleBigText()}
        </div>
        <div className={`${styles.smallText} lh-sm text18`}>
          {renderSmallText()}
        </div>
      </div>
      <div className={`w-340 ${styles.submitBtn}`}>
        <Button
          name={renderBtnText()}
          ctnStyles="h-56 bg-text br-8"
          btnStyles="text-center textH6Bold white bg-text"
          onClick={() => pageStatus === 'success' ? navigate('/') : navigate(-1)}
        />
      </div>
    </div>
  );
}

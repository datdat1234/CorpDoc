import React, { useState } from 'react';
import styles from './styles.module.css';
import icon from 'util/js/icon';
import Button from 'common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ResultPage() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  const { state } = useLocation();
  const { type, status, isNew } = state;
  const [pageType, setPageType] = useState(type || 'file');
  const [pageStatus, setPageStatus] = useState(status || 'error');
  const [newPage, setNewPage] = useState(isNew || false);
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////

  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const handleBigText = () => {
    if (pageType === 'file') {
      if (pageStatus === 'success') {
        return 'TẢI LÊN THÀNH CÔNG';
      } else {
        return 'TẢI LÊN THẤT BẠI';
      }
    } else {
      if (pageStatus === 'success') {
        return 'TẠO THƯ MỤC THÀNH CÔNG';
      } else {
        if (newPage === true) return 'TẠO MIỀN CẤU TRÚC MỚI KHÔNG THÀNH CÔNG';
        return 'TẠO THƯ MỤC MỚI KHÔNG THÀNH CÔNG';
      }
    }
  };

  const renderSmallText = () => {
    if (pageType === 'file') {
      if (pageStatus === 'success') {
        return (
          <div>
            Yêu cầu tải lên đã được gửi đến{' '}
            <span className="text18Bold">trưởng phòng ban</span>. Vui lòng đợi
            xác nhận để có thể hiển thị và sử dụng.
          </div>
        );
      } else {
        return <div>Tải lên không thành công. Vui lòng thử lại.</div>;
      }
    } else {
      if (pageStatus === 'success') {
        return (
          <div>
            Yêu cầu tạo thư mục đã được gửi đến{' '}
            <span className="text18Bold">trưởng phòng ban</span>. Vui lòng đợi
            xác nhận để có thể hiển thị và sử dụng.
          </div>
        );
      } else {
        if (newPage === true)
          return (
            <div>Tạo miền cấu trúc mới không thành công. Vui lòng thử lại.</div>
          );
        return <div>Tạo thư mục mới không thành công. Vui lòng thử lại.</div>;
      }
    }
  };

  const renderBtnText = () => {
    if (pageType === 'file') {
      if (pageStatus === 'success') {
        return 'Tiếp tục tải lên';
      } else {
        return 'Thử lại';
      }
    } else {
      if (pageStatus === 'success') {
        return 'Tiếp tục tạo thư mục';
      } else {
        if (newPage === true) return 'Thử lại';
        return 'Thử lại';
      }
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
          name="Tải lên tài liệu cho miền Đồ án tốt nghiệp _ Luận văn tốt nghiệp"
          ctnStyles="h-100 text18SemiBold border-bottom-1 border-style-solid border-bg5-60 br-10"
          btnStyles="bg-bgColor4 pLeft10"
          icon1Styles="w-24 h-24 d-flex justify-content-center align-items-center"
          icon1={<FontAwesomeIcon icon={icon.angleLeft} />}
          onClick={() =>
            navigate('/upload-file', { state: { isShowCritetia: true } })
          }
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
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
}

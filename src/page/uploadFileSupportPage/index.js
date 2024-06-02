import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.css';
import icon from 'util/js/icon';
import Button from 'common/Button';
import Input from 'common/Input';
import {
  extractFileName,
  extractFileType,
  setNotification,
} from 'util/js/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uploadFileSupport } from 'util/js/APIs';
import { setGlobalLoading } from '../../redux/action/app';

export default function UploadFileSupportPage() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { supportType } = state;
  const userInfo = useSelector((state) => state.app.userInfo);
  const isLoad = useSelector((state) => state.app.globalLoading);
  const [fileName, setFileName] = useState('');
  const [author, setAuthor] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState(0);
  const [fileContent, setFileContent] = useState(null);
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////

  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const handleUploadFile = async () => {
    dispatch(setGlobalLoading(true));
    if (fileName === '' || fileContent === null) {
      setNotification('warning', 'Vui lòng nhập các trường bắt buộc.');
      dispatch(setGlobalLoading(false));
      return;
    }
    const fileMetadata = {
      fileName,
      author,
      desc,
      type,
      size,
      userId: userInfo?.UserID,
      deptId: userInfo?.DeptID,
      deleted: false,
      status: userInfo.Role === 'Staff' ? 'Pending' : 'Active',
      isPrivate: false,
    };
    const response = await uploadFileSupport(fileMetadata, fileContent);
    if (response?.data?.resultCode === '00095') {
      navigate(`/result-page`, { state: { type: 'file', status: 'success', isSupport: true } });
    } else {
      navigate(`/result-page`, { state: { type: 'file', status: 'error' } });
    }
    dispatch(setGlobalLoading(false));
  };

  const handleClickUploadFile = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';

    fileInput.addEventListener('change', (event) => {
      const selectedFile = event.target.files[0];
      setSize(selectedFile.size);
      setFileName(extractFileName(selectedFile.name));
      setType(extractFileType(selectedFile.name));
      setFileContent(selectedFile);
    });

    fileInput.click();
  };

  const renderBreadcrumb = (type) => {
    if (type === 'book') return 'Thư viện sách';
    else return 'Văn bản hành chính';
  };

  const handleScanFile = () => {
    setNotification('warning', 'Tính năng này chưa được hỗ trợ');
    return;
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
          name={`Tải lên tài liệu cho miền ${renderBreadcrumb(supportType)}`}
          ctnStyles="h-100 text18SemiBold border-bottom-1 border-style-solid border-bg5-60 br-10"
          btnStyles="bg-bgColor4 pLeft10"
          icon1Styles="w-24 h-24 d-flex justify-content-center align-items-center"
          icon1={<FontAwesomeIcon icon={icon.angleLeft} />}
          onClick={() => navigate('/home')}
        />
      </div>
      <div className={`${styles.input}`}>
        <div className={`${styles.btnUploadCtn}`}>
          <Button
            name="Quét tài liệu"
            ctnStyles="h-100 text14Medium bg-main br-10 pHorizontal15"
            btnStyles="bg-main pLeft10"
            icon1Styles="fs-16 d-flex justify-content-center align-items-center mRight10"
            icon1={<FontAwesomeIcon icon={icon.camera} />}
            onClick={handleScanFile}
          />
          <p className="textH6Bold mHorizontal10">Hoặc</p>
          <Button
            name="Tải từ hệ thống"
            ctnStyles="h-100 text14Medium bg-bgColor5 br-10 pHorizontal15"
            btnStyles="bg-bgColor5 pLeft10 white"
            icon1Styles="fs-16 d-flex justify-content-center align-items-center mRight10 white"
            icon1={<FontAwesomeIcon icon={icon.link} />}
            onClick={handleClickUploadFile}
          />
        </div>
        <Input
          type="text"
          text="* Tên tài liệu"
          bonusText="(tối đa 50 ký tự)"
          value={fileName}
          setData={setFileName}
          onEnter={() => {
            handleUploadFile();
          }}
        />
        <Input
          type="text"
          text="Tác giả"
          bonusText="(Tối đa 20 ký tự)"
          value={author}
          setData={setAuthor}
          onEnter={() => {
            handleUploadFile();
          }}
        />
        <Input
          type="textarea"
          text="Mô tả"
          value={desc}
          setData={setDesc}
          onEnter={() => {
            handleUploadFile();
          }}
        />
        <div className={`${styles.btnCtn} mBottom10`}>
          <div className={`${styles.btnWrapper}`}>
            <Button
              name="XÁC NHẬN"
              ctnStyles="h-100 textH6Bold br-10 bg-text justify-content-end"
              btnStyles="bg-text white d-flex justify-content-center align-items-center"
              onClick={() => {
                handleUploadFile();
              }}
              isLoad={isLoad}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

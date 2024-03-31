import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.css';
import icon from 'util/js/icon';
import Button from 'common/Button';
import Input from 'common/Input';
import CriteriaTag from 'common/CriteriaTag';
import { extractFileName, extractFileType, setNotification } from 'util/js/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFolderCriteria, uploadFile } from 'util/js/APIs';
import { setGlobalLoading } from '../../redux/action/app';

export default function EditFilePage() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.app.userInfo);
  const isLoad = useSelector((state) => state.app.globalLoading);
  const [criteria, setCritetia] = useState([]);
  const [fileName, setFileName] = useState('');
  const [author, setAuthor] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState(0);
  const [fileCriteria, setFileCriteria] = useState([]);
  const [fileContent, setFileContent] = useState(null);
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      const response = await getFolderCriteria();
      setCritetia(response?.data?.data?.criteria);
    };

    fetchData();
  }, []);
  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const handleUploadFile = async () => {
    dispatch(setGlobalLoading(true));
    if (fileName === '' || fileContent === null || fileCriteria.length === 0) {
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
      fileCriteria,
      userId: userInfo?.UserID,
      deptId: userInfo?.DeptID,
      deleted: false,
      status: 'Active',
      isPrivate: false,
    };
    const response = await uploadFile(fileMetadata, fileContent);
    if (response?.data?.resultCode === '00034') {
      navigate(`/result-page`, { state: { type: 'file', status: 'success' } });
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
          name="Sửa tài liệu"
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
          text="* Tên tài liệu"
          bonusText="(tối đa 50 ký tự)"
          value={fileName}
          setData={setFileName}
          onEnter={() => {handleUploadFile()}}
        />
        <Input
          type="text"
          text="Tác giả"
          bonusText="(Tối đa 20 ký tự)"
          value={author}
          setData={setAuthor}
          onEnter={() => {handleUploadFile()}}
        />
        <Input 
          type="textarea" 
          text="Mô tả" 
          value={desc} 
          setData={setDesc} 
          onEnter={() => {handleUploadFile()}}
        />
        <div className={`${styles.btnCtn} mBottom10`}>
          <div className={`${styles.btnWrapper}`}>
            <Button
              name="XÁC NHẬN"
              ctnStyles="h-100 textH6Bold br-10 bg-text justify-content-end"
              btnStyles="bg-text white d-flex justify-content-center align-items-center"
              onClick={handleUploadFile}
              isLoad={isLoad}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

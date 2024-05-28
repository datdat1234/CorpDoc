import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.css';
import icon from 'util/js/icon';
import Button from 'common/Button';
import Input from 'common/Input';
import CriteriaTag from 'common/CriteriaTag';
import { setNotification } from 'util/js/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFolderCriteria, getFileInfo, editFile, setApproveFiles } from 'util/js/APIs';
import { setGlobalLoading } from '../../redux/action/app';

export default function EditFilePage() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.app.userInfo);
  const isLoad = useSelector((state) => state.app.globalLoading);
  const { state } = useLocation();
  const { id, isSupportFolder } = state;
  const [criteria, setCritetia] = useState([]);
  const [fileName, setFileName] = useState('');
  const [author, setAuthor] = useState('');
  const [desc, setDesc] = useState('');
  const [fileCriteria, setFileCriteria] = useState([]);
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      const criteriaData = await getFolderCriteria();
      setCritetia(criteriaData?.data?.data?.criteria);
      const response = await getFileInfo(id);
      const resData = response?.data?.data;
      setFileName(resData.Name);
      setDesc(resData.Description);
      setAuthor(resData.Author);
      setFileCriteria(resData.Criteria);
    };

    fetchData();
  }, []);
  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const handleUploadFile = async () => {
    dispatch(setGlobalLoading(true));
    if (fileName === '' || fileCriteria.length === 0) {
      setNotification('warning', 'Vui lòng nhập các trường bắt buộc.');
      dispatch(setGlobalLoading(false));
      return;
    }
    const fileInfo = {
      fileId: id,
      fileName: fileName,
      author: author,
      desc: desc,
      fileCriteria: fileCriteria,
    };
    const response = await editFile(fileInfo);
    if (userInfo.Role !== 'Staff') {
      await setApproveFiles([fileInfo.fileId]);
    }
    if (response?.data?.resultCode === '00001') {
      navigate(`/result-page`, { state: { type: 'file', status: 'success', action: 'edit' } });
    } else {
      navigate(`/result-page`, { state: { type: 'file', status: 'error', action: 'edit' } });
    }
    dispatch(setGlobalLoading(false));
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
    return fileCriteria?.map((criterion, index) => {
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
          name={"Sửa tài liệu: " + fileName}
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
        {
        !isSupportFolder &&
        <>
          <Input
            type="select"
            text="* Tiêu chí của tài liệu"
            value={criteria}
            setData={handleSetCriteria}
            onEnter={() => {handleUploadFile()}}
            />
          <div className={`${styles.checkboxCtn}`}>{renderCriterionTag()}</div>
        </>
        }
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

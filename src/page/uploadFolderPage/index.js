import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.css';
import icon from 'util/js/icon';
import Button from 'common/Button';
import Input from 'common/Input';
import CriteriaTag from 'common/CriteriaTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFolderCriteria, getFolderPath, uploadFolder, getFolderInfo } from 'util/js/APIs';
import { setGlobalLoading } from '../../redux/action/app';
import { setNotification } from 'util/js/helper';

export default function UploadFolderPage() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.app.userInfo);
  const isLoad = useSelector((state) => state.app.globalLoading);
  const location = useLocation();
  const newStructure = location.state ? location.state.newStructure : null;
  const id = location.state ? location.state.id : null;
  const [criteria, setCritetia] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [author, setAuthor] = useState('');
  const [desc, setDesc] = useState('');
  const [folderCriteria, setFolderCriteria] = useState([]);
  const [folders, setFolders] = useState([]);
  const [folderParentInfo, setFolderParentInfo] = useState('');
  const [showCritNumber, setShowCritNumber] = useState(0);
  const [folderParent, setFolderParent] = useState('');
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      const critRes = await getFolderCriteria();
      const folderRes = await getFolderPath(userInfo?.DeptID);
      let allFolders = folderRes?.data?.data?.folder;
      setCritetia(critRes?.data?.data?.criteria);
      setFolders(allFolders);      
      for(let i=0; i<allFolders.length; i++) {
        if (allFolders[i].FolderID === id) {
          setFolderParentInfo(allFolders[i].Path);
          setFolderCriteria(allFolders[i].Criteria);
          setShowCritNumber(allFolders[i].Criteria.length);
          setFolderParent(allFolders[i].Name);
          break;
        }
      }
    };

    fetchData();
  }, []);
  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const handleUploadFolder = async () => {
    dispatch(setGlobalLoading(true));
    if (folderName === '' || showCritNumber === folderCriteria.length || (!newStructure && folderParentInfo === '')) {
      setNotification('warning', 'Vui lòng nhập các trường bắt buộc.');
      dispatch(setGlobalLoading(false));
      return;
    }
    const folderInfo = {
      folderName,
      author,
      desc,
      folderCriteria,
      folderParentInfo: folders.find(
        (folder) => folder.Path === folderParentInfo
      )?.FolderID,
      userId: userInfo?.UserID,
      deptId: userInfo?.DeptID,
      deleted: false,
      isPrivate: false,
    };
    const response = await uploadFolder(folderInfo);
    if (response?.data?.resultCode === '00093') {
      navigate(`/result-page`, { state: { type: 'folder', status: 'success', action: 'add', isNew: newStructure } });
    } else {
      navigate(`/result-page`, {
        state: { type: 'folder', status: 'error', action: 'add', isNew: newStructure },
      });
    }
    dispatch(setGlobalLoading(false));
  };

  const handleSetParentInfo = (value) => {
    setFolderParentInfo(value);
    var criteria = folders.find((folder) => folder.Path === value)?.Criteria;
    setFolderCriteria(criteria);
    setShowCritNumber(criteria.length);
  };

  const handleSetCriteria = (criterion) => {
    if (folderCriteria.includes(criterion) || criterion === '') return;
    else {
      setFolderCriteria([...folderCriteria, criterion]);
    }
  };

  const handleCloseCriteria = (criterion) => {
    setFolderCriteria(folderCriteria.filter((value) => value !== criterion));
  };

  const handlePathValue = () => {
    const options = [];
    for (let i = 0; i < folders.length; i++) {
      options.push(folders[i].Path);
    }
    return options;
  };

  //////////////////////////////////////////////////
  // #endregion FUNCTIONS //////////////////////////

  // #region    VIEWS //////////////////////////////
  //////////////////////////////////////////////////
  const renderCriterionTag = () => {
    return folderCriteria.map((criterion, index) => {
      return (
        <CriteriaTag
          key={index}
          text={criterion}
          handleClick={handleCloseCriteria}
          isShowIcon={index <= showCritNumber - 1 ? false : true}
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
          name={newStructure ? 'Tạo miền cấu trúc mới' : 'Thêm thư mục mới thuộc ' + folderParent}
          ctnStyles="h-100 text18SemiBold border-bottom-1 border-style-solid border-bg5-60 br-10"
          btnStyles="bg-bgColor4 pLeft10"
          icon1Styles="w-24 h-24 d-flex justify-content-center align-items-center"
          icon1={<FontAwesomeIcon icon={icon.angleLeft} />}
          onClick={() => navigate('/home')}
        />
      </div>
      <div className={`${styles.input}`}>
        {!newStructure && (
          <Input
            type="select"
            text="* Thư mục cha"
            value={handlePathValue()}
            setData={handleSetParentInfo}
            onEnter={() => {handleUploadFolder()}}
            defaultValue={folderParentInfo}
          />
        )}
        <Input
          type="text"
          text="* Tên miền"
          bonusText="(tối đa 50 ký tự)"
          value={folderName}
          setData={setFolderName}
          onEnter={() => {handleUploadFolder()}}
        />
        <Input
          type="text"
          text="Tác giả"
          bonusText="(Tối đa 20 ký tự)"
          value={author}
          setData={setAuthor}
          onEnter={() => {handleUploadFolder()}}
        />
        <Input 
          type="textarea" 
          text="Mô tả" 
          value={desc} 
          setData={setDesc} 
          onEnter={() => {handleUploadFolder()}}
        />
        <Input
          type="select-keydown"
          text="* Tiêu chí của thư mục"
          value={criteria}
          setData={handleSetCriteria}
          onEnter={() => {handleUploadFolder()}}
        />
        <div className={`${styles.checkboxCtn}`}>{renderCriterionTag()}</div>
        <div className={`${styles.btnCtn} mBottom10`}>
          <div className={`${styles.btnWrapper}`}>
            <Button
              name="XÁC NHẬN"
              ctnStyles="h-100 textH6Bold br-10 bg-text justify-content-end"
              btnStyles="bg-text white d-flex justify-content-center align-items-center"
              onClick={handleUploadFolder}
              isLoad={isLoad}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

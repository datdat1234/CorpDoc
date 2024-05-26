import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.css';
import icon from 'util/js/icon';
import Button from 'common/Button';
import Input from 'common/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFolderInfo, editFolder } from 'util/js/APIs';
import { setGlobalLoading } from '../../redux/action/app';
import { setNotification } from 'util/js/helper';

export default function EditFolderPage() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.app.userInfo);
  const isLoad = useSelector((state) => state.app.globalLoading);
  const { state } = useLocation();
  const { id } = state;
  const [folderName, setFolderName] = useState('');
  const [author, setAuthor] = useState('');
  const [desc, setDesc] = useState('');
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      const response = await getFolderInfo(id);
      const resData = response?.data?.data;
      setFolderName(resData.Name);
      setDesc(resData.Description);
      setAuthor(resData.Author);
    };

    fetchData();
  }, []);
  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const handleUploadFolder = async () => {
    dispatch(setGlobalLoading(true));
    if (folderName === '') {
      setNotification('warning', 'Vui lòng nhập các trường bắt buộc.');
      dispatch(setGlobalLoading(false));
      return;
    }
    const folderInfo = {
      folderId: id,
      folderName: folderName,
      author: author,
      desc: desc,
    };
    const response = await editFolder(folderInfo);
    if (response?.data?.resultCode === '00001') {
      navigate(`/result-page`, { state: { type: 'folder', status: 'success', action: 'edit' } });
    } else {
      navigate(`/result-page`, {
        state: { type: 'folder', status: 'edit',action: 'edit' },
      });
    }
    dispatch(setGlobalLoading(false));
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
          name={'Sửa thư mục: ' + folderName}
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

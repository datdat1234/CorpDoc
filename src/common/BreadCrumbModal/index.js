import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.css';
import Button from 'common/Button';
import { BREAD_CRUMB_TABS } from 'util/js/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from 'util/js/icon';
import { setOpenModal } from '../../redux/action/app';
import { downloadFile } from 'util/js/APIs';
import { saveAs } from 'file-saver';

export default function BreadCrumbModal({
  ctnStyles = '',
  save,
  setSave,
  handleChangeSave,
  handleDeleteBtn,
  isFolder = true,
  isPrivate = false,
  infoItm = '',
  isSupportFolder = false,
}) {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.app.userInfo);
  const dispatch = useDispatch();
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////

  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const handleDownloadfile = async (fileId) => {
    try {
      const response = await downloadFile(fileId);
      const blob = new Blob([response?.data], { type: 'application/pdf' });
      saveAs(blob, `${fileId}.pdf`);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  //////////////////////////////////////////////////
  // #endregion FUNCTIONS //////////////////////////

  // #region    VIEWS //////////////////////////////
  //////////////////////////////////////////////////
  const renderTabs = () => {
    const tabItems = [];
    const tabLength = BREAD_CRUMB_TABS.length;
    tabItems.push(
      <div key={0} className={styles.tabCtn}>
        <Button
          ctnStyles={`h-60 border-style-solid`}
          name={!save? "Lưu": "Bỏ lưu"}
          icon1Styles="w-24 h-24 fs-16"
          icon2Styles="w-24 h-24 fs-16"
          btnStyles="bg-bgColor4 text14SemiBold pLeft10"
          icon1={<FontAwesomeIcon icon={!save? icon.bookmark: icon.unBookmark} />}
          onClick={() => handleChangeSave()}
        />
      </div>
    );
    if (!isFolder) {
      tabItems.push(
        <div key={1} className={styles.tabCtn}>
          <Button
            ctnStyles={`h-60 border-top-1 border-style-solid`}
            name={BREAD_CRUMB_TABS[1].text}
            icon1Styles="w-24 h-24 fs-16"
            icon2Styles="w-24 h-24 fs-16"
            btnStyles="bg-bgColor4 text14SemiBold pLeft10"
            icon1={
              BREAD_CRUMB_TABS[1].icon1 && (
                <FontAwesomeIcon icon={BREAD_CRUMB_TABS[1].icon1} />
              )
            }
            icon2={
              BREAD_CRUMB_TABS[1].icon2 && (
                <FontAwesomeIcon icon={BREAD_CRUMB_TABS[1].icon2} />
              )
            }
            onClick={() => handleDownloadfile(infoItm)}
          />
        </div>
      );
    }
    if (userInfo.Role !== 'Staff' && !isPrivate) {
      tabItems.push(
        <div key={2} className={styles.tabCtn}>
          <Button
            ctnStyles={`h-60 border-top-1 border-style-solid`}
            name={BREAD_CRUMB_TABS[2].text}
            icon1Styles="w-24 h-24 fs-16"
            icon2Styles="w-24 h-24 fs-16"
            btnStyles="bg-bgColor4 text14SemiBold pLeft10"
            icon1={
              BREAD_CRUMB_TABS[2].icon1 && (
                <FontAwesomeIcon icon={BREAD_CRUMB_TABS[2].icon1} />
              )
            }
            icon2={
              BREAD_CRUMB_TABS[2].icon2 && (
                <FontAwesomeIcon icon={BREAD_CRUMB_TABS[2].icon2} />
              )
            }
            onClick={() => dispatch(setOpenModal({type:'shareModal', infoItm:{isFolder: isFolder, id: infoItm}}))}
          />
        </div>
      );
    }
    if (isFolder) {
      tabItems.push(
        <div key={3} className={styles.tabCtn}>
          <Button
            ctnStyles={`h-60 border-top-1 border-style-solid`}
            name={BREAD_CRUMB_TABS[3].text}
            icon1Styles="w-24 h-24 fs-16"
            icon2Styles="w-24 h-24 fs-16"
            btnStyles="bg-bgColor4 text14SemiBold pLeft10"
            icon1={
              BREAD_CRUMB_TABS[3].icon1 && (
                <FontAwesomeIcon icon={BREAD_CRUMB_TABS[3].icon1} />
              )
            }
            icon2={
              BREAD_CRUMB_TABS[3].icon2 && (
                <FontAwesomeIcon icon={BREAD_CRUMB_TABS[3].icon2} />
              )
            }
            onClick={() => navigate(`/${BREAD_CRUMB_TABS[3].navigate}`,{
              state: { id: infoItm },})
            }
          />
        </div>
      );
    }
    if (!isFolder || (isFolder && userInfo.Role !== 'Staff')) {
      tabItems.push(
        <div key={4} className={styles.tabCtn}>
          <Button
            ctnStyles={`h-60 border-top-1 border-style-solid`}
            name={BREAD_CRUMB_TABS[4].text}
            icon1Styles="w-24 h-24 fs-16"
            icon2Styles="w-24 h-24 fs-16"
            btnStyles="bg-bgColor4 text14SemiBold pLeft10"
            icon1={
              BREAD_CRUMB_TABS[4].icon1 && (
                <FontAwesomeIcon icon={BREAD_CRUMB_TABS[4].icon1} />
              )
            }
            icon2={
              BREAD_CRUMB_TABS[4].icon2 && (
                <FontAwesomeIcon icon={BREAD_CRUMB_TABS[4].icon2} />
              )
            }
            onClick={() => navigate(`/${isFolder? 'edit-folder': 'edit-file'}`,{ state: { id: infoItm, isSupportFolder: isSupportFolder } })}
          />
        </div>
      );
    }
    if (isFolder && userInfo.Role !== 'Staff') {
      tabItems.push(
        <div key={5} className={styles.tabCtn}>
          <Button
            ctnStyles={`h-60 border-top-1 border-style-solid`}
            name={BREAD_CRUMB_TABS[5].text}
            icon1Styles="w-24 h-24 fs-16"
            icon2Styles="w-24 h-24 fs-16"
            btnStyles="bg-bgColor4 text14SemiBold pLeft10"
            icon1={
              BREAD_CRUMB_TABS[5].icon1 && (
                <FontAwesomeIcon icon={BREAD_CRUMB_TABS[5].icon1} />
              )
            }
            icon2={
              BREAD_CRUMB_TABS[5].icon2 && (
                <FontAwesomeIcon icon={BREAD_CRUMB_TABS[5].icon2} />
              )
            }
            onClick={() => navigate(`/${BREAD_CRUMB_TABS[5].navigate}`,{
              state: { id: infoItm },})
            }
          />
        </div>
      );
    }
    return tabItems;
  };
  //////////////////////////////////////////////////
  // #endregion VIEWS //////////////////////////////
  return (
    <div className={`${styles.root} ${ctnStyles}`}>
      <div
        className={`pHorizontal20 bg-bgColor4 ${(userInfo.Role === 'Staff' || isSupportFolder)&& 'br-BottomLeft-15 br-BottomRight-15'}`}
      >
        {renderTabs()}
      </div>
      {(userInfo.Role !== 'Staff' && (!isSupportFolder || (isSupportFolder && !isFolder)))&&
        <div key={6} className={`pHorizontal20 bg-bgColor5 br-BottomLeft-15 br-BottomRight-15 ${styles.tabCtn}`}>
          <Button
            ctnStyles={`h-60 bg-bgColor5`}
            name='Xóa'
            icon1Styles="w-24 h-24 fs-16 header"
            btnStyles="bg-bgColor5 header text14SemiBold pLeft10"
            icon1={<FontAwesomeIcon icon={icon.trashCan} />}
            onClick={() => handleDeleteBtn()}
          />
        </div>
      }
    </div>
  );
}

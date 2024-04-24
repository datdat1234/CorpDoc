import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UseOnClickOutside from 'util/hook/useOnClickOutside';
import styles from './styles.module.css';
import Button from 'common/Button';
import { BREAD_CRUMB_TABS } from 'util/js/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from 'util/js/icon';
import { setOpenModal } from '../../redux/action/app';

export default function BreadCrumbModal({
  ctnStyles = '',
  save,
  setSave,
  handleChangeSave,
  handleDeleteBtn,
  isFolder = true,
  infoItm = '',
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
          ctnStyles={`h-60 border-bottom-1 border-style-solid`}
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
            ctnStyles={`h-60 border-bottom-1 border-style-solid`}
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
            onClick={() => console.log(1)}
          />
        </div>
      );
    }
    if (userInfo.Role !== 'Staff') {
      tabItems.push(
        <div key={2} className={styles.tabCtn}>
          <Button
            ctnStyles={`h-60 border-bottom-1 border-style-solid`}
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
    for (let i = 3; i < tabLength; i++) {
      tabItems.push(
        <div key={i} className={styles.tabCtn}>
          <Button
            ctnStyles={`h-60 ${
              i !== tabLength - 1 && 'border-bottom-1 border-style-solid'
            }`}
            name={BREAD_CRUMB_TABS[i].text}
            icon1Styles="w-24 h-24 fs-16"
            icon2Styles="w-24 h-24 fs-16"
            btnStyles="bg-bgColor4 text14SemiBold pLeft10"
            icon1={
              BREAD_CRUMB_TABS[i].icon1 && (
                <FontAwesomeIcon icon={BREAD_CRUMB_TABS[i].icon1} />
              )
            }
            icon2={
              BREAD_CRUMB_TABS[i].icon2 && (
                <FontAwesomeIcon icon={BREAD_CRUMB_TABS[i].icon2} />
              )
            }
            onClick={() => navigate(`/${i===3 && isFolder? 'edit-folder' : BREAD_CRUMB_TABS[i].navigate}`,{
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
        className={`pHorizontal20 bg-bgColor4 ${userInfo.Role === 'Staff' && 'br-BottomLeft-15 br-BottomRight-15'}`}
      >
        {renderTabs()}
      </div>
      {userInfo.Role !== 'Staff' &&
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

import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from 'common/Button';
import SidebarTab from 'common/SidebarTab';
import Notification from 'common/Notification';
import Header from './Header';
import FileHeader from './FileHeader';
import Sidebar from './Sidebar';
import SettingSidebar from './SettingSidebar';
import {
  NO_LAYOUT_LINKS,
  NOT_SHOW_SIDEBAR,
  IS_SETTING_PAGE,
} from 'util/js/constant';
import styles from './styles.module.css';
import PDFRenderer from 'common/PDFRenderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from 'util/js/icon';
import CustomModal from 'common/CustomModal';

export default function Layout({ children }) {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const fileInfo = useSelector((state) => state.app.fileInfo);
  const noti = useSelector((state) => state.app.noti);
  const openModal = useSelector((state) => state.app.openModal);
  const resizableRef = useRef(null);
  const resizableSidebarRef = useRef(null);
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [scale, setScale] = useState(100);
  const [width, setWidth] = useState(50);
  const [sidebarWidth, setSidebarWidth] = useState(33.328);
  const [showPdf, setShowPdf] = useState(false);
  const [isEnterPage, setIsEnterPage] = useState(false);
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(() => {
    setShowPdf(fileInfo?.Url ? true : false);
  
  }, [fileInfo]);
  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const isShowLayout = () => {
    return (
      NO_LAYOUT_LINKS.findIndex((item) => item === location.pathname) === -1
    );
  };

  const checkShowSideBar = () => {
    return (
      NOT_SHOW_SIDEBAR.findIndex((item) => item === location.pathname) === -1
    );
  };

  const checkSettingPage = () => {
    return IS_SETTING_PAGE.findIndex((item) => item === location.pathname) >= 0;
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event) => {
    const containerWidth = resizableRef.current.parentNode.clientWidth;
    var newWidth = (event.clientX / containerWidth) * 100;
    if (newWidth < 40) newWidth = 40;
    else if (newWidth > 60) newWidth = 60;
    setWidth(newWidth);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDownSideBar = (event) => {
    event.preventDefault();
    document.addEventListener('mousemove', handleMouseMoveSideBar);
    document.addEventListener('mouseup', handleMouseUpSideBar);
  };

  const handleMouseMoveSideBar = (event) => {
    const containerWidth = resizableSidebarRef.current.parentNode.clientWidth;
    let newWidth = (event.clientX / containerWidth) * 100;
    if (newWidth > 40) newWidth = 40;
    setSidebarWidth(newWidth);
  };

  const handleMouseUpSideBar = () => {
    document.removeEventListener('mousemove', handleMouseMoveSideBar);
    document.removeEventListener('mouseup', handleMouseUpSideBar);
  };
  //////////////////////////////////////////////////
  // #endregion FUNCTIONS //////////////////////////

  // #region    VIEWS //////////////////////////////
  //////////////////////////////////////////////////
  const renderLayout = () => {
    if (!isShowLayout()) return <>{children}</>;
    return (
      <div className={`container-fluid d-flex flex-row ${styles.root}`}>
        <div
          className="col-12 position-relative"
          ref={resizableRef}
          style={{ width: `${width}%` }}
        >
          <div className={`d-flex flex-column ${styles.leftDiv}`}>
            <Header />
            <div className={`d-flex flex-row ${styles.bodyLeft}`}>
              {checkShowSideBar() && (
                <div
                  className={`${styles.sidebar}`}
                  ref={resizableSidebarRef}
                  style={{ width: `${sidebarWidth}%` }}
                >
                  <Sidebar />
                  <div
                    className={`${styles.resizerSideBar}`}
                    onMouseDown={handleMouseDownSideBar}
                  ></div>
                </div>
              )}
              {checkSettingPage() && <SettingSidebar />}
              <div
                className={`${styles.contentCtn}`}
                style={{
                  width: `${
                    checkShowSideBar() || checkSettingPage()
                      ? 100 - sidebarWidth
                      : 100
                  }%`,
                }}
              >
                {children}
              </div>
            </div>
            {noti.type && <Notification noti={noti}/>}
            {openModal?.type !== '' && 
              <CustomModal 
                type={openModal.type} 
                infoItm={openModal.infoItm} 
                update={openModal.update} 
                setUpdate={openModal.setUpdate} 
              />
            }
          </div>
          <div
            className={`d-flex flex-column justify-content-center align-items-center ${styles.resizer}`}
            onMouseDown={handleMouseDown}
          >
            <FontAwesomeIcon icon={icon.gripLinesVertical} />
          </div>
        </div>
        <div
          className={`${styles.pdfCtn} ${!showPdf && 'bg-bgColor7'}`}
          style={{ width: `${100 - width}%` }}
        >
          {showPdf && (
            <div className={`d-flex flex-column ${styles.rightDiv}`}>
              <div className={`row-2 ${styles.rightDivHeader}`}>
                <FileHeader
                  page={page}
                  setPage={setPage}
                  totalPage={totalPage}
                  scale={scale}
                  setScale={setScale}
                  setShowPdf={setShowPdf}
                  setIsEnterPage={setIsEnterPage}
                />
              </div>
              <div className={styles.rightDivBody}>
                <PDFRenderer
                  page={page}
                  setPage={setPage}
                  totalPage={totalPage}
                  setTotalPage={setTotalPage}
                  scale={scale}
                  isEnterPage={isEnterPage}
                  setIsEnterPage={setIsEnterPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  //////////////////////////////////////////////////
  // #endregion VIEWS //////////////////////////////
  return <>{renderLayout()}</>;
}

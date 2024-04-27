import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SrcItem from 'common/SrcItem';
import styles from './styles.module.css';
import { SUPPORT_ITEM_GRIDS } from 'util/js/constant';
import Pagination from 'common/Pagination';
import { getSupportStructure, viewFile } from 'util/js/APIs';
import { formatItemSupportFolder, formatItemFile } from 'util/js/helper';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from 'util/js/icon';
import IconButton from 'common/IconButton';
import { setFileInfo } from '../../redux/action/app';
import BreadCrumbSupport from 'common/BreadCrumbSupport';

export default function SupportFolderPage() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  var userInfo = useSelector((state) => state.app.userInfo);
  var switchFolder = useSelector((state) => state.app.folderPage);
  const itemPerPage = 20;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var header = [
    {
      text: '',
      type: '',
    },
    {
      text: 'Tên',
      type: 'header',
    },
    {
      text: 'Ngày đăng tải',
      type: 'header',
    },
    {
      text: 'Kích thước',
      type: 'header',
    },
    {
      text: '',
      type: '',
    },
  ];
  const { typeDoc, pathDoc } = useParams();
  const [allItems, setAllItems] = useState({childs:[], type: '', name: ''});
  const [items, setItems] = useState([]);
  const [path, setPath] = useState('');
  const [crtPage, setCrtPage] = useState(1);
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(()=> {  
    let pathArr = [];
    if (pathDoc?.length > 0) {
      pathArr = pathDoc.split("-");
      if (pathArr.length === 0) pathArr.push(pathDoc);
    } 
    let pathFolder = allItems;
    if (pathArr.length > 0) {
      setItems([]);
      let findFolder = allItems.childs;
      for (let i = 0; i < pathArr.length; i++) { 
        for (let j = 0; j < findFolder.length; j++) {
          if (findFolder[j].name === pathArr[i]) {
            pathFolder = findFolder[j];
            findFolder = findFolder[j].childs;
            break;
          }
        }
      }
    }
    if (pathFolder.type === 'folder') {
      setItems(formatItemSupportFolder(pathFolder.childs));
    }
    else if (pathFolder.type === 'file') {
      setItems(formatItemFile(pathFolder.childs));
    }
  },[path])
  
  useEffect(() => {
    const fetchData = async () => {
      if (typeDoc) {
        setItems([]);
        const domainRes = await getSupportStructure(userInfo.DeptID, typeDoc);
        const domain = domainRes?.data?.data?.dataRes;
        setAllItems(domain);
        let pathInit = domain.name;
        let pathArr = [];
        if (pathDoc?.length > 0) {
          pathArr = pathDoc.split("-");
          if (pathArr.length === 0) pathArr.push(pathDoc);
          for(let i = 0; i < pathArr.length; i++){
            pathInit += ' / ' + pathArr[i];
          } 
        }
        setPath(pathInit);
      }
    };

    fetchData();
  }, [pathDoc || typeDoc]);
  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const handleViewfile = async (id) => {
    try {
      const response = await viewFile(id);
      const fileInfo = response?.data?.data;
      dispatch(setFileInfo({ ...fileInfo }));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOnclick = (i) => {
    if (items[i][1].type !== 'file') {
      navigate(`/folder-support/${typeDoc}/${pathDoc? pathDoc+'-'+items[i][1].text : items[i][1].text}`);
    }
    else {
      handleViewfile(items[i][1].id);
    }
  }

  //////////////////////////////////////////////////
  // #endregion FUNCTIONS //////////////////////////

  // #region    VIEWS //////////////////////////////
  //////////////////////////////////////////////////
  const renderItem = () => {
    const tabItems = [];
    tabItems.push (
      <SrcItem
        grid={SUPPORT_ITEM_GRIDS}
        value={header}
      />
    )
    if (items !== undefined) {
      for (let i = 0; i < items.length; i++) {
        if (i >= (crtPage-1)*itemPerPage && i < (crtPage)*itemPerPage) {
          tabItems.push(
            <div key={i}>
              <div className={`${styles.item}`}>
                <IconButton
                  icon={<FontAwesomeIcon icon={icon.unBookmark} />}
                  ctnStyles="col-1 mRight10"
                  onClick={() => {console.log('click')}}
                />
                <div
                  className={`w-100 ${styles.textCtn}`}
                  onClick={() => handleOnclick(i)}
                >
                  <div className={`${styles.icon} ${items[i][1].type === "file" ? 'text' : 'main'}`}>{<FontAwesomeIcon icon={items[i][1].type === "file" ? icon.file : icon.folder} size={'lg'} />}</div>
                  <p className={`w-100 mLeft10 ${styles.btn} ${items[i][1].type === "file" ? 'text14Bold' : 'text14Medium'}`}>{items[i][1].text}</p>
                </div>
                <div
                  className={`col-6 ${styles.textCtn}`}
                >
                  {items[i][1].type === "file" &&
                    <p className={`text14Medium ellipsis`}>
                      {items[i][2].text}
                    </p>
                  }
                </div>
                <div
                  className={`col-6 ${styles.textCtn}`}
                >
                  {items[i][1].type === "file" &&
                    <p className={`text14Medium ellipsis ta-right mRight10'`}>
                      {items[i][3].text}
                    </p>
                  }
                </div>
                <div className={`col-1`}>
                  <IconButton
                    icon={<FontAwesomeIcon icon={icon.ellipsisVertical} />}
                    onClick={() => {console.log('click')}}
                  />
                </div>
              </div>
            </div>
          );
        }
      }
    }
    return tabItems;
  };
  //////////////////////////////////////////////////
  // #endregion VIEWS //////////////////////////////
  return (
    <div className={`${styles.root}`}>
      <div className={`${styles.wrapper}`}>
        <BreadCrumbSupport path={path}/>
        <div className="w-100">{renderItem()}</div>
        <div className={`${styles.pagination}`}>
          <Pagination selectedPage={crtPage} setSelectedPage={setCrtPage} itemLength={items.length} itemPerPage={itemPerPage}/>
        </div>
      </div>
    </div>
  );
}

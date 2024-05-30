import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from 'common/BreadCrumb';
import SrcItem from 'common/SrcItem';
import styles from './styles.module.css';
import { HOMEPAGE_ITEM_GRIDS } from 'util/js/constant';
import Pagination from 'common/Pagination';
import { getChildByFolderId, getFileByCriteria, checkIsPrivate } from 'util/js/APIs';
import { formatItemFolder, formatItemFile } from 'util/js/helper';
import { useParams } from 'react-router-dom';

export default function FolderPage() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  var switchFolder = useSelector((state) => state.app.folderPage);
  var userInfo = useSelector((state) => state.app.userInfo);
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
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [crtPage, setCrtPage] = useState(1);
  const [isPrivate, setIsPrivate] = useState(false);
  const itemPerPage = 20;
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {

      if (id) {
        const isPrivateRes = await checkIsPrivate(id);
        setIsPrivate(isPrivateRes?.data?.data?.isPrivate);
      }

      setItems([]);
      const childRes = await getChildByFolderId(id);
      const filesRes = await getFileByCriteria(id);
      const folders = childRes?.data?.data?.child;
      const files = filesRes?.data?.data?.files;
      setItems(formatItemFolder(folders).concat(formatItemFile(files)));
    };

    fetchData();
  }, [switchFolder || userInfo]);
  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////

  //////////////////////////////////////////////////
  // #endregion FUNCTIONS //////////////////////////

  // #region    VIEWS //////////////////////////////
  //////////////////////////////////////////////////
  const renderItem = () => {
    const tabItems = [];
    tabItems.push(
      <div key={0}>
        <SrcItem
          grid={HOMEPAGE_ITEM_GRIDS}
          value={header}
        />
      </div>
    );
    for (let i = 0; i < items.length; i++) {
      if (i >= (crtPage - 1) * itemPerPage && i < (crtPage) * itemPerPage) {
        tabItems.push(
          <div key={i + 1}>
            <SrcItem
              grid={HOMEPAGE_ITEM_GRIDS}
              value={items[i]}
              isPrivate={isPrivate}
            />
          </div>
        );
      }
    }
    return tabItems;
  };
  //////////////////////////////////////////////////
  // #endregion VIEWS //////////////////////////////
  return (
    <div className={`${styles.root}`}>
      <div className={`${styles.wrapper}`}>
        <BreadCrumb isPrivate={isPrivate} />
        <div className="w-100">{renderItem()}</div>
        <div className={`${styles.pagination}`}>
          <Pagination selectedPage={crtPage} setSelectedPage={setCrtPage} itemLength={items.length} itemPerPage={itemPerPage} />
        </div>
      </div>
    </div>
  );
}

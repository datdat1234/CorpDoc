import React, { useState, useEffect } from 'react';
import BreadCrumb from 'common/BreadCrumb';
import SrcItem from 'common/SrcItem';
import styles from './styles.module.css';
import { DELETED_ITEM_GRIDS } from 'util/js/constant';
import Pagination from 'common/Pagination';
import { getDeletedFolder } from 'util/js/APIs';
import { formatItemDeletedFolder, formatItemDeletedFile } from 'util/js/helper';
import { upload } from '@testing-library/user-event/dist/upload';

export default function DeletedFolderPage() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  var header = [
    {
      text: 'Tên',
      type: 'header',
    },
    {
      text: 'Ngày đăng tải',
      type: 'header',
    },
    {
      text: 'Ngày xóa',
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
  const [items, setItems] = useState([]);
  const [change, setChange] = useState(false);
  const [crtPage, setCrtPage] = useState(1);
  const itemPerPage = 20;
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      const childRes = await getDeletedFolder();
      const folders = childRes?.data?.data?.folders;
      const files = childRes?.data?.data?.files;
      setItems(formatItemDeletedFolder(folders).concat(formatItemDeletedFile(files)));
    };

    fetchData();
  }, [change]);
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
          grid={DELETED_ITEM_GRIDS}
          value={header}
          update={change}
          setUpdate={setChange}
        />
      </div>
    );
    for (let i = 0; i < items.length; i++) {
      if (i >= (crtPage-1)*itemPerPage && i < (crtPage)*itemPerPage) {
        tabItems.push(
          <div key={i+1}>
            <SrcItem
              grid={DELETED_ITEM_GRIDS}
              value={items[i]}
              update={change}
              setUpdate={setChange}
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
        <div className="w-100">{renderItem()}</div>
        <div className={`${styles.pagination}`}>
          <Pagination selectedPage={crtPage} setSelectedPage={setCrtPage} itemLength={items.length} itemPerPage={itemPerPage}/>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import BreadCrumb from 'common/BreadCrumb';
import SrcItem from 'common/SrcItem';
import styles from './styles.module.css';
import { HOMEPAGE_ITEM_GRIDS } from 'util/js/constant';
import Pagination from 'common/Pagination';
import { getPrivateFolder } from 'util/js/APIs';
import { formatItemFolder, formatItemFile } from 'util/js/helper';

export default function PrivateFolderPage() {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
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
  const [items, setItems] = useState([]);
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      const childRes = await getPrivateFolder();
      const folders = childRes?.data?.data?.folders;
      const files = childRes?.data?.data?.files;
      setItems(formatItemFolder(folders).concat(formatItemFile(files)));
    };

    fetchData();
  }, []);
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
    for (let i = 0; i <= items.length; i++) {
      tabItems.push(
        <div key={i}>
          <SrcItem
            grid={HOMEPAGE_ITEM_GRIDS}
            value={i === 0 ? header : items[i - 1]}
          />
        </div>
      );
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
          <Pagination />
        </div>
      </div>
    </div>
  );
}

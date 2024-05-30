import React, { useState, useEffect } from 'react';
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
  const [crtPage, setCrtPage] = useState(1);
  const itemPerPage = 20;
  const isPrivate = true;
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
    tabItems.push(
      <div key={0}>
        <SrcItem
          grid={HOMEPAGE_ITEM_GRIDS}
          value={header}
        />
      </div>
    );
    for (let i = 0; i < items.length; i++) {
      if (i >= (crtPage-1)*itemPerPage && i < (crtPage)*itemPerPage) {
        tabItems.push(
          <div key={i+1}>
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
        <div className="w-100">{renderItem()}</div>
        <div className={`${styles.pagination}`}>
          <Pagination selectedPage={crtPage} setSelectedPage={setCrtPage} itemLength={items.length} itemPerPage={itemPerPage}/>
        </div>
      </div>
    </div>
  );
}

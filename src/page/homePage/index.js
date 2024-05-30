import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SrcItem from 'common/SrcItem';
import styles from './styles.module.css';
import { HOMEPAGE_ITEM_GRIDS } from 'util/js/constant';
import Pagination from 'common/Pagination';
import { getChildByFolderId } from 'util/js/APIs';
import { formatItemFolder } from 'util/js/helper';

export default function HomePage() {
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
  var switchFolder = useSelector((state) => state.app.folderPage);
  var userInfo = useSelector((state) => state.app.userInfo);
  const [crtPage, setCrtPage] = useState(1);
  const itemPerPage = 20;
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      const rootId = await localStorage.getItem('root');
      const childRes = await getChildByFolderId(rootId);
      const folders = childRes?.data?.data?.child;
      setItems(formatItemFolder(folders));
    };

    fetchData();
  }, [switchFolder || userInfo.DeptID]);
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
          <Pagination selectedPage={crtPage} setSelectedPage={setCrtPage} itemLength={items.length} itemPerPage={itemPerPage} />
        </div>
      </div>
    </div>
  );
}

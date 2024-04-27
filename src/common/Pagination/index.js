import React, { useState } from 'react';
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from 'util/js/icon';

export default function Pagination({selectedPage, setSelectedPage, itemLength, itemPerPage}) {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const [page, setPage] = useState(1);
  const maxPage = Math.ceil(itemLength/itemPerPage);
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////

  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const handleSetPage = (select) => {
    if (maxPage < 3) return 1;
    if (select <= 1) return 1;
    if (select >= maxPage) return maxPage-2;
    return select-1;
  }
  const handleDecreasePage = () => {
    setPage(handleSetPage(selectedPage-1));
    setSelectedPage(selectedPage - 1 < 1 ? 1 : selectedPage - 1);
  };

  const handleIncreasePage = () => {
    setPage(handleSetPage(selectedPage+1));
    setSelectedPage(selectedPage + 1 > maxPage ? maxPage : selectedPage + 1);
  };

  const handleSelectPage = (i) => {
    setPage(handleSetPage(i));
    setSelectedPage(i);
  };
  //////////////////////////////////////////////////
  // #endregion FUNCTIONS //////////////////////////

  // #region    VIEWS //////////////////////////////
  //////////////////////////////////////////////////
  const renderPagination = () => {
    const items = []; 
    let rightPage = page + 2;
    if (rightPage > maxPage) rightPage = maxPage
    for (let i = page; i <= rightPage; i++) {
      items.push(
        <div
          key={i}
          className={`pHorizontal10 pVertical5 br-5 text14 me-2 ${
            selectedPage === i ? 'bg-main' : 'bg-bgColor4'
          } ${styles.page}`}
          style={{ border: selectedPage !== i && '1px solid #231811' }}
          onClick={() => handleSelectPage(i)}
        >
          {i}
        </div>
      );
    }
    return items;
  };
  //////////////////////////////////////////////////
  // #endregion VIEWS //////////////////////////////
  return (
    <div className={`${styles.root}`}>
      {maxPage > 0 &&
      <>
        <button onClick={handleDecreasePage} className='me-2'>
          <FontAwesomeIcon icon={icon.angleLeft} />
        </button>
        <div className={`${styles.pageCtn}`}> {renderPagination()}</div>
        <button onClick={handleIncreasePage} className='me-2'>
          <FontAwesomeIcon icon={icon.angleRight} />
        </button>
      </>
      }
    </div>
  );
}

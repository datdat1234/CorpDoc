import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFolderPage } from '../../redux/action/app';
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from 'util/js/icon';

export default function FolderSupStruct({ name = '', childs, typeDoc = "", pathDoc = "" }) {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const switchFolder = useSelector((state) => state.app.folderPage);
  const [isExpand, setIsExpand] = useState(false);
  const [child, setChild] = useState([]);
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////

  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const handleExpand = async () => {
    setIsExpand(!isExpand);
  };

  const handleNavigate = () => {
    dispatch(setFolderPage(!switchFolder));
    navigate(`/folder-support/${typeDoc}/${pathDoc}`);
  };
  //////////////////////////////////////////////////
  // #endregion FUNCTIONS //////////////////////////

  // #region    VIEWS //////////////////////////////
  //////////////////////////////////////////////////
  const renderChildren = () => {
    if (!isExpand) return null;
    if (!childs) return [];
    const tabItems = [];
    for (let i = 0; i < childs.length; i++) {
      if (!childs[i].childs) break;
      tabItems.push(
        <div key={i}>
          <FolderSupStruct 
            name={childs[i].name} 
            childs={childs[i].childs}
            typeDoc={typeDoc}
            pathDoc={pathDoc !== ''? pathDoc + '-' + childs[i].name : childs[i].name}
          />
        </div>
      );
    }
    return tabItems;
  };
  //////////////////////////////////////////////////
  // #endregion VIEWS //////////////////////////////
  return (
    <div className={`${styles.ctn}`}>
      <div className={`w-100 ${styles.root}`}>
        <div
          className={`${styles.icon} ${styles.expandIcon}`}
          onClick={handleExpand}
        >
          {isExpand ? (
            <FontAwesomeIcon icon={icon.caretDown} />
          ) : (
            <FontAwesomeIcon icon={icon.caretRight} />
          )}
        </div>
        <div className={`${styles.icon} ${styles.folderIcon}`}>
          <FontAwesomeIcon icon={icon.folder} />
        </div>
        <button
          type="button"
          className={`${styles.button}`}
          onClick={handleNavigate}
        >
          {name}
        </button>
      </div>
      {renderChildren()}
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './styles.module.css';
import BreadCrumbModal from 'common/BreadCrumbModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from 'util/js/icon';
import { getBreadCrumb, setChangeSaveFolder } from 'util/js/APIs';
import UseOnClickOutside from 'util/hook/useOnClickOutside';
import { setNotification } from 'util/js/helper';

export default function BreadCrumbSupport({path}) {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const [modal, setModal] = useState(false);
  // const { id } = useParams();
  const ref = useRef();
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  UseOnClickOutside(ref, () => setModal(false));

  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////

  //////////////////////////////////////////////////
  // #endregion FUNCTIONS //////////////////////////

  // #region    VIEWS //////////////////////////////
  //////////////////////////////////////////////////

  //////////////////////////////////////////////////
  // #endregion VIEWS //////////////////////////////
  return (
    <div
      className={`w-100 pHorizontal10 ${
        modal ? 'br-2 br-TopLeft-15 br-TopRight-15' : 'br-15'
      } ${styles.root}`}
      ref={ref}
    >
      <FontAwesomeIcon icon={icon.angleRight} />
      <p className="pHorizontal10 textH6ExtraBold">
        {path}
      </p>
      <FontAwesomeIcon icon={icon.caretDown} />
    </div>
  );
}

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import IconButton from 'common/IconButton';
import Button from 'common/Button';
import TextIcon from 'common/TextIcon';
import CheckBoxForm from 'common/CheckBoxForm';
import BreadCrumbModal from 'common/BreadCrumbModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from 'util/js/icon';
import { 
  setChangeSaveFolder, 
  setChangeSaveFile, 
  resetPasswordUser, 
  changeStatusUser,
  setChangeFolderDelete, 
  setChangeFileDelete,
  setApproveFiles,
  setDeniedFiles
} from 'util/js/APIs';
import { setNotification } from 'util/js/helper';
import UseOnClickOutside from 'util/hook/useOnClickOutside';
import DeletedBreadCrumbModal from 'common/DeletedBreadCrumbModal';
import { setFolderPage, setOpenModal as setGlobalModal } from '../../redux/action/app';

export default function SrcItem({ value = [], grid = [], setUpdate=(e)=>{}, update }) {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  var modals = Array(grid.length).fill(false);
  const [save, setSave] = useState(value[0].text ?? false);
  const [modal, setModal] = useState(modals);
  const ref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const switchFolder = useSelector((state) => state.app.folderPage);
  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  UseOnClickOutside(ref, () => setModal([]));
  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////

  const setOpenModal = (index) => {
    if (modal[index] === true) {
      modals = Array(grid.length).fill(false);
    } else {
      modals = Array(grid.length).fill(false);
      modals[index] = true;
    }
    setModal(modals);
  };

  const handleChangeSave = async () => {
    if (value[1].type === 'folder') {
      await setChangeSaveFolder(save, value[1].id).then((res) => {
        if (res?.data?.data) {
          setNotification(
            'success',
            !save
              ? 'Đã thêm vào danh mục đã lưu.'
              : 'Đã xóa khỏi danh mục đã lưu.'
          );
          setSave(!save);
        } else {
          setNotification('error', res?.data?.resultMessage?.vi);
        }
      });
    } else {
      await setChangeSaveFile(save, value[1].id).then((res) => {
        if (res?.data?.data) {
          setNotification(
            'success',
            !save
              ? 'Đã thêm vào danh mục đã lưu.'
              : 'Đã xóa khỏi danh mục đã lưu.'
          );
          setSave(!save);
        } else {
          setNotification('error', res?.data?.resultMessage?.vi);
        }
      });
    }
  };

  const handleResetPassword = async () => {
    await resetPasswordUser([value[1].id]).then((res) => {
      if (res?.data?.data) {
        setNotification(
          'success',
          'Đã cài đặt lại mật khẩu cho người dùng ' + value[1].text 
        );
      } else {
        setNotification('error', res?.data?.resultMessage?.vi);
      }
    });
  }

  const handleChangeStatus = async (crtStatus = 'Active') => {
    await changeStatusUser([value[1].id], crtStatus).then((res) => {
      if (res?.data?.resultCode === "00001") {
        const status = res.data?.data === "Active" ? "kích hoạt" : "chặn";
        setNotification(
          'success',
          'Đã '+ status +' người dùng ' + value[1].text 
        );
        setUpdate(!update)
      } else {
        setNotification('error', res?.data?.resultMessage?.vi);
      }
    });
  }

  const handleDeleteBtn = async () => {
    if (value[1].type === 'folder') {
      await setChangeFolderDelete(value[1].id, false).then((res) => {
        if (res?.data?.data) {
          setNotification('success', 'Đã xóa thành công.');
          dispatch(setFolderPage(!switchFolder));
        } else {
          setNotification('error', res?.data?.resultMessage?.vi);
        }
      });
    } else {
      await setChangeFileDelete(value[1].id, false).then((res) => {
        if (res?.data?.data) {
          setNotification('success', 'Đã xóa thành công.');
          dispatch(setFolderPage(!switchFolder));
        } else {
          setNotification('error', res?.data?.resultMessage?.vi);
        }
      });
    }
  };

  const handleApproveBtn = async () => {
    await setApproveFiles([value[1].id]).then((res) => {
      if (res?.data?.resultCode === "00001") {
        setNotification('success', 'Tác vụ thành công.');
        setUpdate(!update);
      } else {
        setNotification('error', res?.data?.resultMessage?.vi);
      }
    });
  }

  const handleDeniedBtn = async () => {
    await setDeniedFiles([value[1].id]).then((res) => {
      if (res?.data?.resultCode === "00001") {
        setNotification('success', 'Tác vụ thành công.');
        setUpdate(!update);
      } else {
        setNotification('error', res?.data?.resultMessage?.vi);
      }
    });
  }
  //////////////////////////////////////////////////
  // #endregion FUNCTIONS //////////////////////////

  // #region    VIEWS //////////////////////////////
  //////////////////////////////////////////////////
  const renderBookmarkBtnCell = (isSave = false, index = 0) => {
    return (
      <IconButton
        icon={
          <FontAwesomeIcon icon={isSave ? icon.bookmark : icon.unBookmark} />
        }
        ctnStyles="mRight10"
        onClick={() => {
          handleChangeSave();
        }}
      />
    );
  };

  const renderEditBtnCell = (index = 0) => {
    return (
      <div className={`${styles.editCtn}`} ref={ref}>
        <IconButton
          icon={<FontAwesomeIcon icon={icon.ellipsisVertical} />}
          onClick={() => setOpenModal(index)}
        />
        {modal[index] && <BreadCrumbModal 
          ctnStyles="br-15 br-TopRight-2" 
          save={save} setSave={setSave} 
          handleChangeSave={handleChangeSave} 
          handleDeleteBtn={handleDeleteBtn} 
          isFolder={value[1].type==="file"? false: true} 
          infoItm={value[1].id}
          isSupportFolder={value[4].text==="support"}
        />}
      </div>
    );
  };

  const renderRestoreBtnCell = (index = 0) => {
    return (
      <div className={`${styles.editCtn}`} ref={ref}>
        <IconButton
          icon={<FontAwesomeIcon icon={icon.ellipsisVertical} />}
          onClick={() => setOpenModal(index)}
        />
        {modal[index] && <DeletedBreadCrumbModal 
          ctnStyles="br-15 br-TopRight-2 header" 
          isFolder={value[0].type==="file"? false: true} 
          infoItm={value[0].id}
          update={update}
          setUpdate={setUpdate}
        />}
      </div>
    );
  };

  const renderTextCell = (text, type) => {
    return (
      <p
        className={`text14Medium ellipsis ${
          type === 'text-size' && 'ta-right mRight10'
        }`}
      >
        {text} {type === 'text-size' && 'KB'}
      </p>
    );
  };

  const renderHeaderCell = (text) => {
    return (
      <Button
        name={text}
        ctnStyles="justify-content-start"
        icon1={null}
        icon2={<FontAwesomeIcon icon={icon.caretDown} />}
        icon2Styles="pLeft10"
        btnStyles="textH6Bold w-auto text bg-bgColor4"
        onClick={() => {
          console.log('click');
        }}

      />
    );
  };

  const renderNameCell = (isFile, text, id) => {
    if (isFile)
      return (
        <TextIcon
          text={text}
          icon1={<FontAwesomeIcon icon={icon.file} />}
          textStyles="text14Bold mLeft10"
          id={id}
          type="file"
        />
      );
    else {
      return (
        <TextIcon
          text={text}
          icon1={<FontAwesomeIcon icon={icon.folder} />}
          icon1Styles="main"
          textStyles="text14Medium mLeft10"
          id={id}
          type="folder"
        />
      );
    }
  };

  const renderCheckBox = (item) => {
    return (
      <CheckBoxForm
        arrChecked= {item.arrChecked}
        setArrChecked= {item.setArrChecked}
        isCheckAllInput={item.isCheckAllInput}
        setIsCheckAllInput={item.setIsCheckAllInput}
        index={item.index}
      />
    );
  };

  const renderApproval = (item) => {
    return (
      <div className={`${styles.approvalCtn}`}>
        <IconButton
          icon={<FontAwesomeIcon icon={icon.penToSquare} size='lg'/>}
          ctnStyles="d-flex justify-content-center align-item-center"
          onClick={() => dispatch(setGlobalModal({type:value[value.length-1].type+'Modal', infoItm: value, update: update, setUpdate: setUpdate}))}
        />
        <IconButton
          icon={<FontAwesomeIcon icon={icon.circleCheck} size='lg' className="bgColor4" />}
          ctnStyles="bg-success br-2 w-30 h-30 d-flex justify-content-center align-item-center"
          onClick={() => handleApproveBtn()}
        />
        <IconButton
          icon={<FontAwesomeIcon icon={icon.xmark} size='lg' className="bgColor4" />}
          ctnStyles="bg-error br-2 w-30 h-30 d-flex justify-content-center align-item-center"
          onClick={() => handleDeniedBtn()}
        />
      </div>
    );
  };

  const renderStaffManage = (item) => {
    return (
      <div className={`${styles.approvalCtn}`}>
        <IconButton
          icon={<FontAwesomeIcon icon={icon.rotateLeft} size='lg' className="bgColor4" />}
          ctnStyles="bg-success br-2 w-30 h-30 d-flex justify-content-center align-item-center"
          onClick={() => handleResetPassword()}
        />
        {item.text === 'Active' ?
        <IconButton
          icon={<FontAwesomeIcon icon={icon.userLock} className="bgColor4" />}
          ctnStyles="bg-error br-2 w-30 h-30 d-flex justify-content-center align-item-center"
          onClick={() => handleChangeStatus(item.text)}
        />:
        <IconButton
          icon={<FontAwesomeIcon icon={icon.unlock} className="bgColor4" />}
          ctnStyles="bg-error br-2 w-30 h-30 d-flex justify-content-center align-item-center"
          onClick={() => handleChangeStatus(item.text)}
        />
        }
      </div>
    );
  };

  const renderManage = (item) => {
    return (
      <div className={`${styles.approvalCtn}`}>
        <IconButton
          icon={<FontAwesomeIcon icon={icon.penToSquare} size='lg'/>}
          ctnStyles="d-flex justify-content-center align-item-center"
          onClick={() => dispatch(setGlobalModal({type:value[value.length-1].text, infoItm: value, update: update, setUpdate: setUpdate}))}
        />
      </div>
    );
  };

  const renderItems = (item, index) => {
    if (item.type.includes('save')) return renderBookmarkBtnCell(save);
    if (item.type.includes('edit')) return renderEditBtnCell(index);
    if (item.type.includes('restore')) return renderRestoreBtnCell(index);
    if (item.type.includes('text')) return renderTextCell(item.text, item.type);
    if (item.type.includes('header')) return renderHeaderCell(item.text);
    if (item.type.includes('file'))
      return renderNameCell(true, item.text, item.id);
    if (item.type.includes('folder'))
      return renderNameCell(false, item.text, item.id);
    if (item.type.includes('checkbox')) return renderCheckBox(item);
    if (item.type.includes('approval')) return renderApproval(item);
    if (item.type.includes('manage')) return renderManage(item);
    if (item.type.includes('staffManage')) return renderStaffManage(item);
  };

  const renderGrid = () => {
    return grid.map((val, index) => {
      return (
        <div key={index} className={`${val} ${value[index].type.includes('save') || value[index].type.includes('edit')? '' : 'pe-2'}`}>
          {renderItems(value[index], index)}
        </div>
      );
    });
  };
  //////////////////////////////////////////////////
  // #endregion VIEWS //////////////////////////////
  return <div className={`${styles.root}`}>{renderGrid()}</div>;
}

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.css';
import Button from 'common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from 'util/js/icon';
import Input from 'common/Input';
import {
  getAllOtherDept,
  getDeptShared,
  setSharedDeptIds,
  editDeptInfo,
  getDept,
  resetPasswordUser,
  editStaffInfo,
  changeStatusUser,
} from 'util/js/APIs';
import CriteriaTag from 'common/CriteriaTag';
import { setOpenModal } from '../../redux/action/app';
import { setNotification, formatCriteria } from 'util/js/helper';

export default function CustomModal({
  type = '',
  infoItm = '',
  update = true,
  setUpdate = (e) => { },
}) {
  // #region    VARIABLES //////////////////////////
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.app.userInfo);
  // shareModal
  const [deptData, setDeptData] = useState([]);
  const [sharedDepts, setSharedDepts] = useState([]);

  // deptModal
  const [name, setName] = useState('');
  const [storage, setStorage] = useState('');
  const [maxStorage, setMaxStorage] = useState(0);

  // userModal
  const [allDept, setAllDept] = useState([]);
  const [dept, setDept] = useState({ Name: '', DeptID: '' });
  const [resetPassword, setResetPassword] = useState(false);
  const [status, setStatus] = useState('Active');

  // approvalModal
  const [desc, setDesc] = useState('');
  const [criteria, setCriteria] = useState([]);
  const [author, setAuthor] = useState('');
  const [newValue, setNewValue] = useState(null);

  //////////////////////////////////////////////////
  // #endregion VARIABLES //////////////////////////

  // #region    useEffect //////////////////////////
  //////////////////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      switch (type) {
        case 'shareModal':
          const deptRes = await getAllOtherDept();
          setDeptData(deptRes?.data?.data?.dept);
          const sharedDeptsRes = await getDeptShared(infoItm);
          setSharedDepts(sharedDeptsRes?.data?.data?.dept);
          break;
        case 'deptModal':
          setName(infoItm[1].text);
          setStorage(infoItm[2].text);
          setMaxStorage(Number(infoItm[2].maxStorage) + Number(infoItm[2].text));
          break;
        case 'userModal':
          const allDeptRes = await getDept();
          let allDeptRaw = allDeptRes?.data?.data?.dept;
          let allDeptAft = [];
          for (let i = 0; i < allDeptRaw.length; i++) {
            allDeptAft.push({ Name: allDeptRaw[i].Name, DeptID: allDeptRaw[i].DeptID });
          }
          setAllDept(allDeptAft);
          setName(infoItm[1].text);
          setDept({ Name: infoItm[2].text, DeptID: infoItm[2].id });
          setStatus(infoItm[1].status);
          break;
        case 'approvalModal':
          const info = infoItm[infoItm.length - 1].text;
          setName(info.Name);
          setCriteria(info.Criteria);
          setDesc(info.Description);
          setAuthor(info.Author);
          setNewValue(info.NewValue);
          break;
        default: break;
      }
    }

    fetchData()
  }, []);

  //////////////////////////////////////////////////
  // #endregion useEffect //////////////////////////

  // #region    FUNCTIONS //////////////////////////
  //////////////////////////////////////////////////
  const handleCloseShareDept = (dept) => {
    setSharedDepts(sharedDepts.filter((value) => value !== dept));
  };

  const handleSetShareDept = (dept) => {
    if (sharedDepts.find(o => o.DeptID === dept.DeptID) || dept === '') return;
    else {
      setSharedDepts([...sharedDepts, dept]);
    }
  };

  const handleCloseModal = () => {
    dispatch(setOpenModal({ type: '', infoItm: {} }));
  }

  const validateDeptModal = () => {
    if (name === '') {
      setNotification("warning", "Vui lòng nhập tên phòng ban.");
      return false;
    }
    if (storage === '') {
      setNotification("warning", "Vui lòng nhập dung lượng cho phòng ban.");
      return false;
    }
    if (!Number(storage)) {
      setNotification("warning", "Dung lượng của phòng ban phải là số.");
      return false;
    }
    if (Number(storage) > Number(maxStorage)) {
      setNotification("warning", "Vui lòng nhập dung lượng nhỏ hơn dung lượng tối đa.");
      return false;
    }
    return true;
  }

  const handleSaveBtn = async () => {
    switch (type) {
      case 'shareModal':
        let ids = [];
        for (let i = 0; i < sharedDepts.length; i++) ids.push(sharedDepts[i].DeptID)
        await setSharedDeptIds(infoItm, ids);
        handleCloseModal();
        setNotification("success", "Chia sẻ thành công.");
        break;
      case 'deptModal':
        if (validateDeptModal()) {
          const data = {
            name: name,
            storage: storage
          }
          await editDeptInfo(infoItm[1].id, data);
          handleCloseModal();
          setUpdate(!update);
          setNotification("success", "Sửa đổi thành công.");
        };
        break;
      case 'userModal':
        if (resetPassword) await resetPasswordUser([infoItm[1].id]);
        let data = {
          userId: infoItm[1].id,
          name: name,
          deptId: dept.DeptID,
        }
        if (infoItm[4].value === 'Staff') {
          let crtStatus = status === 'Active' ? 'Blocked' : 'Active';
          await changeStatusUser([infoItm[1].id], crtStatus);
        }
        await editStaffInfo(data);
        handleCloseModal();
        setUpdate(!update);
        setNotification("success", "Sửa đổi thành công.");
        break;
      default: break;
    }
  }
  //////////////////////////////////////////////////
  // #endregion FUNCTIONS //////////////////////////

  // #region    VIEWS //////////////////////////////
  //////////////////////////////////////////////////
  const renderSharedTag = (items, handleFunc = (e) => { }) => {
    return items?.map((item, index) => {
      return (
        <CriteriaTag
          key={index}
          text={item}
          handleClick={handleFunc}
          isShowIcon={true}
        />
      );
    });
  };

  const renderApprovalTag = (items, handleFunc = (e) => { }) => {
    return items?.map((item, index) => {
      return (
        <CriteriaTag
          key={index}
          text={item}
          handleClick={handleFunc}
          isShowIcon={false}
        />
      );
    });
  };

  const renderNameModal = () => {
    switch (type) {
      case 'shareModal':
        return 'Chọn phòng ban chia sẻ';
      case 'deptModal':
        return 'Chỉnh sửa thông tin phòng ban';
      case 'userModal':
        return 'Chỉnh sửa thông tin nhân viên';
      case 'approvalModal':
        return 'Thông tin chi tiết';
      default: break;
    }
  }

  const renderViews = () => {
    switch (type) {
      case 'shareModal':
        return (
          <div className={`${styles.body}`}>
            <Input
              type="select"
              text="Phòng ban"
              value={deptData}
              defaultValue={'Chọn phòng ban'}
              setData={handleSetShareDept}
              isSelect={true}
            />
            <div className={`${styles.checkboxCtn}`}>{renderSharedTag(sharedDepts, handleCloseShareDept)}</div>
          </div>
        )
      case 'deptModal':
        return (
          <div className={`${styles.body}`}>
            <Input
              type="text"
              text="Tên"
              value={name}
              setData={setName}
            />
            <Input
              type="text"
              text={"Dung lượng tối đa (Tối đa: " + maxStorage + " GB)"}
              value={storage}
              setData={setStorage}
            />
            <Input
              type="text"
              text="Số nhân viên"
              value={infoItm[3].text}
              canChange={false}
            />
          </div>
        )
      case 'userModal':
        return (
          <div className={`${styles.body}`}>
            {infoItm[4].value !== 'Staff' ?
              <Input
                type="text"
                text="Phòng ban"
                value={dept.Name}
                setData={setName}
                canChange={false}
              />
              :
              <Input
                type="select"
                text="Phòng ban"
                value={allDept}
                defaultValue={dept.Name}
                setData={setDept}
                isSelect={true}
              />
            }
            <Input
              type="text"
              text="Họ và tên"
              value={name}
              setData={setName}
            />
            {infoItm[4].value !== 'Staff' ?
              <Input
                type="text"
                text="Trạng thái"
                value={status}
                setData={setName}
                canChange={false}
              />
              :
              <Input
                type="select"
                text="Trạng thái"
                value={['Active', 'Blocked']}
                defaultValue={status}
                setData={setStatus}
              />
            }
            <Input
              type="checkbox"
              text="Cài đặt lại mật khẩu"
              textStyles="textH6Bold mRight10"
              value={resetPassword}
              setData={setResetPassword}
            />
          </div>
        )
      case 'approvalModal':
        return (
          <div className={`${styles.body}`}>
            <Input
              type="text"
              text={newValue ? 'Tên cũ' : 'Tên'}
              value={name}
              canChange={false}
            />
            {newValue &&
              <Input
                type="text"
                text="Tên mới"
                value={newValue?.name}
                canChange={false}
              />
            }
            <Input
              type="text"
              text={newValue ? 'Tác giả cũ' : 'Tác giả'}
              value={author}
              setData={setAuthor}
              canChange={false}
            />
            {newValue &&
              <Input
                type="text"
                text="Tác giả mới"
                value={newValue?.author}
                canChange={false}
              />
            }
            <Input
              type="text"
              text={newValue ? 'Mô tả cũ' : 'Mô tả'}
              value={desc}
              setData={setDesc}
              canChange={false}
            />
            {newValue &&
              <Input
                type="text"
                text="Mô tả mới"
                value={newValue?.description}
                canChange={false}
              />
            }
            <p className="textH6Bold text-nowrapm mb-2">{newValue ? 'Tiêu chí cũ' : 'Tiêu chí'}</p>
            <div className={`${styles.checkboxCtn} mb-2`}>{renderApprovalTag(criteria)}</div>
            {newValue &&
              <>
                <p className="textH6Bold text-nowrapm mb-2">Tiêu chí mới</p>
                <div className={`${styles.checkboxCtn} mb-2`}>{renderApprovalTag(formatCriteria([{ Criteria: newValue.criteria }], 'remove'))}</div>
              </>
            }
          </div>
        )
      default: break;
    }
  }
  //////////////////////////////////////////////////
  // #endregion VIEWS //////////////////////////////
  return (
    <div className={`${styles.root}`}>
      <div className={`${styles.mainCtn}`}>
        <div className={`${styles.title} textH5Black`}>
          {renderNameModal()}
          <FontAwesomeIcon icon={icon.xmark} size='lg' className={`${styles.icon} pointer`} onClick={handleCloseModal} />
        </div>
        {renderViews()}
        {type !== 'approvalModal' &&
          <div className={`${styles.footer}`}>
            <div className={`${styles.btnCtn}`}>
              <Button
                name="XÁC NHẬN"
                ctnStyles="h-100 textH6Bold br-10 bg-text justify-content-end"
                btnStyles="bg-text white d-flex justify-content-center align-items-center"
                onClick={handleSaveBtn}
              />
            </div>
          </div>
        }
      </div>
    </div>
  );
}

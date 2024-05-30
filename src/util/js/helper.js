import { setNoti } from '../../redux/action/app';
import store from '../../redux/store';

const INNER_WIDTH = window.innerWidth;
const INNER_HEIGHT = window.innerHeight;
const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 900;
const MOBILE_DESIGN_WIDTH = 375;
const MOBILE_DESIGN_HEIGHT = 812;

export const deepClone = (item) => JSON.parse(JSON.stringify(item ?? ''));

export const rWidth = (value = 0, withpx = true) => {
  const result = (INNER_WIDTH * value) / DESIGN_WIDTH;
  return withpx ? `${result}px` : result;
};

export const rHeight = (value = 0, withpx = true) => {
  const result = (INNER_HEIGHT * value) / DESIGN_HEIGHT;
  return withpx ? `${result}px` : result;
};

export const rFont = (value = 0, withpx = true) => {
  const result = (INNER_WIDTH * value) / DESIGN_WIDTH;
  return withpx ? `${result}px` : result;
};

export const mrWidth = (value = 0, withpx = true) => {
  const result = (INNER_WIDTH * value) / MOBILE_DESIGN_WIDTH;
  return withpx ? `${result}px` : result;
};

export const mrHeight = (value = 0, withpx = true) => {
  const result = (INNER_HEIGHT * value) / MOBILE_DESIGN_HEIGHT;
  return withpx ? `${result}px` : result;
};

export const mrFont = (value = 0, withpx = true) => {
  const result = (INNER_WIDTH * value) / MOBILE_DESIGN_WIDTH;
  return withpx ? `${result}px` : result;
};

export const logMessage = (error) => {
  let msg = '';
  if (error?.response?.data?.resultMessage) {
    msg = error.response.data.resultMessage.vi;
  }
  return handleLogMessage(msg);
};

const handleLogMessage = (msg) => {
  console.log(msg);
};

export const extractFileName = (name) => {
  const arr = name.split('.');
  return arr[0];
};

export const extractFileType = (name) => {
  const arr = name.split('.');
  return arr[1];
};

export const formatItemFolder = (data) => {
  const formattedData = [];
  if(data !== undefined) {
    for (let i = 0; i < data.length; i++) {
      let createdDate;
      if (data[i].CreatedDate) {
        createdDate = new Date(data[i].CreatedDate);
      }
      formattedData.push([
        {
          text: data[i].IsSave? true : false,
          type: 'save',
        },
        {
          text: data[i].Name,
          type: 'folder',
          id: data[i].FolderID,
        },
        {
          text: createdDate.toLocaleString('en-GB',{
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'Asia/Ho_Chi_Minh',
          }),
          type: 'text',
        },
        {
          text: '',
          type: '',
        },
        {
          text: '',
          type: 'edit',
        },
      ]);
    }
  }
  return formattedData;
};

export const formatItemSupportFolder = (data) => {
  const formattedData = [];
  if(data !== undefined) {
    for (let i = 0; i < data.length; i++) {
      formattedData.push([
        {
          text: true,
          type: 'save',
        },
        {
          text: data[i].name,
          type: 'support-folder',
        },
        {
          text: '',
          type: 'text',
        },
        {
          text: '',
          type: 'text-size',
        },
        {
          text: '',
          type: 'edit',
        },
        {
          childs: data[i].childs,
          type: data[i].type
        }
      ]);
    }
  }
  return formattedData;
};

export const formatItemFile = (data) => {
  const formattedData = [];
  if(data !== undefined) {
    for (let i = 0; i < data.length; i++) {
      let createdDate;
      if (data[i].CreatedDate) {
        createdDate = new Date(data[i].CreatedDate);
      }
      formattedData.push([
        {
          text: data[i].IsSave? true: false,
          type: 'save',
        },
        {
          text: data[i].Name,
          type: 'file',
          id: data[i].FileID,
        },
        {
          text: createdDate.toLocaleString('en-GB',{
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'Asia/Ho_Chi_Minh',
          }),
          type: 'text',
        },
        {
          text: data[i].Size,
          type: 'text-size',
        },
        {
          text: '',
          type: 'edit',
        },
      ]);
    }
  }
  return formattedData;
};

export const formatItemDeletedFolder = (data) => {
  const formattedData = [];
  if(data !== undefined) {
    for (let i = 0; i < data.length; i++) {
      let createdDate, deletedDate;
      if (data[i].CreatedDate) {
        createdDate = new Date(data[i].CreatedDate);
      }
      if (data[i].UpdatedDate) {
        deletedDate = new Date(data[i].UpdatedDate);
      }
      formattedData.push([
        {
          text: data[i].Name,
          type: 'folder',
          id: data[i].FolderID,
        },
        {
          text: createdDate.toLocaleString('en-GB',{
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'Asia/Ho_Chi_Minh',
          }),
          type: 'text',
        },
        {
          text: deletedDate.toLocaleString('en-GB',{
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'Asia/Ho_Chi_Minh',
          }),
          type: 'text',
        },
        {
          text: '',
          type: '',
        },
        {
          text: '',
          type: 'restore',
        },
      ]);
    }
  }
  return formattedData;
};

export const formatItemDeletedFile = (data) => {
  const formattedData = [];
  if(data !== undefined) {
    for (let i = 0; i < data.length; i++) {
      let createdDate, deletedDate;
      if (data[i].CreatedDate) {
        createdDate = new Date(data[i].CreatedDate);
      }
      if (data[i].UpdatedDate) {
        deletedDate = new Date(data[i].UpdatedDate);
      }
      formattedData.push([
        {
          text: data[i].Name,
          type: 'file',
          id: data[i].FileID,
        },
        {
          text: createdDate.toLocaleString('en-GB',{
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'Asia/Ho_Chi_Minh',
          }),
          type: 'text',
        },
        {
          text: deletedDate.toLocaleString('en-GB',{
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'Asia/Ho_Chi_Minh',
          }),
          type: 'text',
        },
        {
          text: data[i].Size,
          type: 'text-size',
        },
        {
          text: '',
          type: 'restore',
        },
      ]);
    }
  }
  return formattedData;
};

export const formatItemPendingFile = (data) => {
  const formattedData = [];
  if(data !== undefined) {
    for (let i = 0; i < data.length; i++) {
      let createdDate, updatedDate;
      if (data[i].CreatedDate) {
        createdDate = new Date(data[i].CreatedDate);
      }
      if (data[i].UpdatedDate) {
        updatedDate = new Date(data[i].UpdatedDate);
      }
      formattedData.push([
        {
          text: data[i].Name,
          type: 'file',
          id: data[i].FileID,
        },
        {
          text: data[i].NewValue? 'Sửa đổi' : 'Tạo mới',
          type: 'text',
        },
        {
          text: data[i].username,
          type: 'text',
        },
        {
          text: (data[i].NewValue !== null? updatedDate : createdDate).toLocaleString('en-GB',{
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'Asia/Ho_Chi_Minh',
          }),
          type: 'text',
        },
        {
          text: data[i].deptname,
          type: 'text',
        },
        {
          text: data[i],
          type: 'approval',
        },
      ]);
    }
  }
  return formattedData;
};

export const getNameRole = (role) => {
  switch (role) { 
    case 'Manager':
      return 'Trưởng phòng';
    case 'Admin':
      return 'Quản trị viên';
    default: return 'Nhân viên';
  }
}

export const setNotification = (type, message) => {
  store.dispatch(setNoti({type: type, message: message}));
  setTimeout(()=>{
    store.dispatch(setNoti({type: '', message: ''}));
  }, 3000);
}

export const formatCriteria = (data, type) => {
  if (type === 'remove') {
    const criteria = data.flatMap((obj) => obj.Criteria);
    const uniqueCriteria = [...new Set(criteria)];
    const handledCriteria = uniqueCriteria.map((criterion) =>
      criterion.replace(/_/g, ' ')
    );
    handledCriteria.sort((a, b) => a.localeCompare(b));
    const uppercaseCriteria = handledCriteria.map(
      (criterion) => criterion.charAt(0).toUpperCase() + criterion.slice(1)
    );
    return uppercaseCriteria;
  } else {
    const convertedCriteria = data.map((criterion) =>
      criterion.toLowerCase().replace(/\s/g, '_')
    );
    return convertedCriteria;
  }
};

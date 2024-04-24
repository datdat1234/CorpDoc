import { get, post, put, remove } from './APICaller';
import { API_URL } from './constant';

const getCompanyId = () => {
  return localStorage.getItem('companyId');
};

//#region User

export const checkLogin = (username) => {
  return post(`${API_URL}/user/login`, {
    username: username,
  });
};

export const login = (username, password) => {
  return post(`${API_URL}/user/login`, {
    username: username,
    password: password,
  });
};

export const refreshToken = (refreshToken) => {
  return post(`${API_URL}/user/refresh-token`, {
    refreshToken: refreshToken,
  });
};

export const getAllUsersDept = () => {
  return post(`${API_URL}/user/get-all-users-dept`, {
    companyId: getCompanyId(),
  });
};

export const resetPasswordUser = (staffId) => {
  return post(`${API_URL}/user/reset-password`, {
    companyId: getCompanyId(),
    staffId: staffId
  });
};

export const changeStatusUser = (staffId, crtStatus) => {
  return post(`${API_URL}/user/change-status`, {
    companyId: getCompanyId(),
    staffId: staffId,
    crtStatus: crtStatus
  });
};

export const setCrtDeptAdmin = (deptId) => {
  return post(`${API_URL}/user/set-current-dept`, {
    companyId: getCompanyId(),
    deptId: deptId,
  });
};

//#endregion

//#region Profile

export const editUserInfo = (data) => {
  return post(`${API_URL}/user/edit-user-info`, {
    companyId: getCompanyId(),
    ...data,
  });
};

//#endregion

//#region File

export const getFileCriteria = () => {
  return get(`${API_URL}/file/criteria`, {
    companyId: getCompanyId(),
  });
};

export const getFileByCriteria = (folderId) => {
  return get(`${API_URL}/file/get-file`, {
    companyId: getCompanyId(),
    folderId,
  });
};

export const setChangeSaveFile = (status, fileId) => {
  return post(`${API_URL}/file/set-change-save`, {
    companyId: getCompanyId(),
    status: status,
    fileId: fileId,
  });
};

export const getFileAuthor = () => {
  return get(`${API_URL}/file/author`, {
    companyId: getCompanyId(),
  });
};

export const searchFile = (deptId, userId, searchData) => {
  return get(`${API_URL}/file/search`, {
    companyId: getCompanyId(),
    deptId: deptId,
    userId: userId,
    data: searchData,
  });
};


export const getFileInfo = (fileId) => {
  return post(
    `${API_URL}/file/get-file-info`,
    {
      companyId: getCompanyId(),
      fileId: fileId
    },
  );
};

export const editFile = (fileData) => {
  return post(
    `${API_URL}/file/edit-file`,
    {
      companyId: getCompanyId(),
      fileId: fileData.fileId,
      fileName: fileData.fileName,
      desc: fileData.desc,
      author: fileData.author,
      fileCriteria: fileData.fileCriteria
    },
  );
};

export const getUsedStorage = (deptId) => {
  return post(
    `${API_URL}/file/get-used-storage`,
    {
      companyId: getCompanyId(),
      deptId: deptId,
    },
  );
};

//#endregion

//#region Dept

export const getDeptName = () => {
  return get(`${API_URL}/dept/get-dept-name`, {
    companyId: getCompanyId(),
  });
};

export const getDept = () => {
  return get(`${API_URL}/dept/get-dept`, {
    companyId: getCompanyId(),
  });
};

export const getCrtDept = () => {
  return get(`${API_URL}/dept/get-current-dept`, {
    companyId: getCompanyId(),
  });
};

export const getAllOtherDept = () => {
  return get(`${API_URL}/dept/get-all-other-dept`, {
    companyId: getCompanyId(),
  });
};

export const getDeptShared = (infoItm) => {
  return post(`${API_URL}/dept/get-dept-shared`, {
    companyId: getCompanyId(),
    infoItm: infoItm,
  });
};

export const setSharedDeptIds = (infoItm, deptIds) => {
  return post(`${API_URL}/${infoItm.isFolder? 'folder':'file'}/set-shared-depts`, {
    companyId: getCompanyId(),
    id: infoItm.id,
    deptIds: deptIds,
  });
};

//#endregion

//#region Folder

export const getFolderCriteria = () => {
  return get(`${API_URL}/folder/criteria`, {
    companyId: getCompanyId(),
  });
};

export const getFolderAuthor = () => {
  return get(`${API_URL}/folder/author`, {
    companyId: getCompanyId(),
  });
};

export const getFolderPath = (deptId) => {
  return get(`${API_URL}/folder/get-path`, {
    companyId: getCompanyId(),
    deptId,
  });
};

export const uploadFolder = (folderInfo) => {
  return post(`${API_URL}/folder/upload-folder`, {
    companyId: getCompanyId(),
    ...folderInfo,
  });
};

export const getChildByFolderId = (folderId) => {
  return get(`${API_URL}/folder/get-child`, {
    companyId: getCompanyId(),
    folderId,
  });
};

export const getRootFolder = (deptId) => {
  return get(`${API_URL}/folder/get-root`, {
    companyId: getCompanyId(),
    deptId,
  });
};

export const getDomainFolder = (deptId) => {
  return post(`${API_URL}/folder/get-domain-folder`, {
    companyId: getCompanyId(),
    deptId: deptId,
  });
};

export const getBreadCrumb = (folderId) => {
  return post(`${API_URL}/folder/get-breadcrumb`, {
    companyId: getCompanyId(),
    folderId: folderId,
  });
};

export const setChangeSaveFolder = (status, folderId) => {
  return post(`${API_URL}/folder/set-change-save`, {
    companyId: getCompanyId(),
    status: status,
    folderId: folderId,
  });
};

export const getSupportStructure = (deptId, typeDoc) => {
  return get(`${API_URL}/folder/get-support-folder`, {
    deptId: deptId,
    typeDoc: typeDoc,
    companyId: getCompanyId(),
  });
};

export const searchFolder = (deptId, userId, searchData) => {
  return get(`${API_URL}/folder/search`, {
    companyId: getCompanyId(),
    deptId: deptId,
    userId: userId,
    data: searchData,
  });
};

export const getSavedFolder = () => {
  return get(`${API_URL}/folder/get-saved-folder`, {
    companyId: getCompanyId(),
  });
};

export const getSharedFolder = () => {
  return get(`${API_URL}/folder/get-shared-folder`, {
    companyId: getCompanyId(),
  });
};

export const getDeletedFolder = () => {
  return get(`${API_URL}/folder/get-deleted-folder`, {
    companyId: getCompanyId(),
  });
};

export const getFolderInfo = (folderId) => {
  return post(
    `${API_URL}/folder/get-folder-info`,
    {
      companyId: getCompanyId(),
      folderId: folderId
    },
  );
};

export const editFolder = (folderData) => {
  return post(
    `${API_URL}/folder/edit-folder`,
    {
      companyId: getCompanyId(),
      folderId: folderData.folderId,
      folderName: folderData.folderName,
      desc: folderData.desc,
      author: folderData.author,
    },
  );
};

export const setChangeFolderDelete = (folderId, isDeleted) => {
  return post(
    `${API_URL}/folder/set-change-delete`,
    {
      companyId: getCompanyId(),
      folderId: folderId,
      isDeleted: isDeleted,
    },
  );
};

export const getPrivateFolder = () => {
  return get(
    `${API_URL}/folder/get-private-folder`,
    {
      companyId: getCompanyId(),
    },
  );
};

//#endregion

//#region Notification

export const getNoti = (userId) => {
  return get(`${API_URL}/noti/get-noti`, {
    companyId: getCompanyId(),
    userId,
  });
};

//#endregion

//#region Media
export const viewFile = (fileId) => {
  return get(`${API_URL}/file`, {
    fileId: fileId,
    companyId: getCompanyId(),
  });
};

export const downloadFile = (fileId) => {
  return get(
    `${API_URL}/file/download`,
    {
      fileId: fileId,
      companyId: getCompanyId(),
    },
    { responseType: 'blob' }
  );
};

export const uploadFile = (fileMetadata, fileContent) => {
  const formData = new FormData();
  formData.append('file_metadata', JSON.stringify(fileMetadata));
  formData.append('company_id', JSON.stringify(getCompanyId()));
  formData.append('file', fileContent);
  return post(`${API_URL}/file/upload`, formData, {
    'Content-Type': 'multipart/form-data',
  });
};

export const uploadFileSupport = (fileMetadata, fileContent) => {
  const formData = new FormData();
  formData.append('file_metadata', JSON.stringify(fileMetadata));
  formData.append('company_id', JSON.stringify(getCompanyId()));
  formData.append('file', fileContent);
  return post(`${API_URL}/file/upload-support-domain`, formData, {
    'Content-Type': 'multipart/form-data',
  });
};

export const setChangeFileDelete = (fileId, isDeleted) => {
  return post(
    `${API_URL}/file/set-change-delete`,
    {
      companyId: getCompanyId(),
      fileId: fileId,
      isDeleted: isDeleted,
    },
  );
};

//#endregion

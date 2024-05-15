import icon from './icon';

export const BASE_URL = process.env.REACT_APP_BE_URL || 'http://localhost:3001';
export const API_URL = `${BASE_URL}/api`;
export const is1920x1080 = window.innerWidth === 1920;
export const is1920OrMore = window.innerWidth >= 1920;
export const is1440x900 = window.innerWidth === 1440;
export const is1366x768 = window.innerWidth === 1366;
export const SCREEN_WIDTH = window.innerWidth;
export const SCREEN_HEIGHT = window.innerHeight;

export const AUTH_FORM_WIDTH = 720;

export const GRID_STYLES = {
  c24: 'col-24',
  r24: 'row-24',
  c24_r24: 'col-24 row-24',
  c12_r6: 'col-12 row-6',
  r12: 'row-12',
  c12: 'col-12',
};

export const LOGIN_URL_FE = '/login';
export const REGISTER_URL_FE = '/register';

// Danh sách link không được hiện sidebar và header
export const NO_LAYOUT_LINKS = ['/', LOGIN_URL_FE, REGISTER_URL_FE];

export const SIDEBAR_TABS = [
  'Phòng ban: ',
  'Chia sẻ với phòng ban',
  'Đã lưu',
  'Thùng rác',
];

export const SIDEBAR_NAVIGATE = [
  'home',
  'shared-folder',
  'saved-folder',
  'deleted-folder',
];

export const SIDEBAR_ICONS = [
  icon.folderTree,
  icon.share,
  icon.bookmark,
  icon.trashCan,
];

export const SIDEBAR_TABS_ADMIN = [
  'Khu vực tài liệu mật',
  'Phòng ban: ',
  'Đã lưu',
  'Thùng rác',
];

export const SIDEBAR_NAVIGATE_ADMIN = [
  'private-folder',
  'home',
  'saved-folder',
  'deleted-folder',
];

export const SIDEBAR_ICONS_ADMIN = [
  icon.eyeSlash,
  icon.folderTree,
  icon.bookmark,
  icon.trashCan,
];

export const SIDEBAR_STRUCTURE = [
  {
    id: '1',
    name: 'Thư viện sách',
  },
  {
    id: '2',
    name: 'Văn bản hành chính',
  },
];

export const UPLOAD_TABS = [
  'Thư viện sách',
  'Văn bản hành chính',
];

export const CREATE_STRUCTURE = ['Tạo cấu trúc mới'];

export const UPLOAD_TABS_ICON = [
  {
    left: icon.plus,
    right: null,
  },
];

export const SEARCH_TABS = ['Tài liệu', 'Thư mục'];

export const SEARCH_TABS_ICON = [
  {
    left: null,
    right: icon.caretRight,
  },
  {
    left: null,
    right: icon.caretRight,
  },
];

export const PROFILE_TABS = ['Thông tin cá nhân', 'Đăng xuất'];

export const PROFILE_TABS_ICON = [
  {
    left: icon.user,
    right: null,
  },
  {
    left: null,
    right: icon.rightFromBracket,
  },
];

export const PROFILE_NAVIGATE = ['/profile', '/login'];

export const PROFILE_TABS_MANAGER = [
  'Thông tin cá nhân',
  'Quản lý nhân viên',
  'Đăng xuất',
];

export const PROFILE_TABS_MANAGER_ICON = [
  {
    left: icon.user,
    right: null,
  },
  {
    left: icon.clipboardUser,
    right: null,
  },
  {
    left: null,
    right: icon.rightFromBracket,
  },
];

export const PROFILE_NAVIGATE_MANAGER = [
  '/profile',
  '/staff-manage',
  '/login',
];

export const PROFILE_TABS_ADMIN = [
  'Thông tin cá nhân',
  'Thông tin công ty',
  'Thông tin phòng ban',
  'Quản lý nhân viên',
  'Đăng xuất',
];

export const PROFILE_TABS_ADMIN_ICON = [
  {
    left: icon.user,
    right: null,
  },
  {
    left: icon.building,
    right: null,
  },
  {
    left: icon.userGroup,
    right: null,
  },
  {
    left: icon.clipboardUser,
    right: null,
  },
  {
    left: icon.gear,
    right: null,
  },
  {
    left: null,
    right: icon.rightFromBracket,
  },
];

export const PROFILE_NAVIGATE_ADMIN = [
  '/profile',
  '/company-manage',
  '/dept-manage',
  '/staff-admin-manage',
  '/login',
];

export const SMALL_HOVER_TABS = ['Thêm thư mục', 'Thêm tài liệu'];

export const SMALL_HOVER_ICONS = [
  {
    left: null,
    right: icon.caretRight,
  },
  {
    left: null,
    right: icon.caretRight,
  },
];

export const BREAD_CRUMB_TABS = [
  {
    icon1: icon.bookmark,
    text: 'Lưu thư mục',
    icon2: null,
  },
  {
    icon1: icon.download,
    text: 'Tải xuống',
    icon2: null,
  },
  {
    icon1: icon.share,
    text: 'Chia sẻ',
    icon2: null,
  },
  {
    icon1: icon.pencil,
    text: 'Sửa thông tin',
    icon2: icon.caretRight,
    navigate: 'edit-file',
  },
  {
    icon1: icon.upload,
    text: 'Tải lên tài liệu',
    icon2: icon.caretRight,
    navigate: 'upload-file',
  },
  {
    icon1: icon.folder,
    text: 'Thêm thư mục',
    icon2: icon.caretRight,
    navigate: 'upload-folder',
  },
];

export const DELETED_BREAD_CRUMB_TABS = [
  {
    icon1: icon.trashArrowUp,
    text: 'Khôi phục tài liệu',
    icon2: null,
  },
];

export const NOTI_TABS = [
  {
    isRead: true,
    text: 'Tài liệu Cây cam ngọt của tôi đã được trưởng phòng xác nhận.',
  },
  {
    isRead: false,
    text: 'Thư mục HK231 không được trưởng phòng xác nhận.',
  },
  {
    isRead: false,
    text: 'Thư mục Khoa học máy tính đã được trưởng phòng xóa.',
  },
];

export const HOMEPAGE_ITEM_GRIDS = [
  'col-1',
  'col-10',
  'col-6',
  'col-6',
  'col-1',
];

export const SUPPORT_ITEM_GRIDS = [
  'col-1',
  'col-10',
  'col-6',
  'col-6',
  'col-1',
];

export const DELETED_ITEM_GRIDS = [
  'col-7',
  'col-6',
  'col-6',
  'col-4',
  'col-1',
];
export const SEARCH_RESULT_GRIDS = [
  'col-1',
  'col-8',
  'col-5',
  'col-4',
  'col-5',
  'col-1',
];

export const APPROVAL_GRIDS = [
  'col-1',
  'col-7',
  'col-2',
  'col-4',
  'col-3-5',
  'col-3-5',
  'col-3',
];

export const STAFF_MANAGE_GRIDS = [
  'col-2',
  'col-8',
  'col-6',
  'col-5',
  'col-3',
];

export const STAFF_ADMIN_MANAGE_GRIDS = [
  'col-1',
  'col-6',
  'col-6',
  'col-5',
  'col-5',
  'col-1',
];

export const DEPT_MANAGE_GRIDS = [
  'col-2',
  'col-10',
  'col-6',
  'col-5',
  'col-1',
];

export const NOT_SHOW_SIDEBAR = [
  '/search-folder',
  '/search-file',
  '/upload-file',
  '/upload-file-support',
  '/upload-folder',
  '/result-page',
  '/search-folder-result',
  '/search-file-result',
  '/approval',
  '/profile',
  '/staff-manage',
  '/staff-admin-manage',
  '/company-manage',
  '/dept-manage',
  '/edit-file',
  '/edit-folder',
];

export const IS_SETTING_PAGE = [
  '/profile',
  '/staff-manage',
  '/staff-admin-manage',
  '/company-manage',
  '/dept-manage',
  '/setting',
];

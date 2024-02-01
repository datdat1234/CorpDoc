import {
  faPlus,
  faCaretRight,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

export const BASE_URL = process.env.REACT_APP_BE_URL || 'https://example.vn';
export const API_URL = `${BASE_URL}/api`;
export const is1920x1080 = window.innerWidth === 1920;
export const is1920OrMore = window.innerWidth >= 1920;
export const is1440x900 = window.innerWidth === 1440;
export const is1366x768 = window.innerWidth === 1366;
export const SCREEN_WIDTH = window.innerWidth;
export const SCREEN_HEIGHT = window.innerHeight;

export const AUTH_FORM_WIDTH = 720;

export const TEXT_STYLES = {
  text: {
    size: 12,
    weight: 400,
  },
  textBold: {
    size: 12,
    weight: 700,
  },
  text14: {
    size: 14,
    weight: 400,
  },
  text14Medium: {
    size: 14,
    weight: 500,
  },
  text14SemiBold: {
    size: 14,
    weight: 600,
  },
  text14Bold: {
    size: 14,
    weight: 700,
  },
  text18: {
    size: 18,
    weight: 400,
  },
  text18Medium: {
    size: 18,
    weight: 500,
  },
  text18SemiBold: {
    size: 18,
    weight: 600,
  },
  text18Bold: {
    size: 18,
    weight: 700,
  },
  text18ExtraBold: {
    size: 18,
    weight: 800,
  },
  h6: {
    size: 16,
    weight: 400,
  },
  h6Medium: {
    size: 16,
    weight: 500,
  },
  h6Bold: {
    size: 16,
    weight: 700,
  },
  h6ExtraBold: {
    size: 16,
    weight: 800,
  },
  h6Black: {
    size: 16,
    weight: 900,
  },
  h5: {
    size: 20,
    weight: 400,
  },
  h5Black: {
    size: 20,
    weight: 900,
  },
  h4: {
    size: 24,
    weight: 400,
  },
  h3: {
    size: 28,
    weight: 400,
  },
  h2: {
    size: 32,
    weight: 400,
  },
  h1: {
    size: 36,
    weight: 400,
  },
};

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
  'Tài liệu của tôi',
  'Chia sẻ với tôi',
  'Đã lưu',
  'Thùng rác',
];

export const SIDEBAR_STRUCTURE = [
  {
    id: '1',
    name: 'Thư viện sách cá nhân',
  },
  {
    id: '2',
    name: 'Tài liệu pháp luật doanh nghiệp',
  },
];

export const UPLOAD_TABS = [
  'Thư viện sách cá nhân',
  'Tài liệu pháp luật doanh nghiệp',
  'Đồ án tốt nghiệp _ Luận văn tốt nghiệp',
  'Tạo cấu trúc mới',
];

export const UPLOAD_TABS_ICON = [
  {
    left: null,
    right: faCaretRight,
  },
  {
    left: null,
    right: faCaretRight,
  },
  {
    left: null,
    right: faCaretRight,
  },
  {
    left: faPlus,
    right: null,
  },
];

export const SEARCH_TABS = ['Tài liệu', 'Thư mục'];

export const SEARCH_TABS_ICON = [
  {
    left: null,
    right: faCaretRight,
  },
  {
    left: null,
    right: faCaretRight,
  },
];

export const PROFILE_TABS = ['Chỉnh sửa thông tin', 'Cài đặt', 'Đăng xuất'];

export const PROFILE_TABS_ICON = [
  {
    left: null,
    right: faCaretRight,
  },
  {
    left: null,
    right: faCaretRight,
  },
  {
    left: null,
    right: faRightFromBracket,
  },
];

export const SMALL_HOVER_TABS = ['Thêm thư mục', 'Thêm tài liệu'];

export const SMALL_HOVER_ICONS = [
  {
    left: null,
    right: faCaretRight,
  },
  {
    left: null,
    right: faCaretRight,
  },
];
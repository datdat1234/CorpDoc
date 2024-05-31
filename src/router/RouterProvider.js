import GlobalLoading from '../common/GlobalLoading';
import Layout from '../layout';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from 'page/loginPage';
import HomePage from 'page/homePage';
import SearchFolderPage from 'page/searchFolderPage';
import SearchFilePage from 'page/searchFilePage';
import UploadFilePage from 'page/uploadFilePage';
import UploadFileSupportPage from 'page/uploadFileSupportPage';
import UploadFolderPage from 'page/uploadFolderPage';
import ResultPage from 'page/resultPage';
import SearchFolderResultPage from 'page/searchFolderResultPage';
import SearchFileResultPage from 'page/searchFileResultPage';
import ProfilePage from 'page/profilePage';
import StaffManagePage from 'page/staffManagePage';
import StaffAdminManagePage from 'page/staffAdminManagePage';
import ApprovalPage from 'page/approvalPage';
import CompanyManagePage from 'page/companyManagePage';
import DeptManagePage from 'page/deptManagePage';
import FolderPage from 'page/folderPage';
import SupportFolderPage from 'page/supportFolderPage';
import SavedFolderPage from 'page/savedFolderPage';
import EditFilePage from 'page/editFileInfoPage';
import EditFolderPage from 'page/editFolderInfoPage';
import SharedFolderPage from 'page/sharedFolderPage';
import DeletedFolderPage from 'page/deletedFolderPage';
import PrivateFolderPage from 'page/privateFolderPage';

export default function RouterProvider() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('token'));

  const getElement = (path) => {
    if (!isLogin) return <Navigate replace to="/login" />;
    switch (path) {
      case '/home':
        return <HomePage />;
      case '/search-folder':
        return <SearchFolderPage />;
      case '/search-file':
        return <SearchFilePage />;
      case '/upload-file':
        return <UploadFilePage />;
      case '/upload-file-support':
        return <UploadFileSupportPage />;
      case '/upload-folder':
        return <UploadFolderPage />;
      case '/result-page':
        return <ResultPage />;
      case '/search-folder-result':
        return <SearchFolderResultPage />;
      case '/search-file-result':
        return <SearchFileResultPage />;
      case '/approval':
        return <ApprovalPage />;
      case '/profile':
        return <ProfilePage />;
      case '/staff-manage':
        return <StaffManagePage />;
      case '/company-manage':
        return <CompanyManagePage />;
      case '/dept-manage':
        return <DeptManagePage />;
      case '/folder':
        return <FolderPage />;
      case '/folder-support':
        return <SupportFolderPage />;
      case '/saved-folder':
        return <SavedFolderPage />;
      case '/edit-file':
        return <EditFilePage />;
      case '/edit-folder':
        return <EditFolderPage />;
      case '/shared-folder':
        return <SharedFolderPage />;
      case '/deleted-folder':
        return <DeletedFolderPage />;
      case '/private-folder':
        return <PrivateFolderPage />;
      case '/staff-admin-manage':
        return <StaffAdminManagePage />;
      default:
        return <Navigate replace to="/login" />;
    }
  };
  const getSwitchAndRoutes = () => (
    <Routes>
      <Route
        path="/login"
        element={
          isLogin ? (
            <Navigate replace to="/home" />
          ) : (
            <LoginPage setIsLogin={setIsLogin} />
          )
        }
      />
      <Route path="/" element={getElement('/')} />
      <Route path="/home" element={getElement('/home')} />
      <Route path="/search-folder" element={getElement('/search-folder')} />
      <Route path="/search-file" element={getElement('/search-file')} />
      <Route path="/upload-file" element={getElement('/upload-file')} />
      <Route path="/upload-file-support" element={getElement('/upload-file-support')} />
      <Route path="/upload-folder" element={getElement('/upload-folder')} />
      <Route path="/result-page" element={getElement('/result-page')} />
      <Route
        path="/search-folder-result"
        element={getElement('/search-folder-result')}
      />
      <Route
        path="/search-file-result"
        element={getElement('/search-file-result')}
      />
      <Route path="/approval" element={getElement('/approval')} />
      <Route path="/profile" element={getElement('/profile')} />
      <Route path="/staff-manage" element={getElement('/staff-manage')} />
      <Route path="/folder/:id" element={getElement('/folder')} />
      <Route path="/folder-support/:typeDoc" element={getElement('/folder-support')} />
      <Route path="/folder-support/:typeDoc/:pathDoc" element={getElement('/folder-support')} />
      <Route path="/saved-folder" element={getElement('/saved-folder')} />
      <Route path="/edit-file" element={getElement('/edit-file')} />
      <Route path="/edit-folder" element={getElement('/edit-folder')} />
      <Route path="/shared-folder" element={getElement('/shared-folder')} />
      <Route path="/deleted-folder" element={getElement('/deleted-folder')} />
      <Route path="/private-folder" element={getElement('/private-folder')} />
      <Route path="/company-manage" element={getElement('/company-manage')} />
      <Route path="/dept-manage" element={getElement('/dept-manage')} />
      <Route path="/staff-admin-manage" element={getElement('/staff-admin-manage')} />
    </Routes>
  );

  return (
    <Router>
      <GlobalLoading />
      <Layout>{getSwitchAndRoutes()}</Layout>
    </Router>
  );
}

import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './Components/Commons/ProtectedRoute';
import { useUser } from './Context/UserContext';
import ForgotPasswordPage from './Pages/ForgotPassword/ForgotPasswordPage';
import HomePage from './Pages/Homepage/Homepage';
import Login from './Pages/Login/Login';
import EditProfile from './Pages/Profile/EditProfilePage';
import ProfileArchivePage from './Pages/Profile/ProfileArchive/ProfileArchivePage';
import ProfilePage from './Pages/Profile/ProfilePage';
import Register from './Pages/Register/Register';

const App = () => {
    const { user } = useUser();
    const localStorageUserId = localStorage.getItem('userId');
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/register"
                    element={user ? <Navigate to="/" /> : <Register userId={localStorageUserId} />}
                />
                <Route path="/login" element={user ? <Navigate to="/edit-profile" /> : <Login />} />
                <Route
                    path="/edit-profile"
                    element={
                        <ProtectedRoute isLoggedin={!!localStorageUserId}>
                            <EditProfile userId={localStorageUserId} />
                        </ProtectedRoute>
                    }
                />
                <Route path="/all-profiles" element={<ProfileArchivePage />} />
                <Route
                    path="/all-profiles/:userId"
                    element={
                        <ProtectedRoute isLoggedin={!!localStorageUserId}>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </Routes>
        </>
    );
};

export default App;

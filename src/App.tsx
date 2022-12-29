import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './Components/Commons/ProtectedRoute';
import { useUser } from './Context/UserContext';
import ForgotPasswordPage from './Pages/ForgotPassword/ForgotPasswordPage';
import HomePage from './Pages/Homepage/Homepage';
import EditProfile from './Pages/Profile/EditProfilePage';
import ProfileArchivePage from './Pages/Profile/ProfileArchive/ProfileArchivePage';
import ProfilePage from './Pages/Profile/ProfilePage';
import Register from './Pages/Register/Register';

const App = () => {
    const { user } = useUser();
    const isRegistrationComplete = user?.registration_completed;
    const localStorageUserId = localStorage.getItem('userId');
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/register"
                    element={
                        isRegistrationComplete ? (
                            <Navigate to="/" />
                        ) : (
                            <Register userId={localStorageUserId} />
                        )
                    }
                />
                <Route
                    path="/edit-profile"
                    element={
                        <ProtectedRoute
                            isRegistrationComplete={isRegistrationComplete}
                            isLoggedin={!!localStorageUserId}>
                            <EditProfile userId={localStorageUserId} />
                        </ProtectedRoute>
                    }
                />
                <Route path="/all-profiles" element={<ProfileArchivePage />} />
                <Route
                    path="/all-profiles/:userId"
                    element={
                        <ProtectedRoute
                            isRegistrationComplete={isRegistrationComplete}
                            isLoggedin={!!localStorageUserId}>
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

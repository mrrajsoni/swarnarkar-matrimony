import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './Components/Commons/ProtectedRoute';
import { useUser } from './Context/UserContext';

import HomePage from './Pages/Homepage/Homepage';
import Login from './Pages/Login/Login';
import EditProfile from './Pages/Profile/EditProfilePage';
import ProfileArchivePage from './Pages/Profile/ProfileArchive/ProfileArchivePage';
import ProfilePage from './Pages/Profile/ProfilePage';
import Register from './Pages/Register/Register';

const App = () => {
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        setIsUserRegistered(user?.registration_completed);
    }, [user]);

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route
                    path="/edit-profile"
                    element={
                        <ProtectedRoute isLoggedin={!!user?.id}>
                            <EditProfile />
                        </ProtectedRoute>
                    }
                />
                <Route path="/all-profiles" element={<ProfileArchivePage />} />
                <Route
                    path="/all-profiles/:userId"
                    element={
                        <ProtectedRoute isLoggedin={!!user?.id}>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
};

export default App;

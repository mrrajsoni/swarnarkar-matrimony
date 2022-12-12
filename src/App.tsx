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
    const { user } = useUser();
    const getLocalStorageId = localStorage.getItem('userId');
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
                <Route path="/login" element={user ? <Navigate to="/edit-profile" /> : <Login />} />
                <Route
                    path="/edit-profile"
                    element={
                        <ProtectedRoute isLoggedin={!!getLocalStorageId}>
                            <EditProfile />
                        </ProtectedRoute>
                    }
                />
                <Route path="/all-profiles" element={<ProfileArchivePage />} />
                <Route
                    path="/all-profiles/:userId"
                    element={
                        <ProtectedRoute isLoggedin={!!getLocalStorageId}>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
};

export default App;

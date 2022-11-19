import { Navigate, Route, Routes } from 'react-router-dom';
import { useUser } from './Context/UserContext';

import HomePage from './Pages/Homepage/Homepage';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

const App = () => {
    const { user } = useUser();
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            </Routes>
        </>
    );
};

export default App;

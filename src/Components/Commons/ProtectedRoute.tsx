import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
    isLoggedin,
    children,
    isRegistrationComplete,
}: {
    isLoggedin: boolean;
    children: JSX.Element;
    isRegistrationComplete?: boolean;
}) => {
    if (!isLoggedin) return <Navigate to="/" />;
    else if (!isRegistrationComplete) return <Navigate to="/register" />;
    return children;
};

export default ProtectedRoute;

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
    isLoggedin,
    children,
}: {
    isLoggedin: boolean;
    children: JSX.Element;
}) => {
    if (!isLoggedin) return <Navigate to="/" />;
    return children;
};

export default ProtectedRoute;

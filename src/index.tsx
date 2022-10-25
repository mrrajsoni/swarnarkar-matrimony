import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import NotFound from './Pages/NotFound';
import Register from './Pages/Register/Register';
import Header from './Components/Commons/Header/Header';
import Footer from './Components/Commons/Footer/Footer';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/about',
        element: <Register />,
    },
    {
        path: '/contact',
        element: <Register />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <RouterProvider router={router} />
    </>,
);

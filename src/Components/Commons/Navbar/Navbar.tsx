import { Link } from 'react-router-dom';
import { mainMenu, SignUpMenu } from '../../../Constants/Menu';
import { useUser } from '../../../Context/UserContext';
import Login from '../../../Utils/API/Login';
import './Navbar.scss';

const Navbar = () => {
    return (
        <nav className="flex justify-end ">
            <MainMenuLinks />
            <HeaderSignUpLinks />
        </nav>
    );
};

const MainMenuLinks = () => {
    return (
        <ul className="main-menu">
            {mainMenu.map((mainMenuLink) => (
                <li key={mainMenuLink.name}>
                    <Link to={mainMenuLink.link}>{mainMenuLink.name}</Link>
                </li>
            ))}
        </ul>
    );
};

const HeaderSignUpLinks = () => {
    const { user } = useUser();

    const handleLogout = () => {
        void Login.signOut();
    };
    return (
        <ul className="register-menu">
            {!user ? (
                SignUpMenu.map((signUplink) => (
                    <li key={signUplink.name}>
                        <Link to={signUplink.link}>{signUplink.name}</Link>
                    </li>
                ))
            ) : (
                <li>
                    <Link onClick={handleLogout} to="#">
                        Logout
                    </Link>
                </li>
            )}
        </ul>
    );
};

export default Navbar;

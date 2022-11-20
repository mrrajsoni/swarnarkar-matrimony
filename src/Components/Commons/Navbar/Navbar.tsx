import { useState } from 'react';
import Popup from 'reactjs-popup';
import { useUser } from '../../../Context/UserContext';
import LoginForm from '../../Users/Login/LoginForm';
import './Navbar.scss';
import { ReactComponent as DownArrow } from '../../../Assets/Svg/down-arrow.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const handleRegisterMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    const handleProfileMenu = () => {
        setProfileMenuOpen((prevState) => !prevState);
    };
    return (
        <nav className="flex justify-end ">
            <MainMenuLinks />
            <HeaderSignUpLinks
                isProfileMenuOpen={isProfileMenuOpen}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={handleRegisterMenu}
                setProfileMenuOpen={handleProfileMenu}
            />
        </nav>
    );
};

const MainMenuLinks = () => {
    return <ul className="main-menu"></ul>;
};

const HeaderSignUpLinks = ({
    isMenuOpen,
    setIsMenuOpen,
    isProfileMenuOpen,
    setProfileMenuOpen,
}: {
    isMenuOpen: boolean;
    setIsMenuOpen: () => void;
    isProfileMenuOpen: boolean;
    setProfileMenuOpen: () => void;
}) => {
    const { user, userLogout } = useUser();

    return (
        <ul className="register-menu relative">
            {user?.registration_completed ? (
                <>
                    <li
                        className="profile-menu cursor-pointer flex items-center gap-1"
                        onClick={setProfileMenuOpen}>
                        Profile
                        <DownArrow />
                    </li>
                    {isProfileMenuOpen && (
                        <div className="profile-menu-dropdown absolute">
                            <ul>
                                <li>
                                    <Link onClick={userLogout} to="#">
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <li
                        className="login-menu cursor-pointer flex items-center gap-1"
                        onClick={setIsMenuOpen}>
                        Login
                        <DownArrow />
                    </li>
                    <Popup open={isMenuOpen} closeOnEscape onClose={setIsMenuOpen}>
                        <div className="registration-popup-container">
                            <LoginPopupForm />
                        </div>
                    </Popup>
                </>
            )}
        </ul>

        // <ul className="register-menu">
        //     {!user ? (
        //         SignUpMenu.map((signUplink) => (
        //             <li key={signUplink.name}>
        //                 <Link to={signUplink.link}>{signUplink.name}</Link>
        //             </li>
        //         ))
        //     ) : (
        //         <li>
        //             <Link onClick={handleLogout} to="#">
        //                 Logout
        //             </Link>
        //         </li>
        //     )}
        // </ul>
    );
};

const LoginPopupForm = () => {
    return <LoginForm />;
};
export default Navbar;

import { useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import { useUser } from '../../../Context/UserContext';
import LoginForm from '../../Users/Login/LoginForm';
import './Navbar.scss';
import { ReactComponent as DownArrow } from '../../../Assets/Svg/down-arrow.svg';
import { Link } from 'react-router-dom';
import CommonUtils from '../../../Utils/Common Utils/CommonUtils';
import { MainMenu } from '../../../Constants/Menu';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef<HTMLUListElement>(null);

    CommonUtils.useOutsideClick([profileMenuRef], () => {
        setProfileMenuOpen(false);
        setIsMenuOpen(false);
    });
    const handleRegisterMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    const handleProfileMenu = () => {
        setProfileMenuOpen((prevState) => !prevState);
    };
    return (
        <nav className="flex justify-center">
            <MainMenuLinks />
            <HeaderSignUpLinks
                profileMenuRef={profileMenuRef}
                isProfileMenuOpen={isProfileMenuOpen}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={handleRegisterMenu}
                setProfileMenuOpen={handleProfileMenu}
            />
        </nav>
    );
};

const MainMenuLinks = () => {
    return (
        <ul className="main-menu ml-auto flex gap-6">
            {MainMenu.map((menu) => (
                <li key={menu.link}>
                    <Link to={menu.link}>{menu.name}</Link>
                </li>
            ))}
        </ul>
    );
};

const HeaderSignUpLinks = ({
    isMenuOpen,
    setIsMenuOpen,
    isProfileMenuOpen,
    setProfileMenuOpen,
    profileMenuRef,
}: {
    isMenuOpen: boolean;
    setIsMenuOpen: () => void;
    isProfileMenuOpen: boolean;
    setProfileMenuOpen: () => void;
    profileMenuRef: React.MutableRefObject<HTMLUListElement>;
}) => {
    const { user, userLogout } = useUser();

    return (
        <ul className="register-menu relative ml-auto">
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
                                    <Link to="/edit-profile">Edit Profile</Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => {
                                            userLogout();
                                            setProfileMenuOpen();
                                        }}
                                        to="#">
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
    );
};

const LoginPopupForm = () => {
    return <LoginForm />;
};
export default Navbar;

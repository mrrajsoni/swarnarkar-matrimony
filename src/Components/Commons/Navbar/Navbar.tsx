import { useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import { useUser } from '../../../Context/UserContext';
import LoginForm from '../../Users/Login/LoginForm';
import './Navbar.scss';
import { ReactComponent as DownArrow } from '../../../Assets/Svg/down-arrow.svg';
import { Link } from 'react-router-dom';
import CommonUtils from '../../../Utils/Common Utils/CommonUtils';
import { MainMenu } from '../../../Constants/Menu';
import useWindowDimensions from '../../../CustomHooks/getScreenSize';
import Hamburger from 'hamburger-react';
import MobileMenu from './MobileMenu/MobileMenu';

interface IDesktopMenuProps {
    profileMenuRef: React.MutableRefObject<HTMLUListElement>;
    isProfileMenuOpen: boolean;
    isMenuOpen: boolean;
    setIsMenuOpen: () => void;
    setProfileMenuOpen: () => void;
}
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    const { width } = useWindowDimensions();
    const showMobileMenu = width < 767;
    return (
        <nav className={`flex ${showMobileMenu && 'justify-end'}`}>
            {!showMobileMenu ? (
                <DesktopMenu
                    props={{
                        isMenuOpen: isMenuOpen,
                        isProfileMenuOpen: isProfileMenuOpen,
                        profileMenuRef: profileMenuRef,
                        setIsMenuOpen: handleRegisterMenu,
                        setProfileMenuOpen: handleProfileMenu,
                    }}
                />
            ) : (
                <MobileMenu />
            )}
        </nav>
    );
};

export const MainMenuLinks = ({ isDesktopMenu }: { isDesktopMenu: boolean }) => {
    return (
        <ul className={`${isDesktopMenu ? 'desktop-main-menu' : 'mobile-main-menu'} main-menu `}>
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

const DesktopMenu = ({ props }: { props: IDesktopMenuProps }) => {
    const { isMenuOpen, isProfileMenuOpen, profileMenuRef, setIsMenuOpen, setProfileMenuOpen } =
        props;
    return (
        <>
            <MainMenuLinks isDesktopMenu={true} />
            <HeaderSignUpLinks
                profileMenuRef={profileMenuRef}
                isProfileMenuOpen={isProfileMenuOpen}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                setProfileMenuOpen={setProfileMenuOpen}
            />
        </>
    );
};

export default Navbar;

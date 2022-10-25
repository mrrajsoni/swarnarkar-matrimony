import { Link } from 'react-router-dom';
import { mainMenu, SignUpMenu } from '../../../Constants/Menu';
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
    return (
        <ul className="register-menu">
            {SignUpMenu.map((signUplink) => (
                <li key={signUplink.name}>
                    <Link to={signUplink.link}>{signUplink.name}</Link>
                </li>
            ))}
        </ul>
    );
};

export default Navbar;

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
                    <a href={mainMenuLink.link}>{mainMenuLink.name}</a>
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
                    <a href={signUplink.link}>{signUplink.name}</a>
                </li>
            ))}
        </ul>
    );
};

export default Navbar;

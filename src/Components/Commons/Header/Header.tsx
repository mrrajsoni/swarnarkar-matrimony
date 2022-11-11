import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Header.scss';

const Header = () => {
    return (
        <header>
            <div className="flex justify-between items-center">
                <Logo />
                <div className="flex-1">
                    <Navbar />
                </div>
            </div>
        </header>
    );
};

const Logo = () => {
    return (
        <div className="logo-wrapper">
            <Link to={'/'}>
                <img
                    className="logo"
                    src="https://res.cloudinary.com/rajsoni/image/upload/v1665834455/swarnakar_matrimonial_logo_ryofgv.png"
                    alt="Swarnakar matrimonial logo"
                />
            </Link>
        </div>
    );
};

export default Header;

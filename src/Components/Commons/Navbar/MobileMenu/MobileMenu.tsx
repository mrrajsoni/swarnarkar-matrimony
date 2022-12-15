import Hamburger from 'hamburger-react';
import { useState } from 'react';
import { MainMenuLinks } from '../Navbar';
import './MobileMenu.scss';
const MobileMenu = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="mobile-menu-container">
            <Hamburger
                label="Show menu"
                rounded
                toggled={isMobileMenuOpen}
                toggle={setIsMobileMenuOpen}
            />
            <div className={`mobile-menu-wrapper ${isMobileMenuOpen ? 'show-menu' : 'hide-menu'}`}>
                <MainMenuLinks isDesktopMenu={false} />
            </div>
        </div>
    );
};
export default MobileMenu;

import Hamburger from 'hamburger-react';
import { useState } from 'react';
import { HeaderSignUpLinks, MainMenuLinks } from '../Navbar';
import './MobileMenu.scss';

interface IMobileMenuProps {
    isMenuOpen: boolean;
    isProfileMenuOpen: boolean;
    setIsMenuOpen: () => void;
    setProfileMenuOpen: () => void;
    profileMenuRef: any;
}
const MobileMenu = ({
    isMenuOpen,
    setProfileMenuOpen,
    isProfileMenuOpen,
    setIsMenuOpen,
    profileMenuRef,
}: IMobileMenuProps) => {
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
                <HeaderSignUpLinks
                    profileMenuRef={profileMenuRef}
                    isProfileMenuOpen={isProfileMenuOpen}
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    setProfileMenuOpen={setProfileMenuOpen}
                />
            </div>
        </div>
    );
};

export default MobileMenu;

import { Link } from 'react-router-dom';
import { FooterQuickMenu } from '../../../Constants/Menu';
import './Footer.scss';

const Footer = () => {
    return (
        <footer>
            <section className="footer-section">
                <div className="flex">
                    <div className="flex-1">
                        <h4>Quick Links</h4>
                        <QuickLinks />
                    </div>
                    <div className="flex-1">
                        <h4>For any queries kindly drop an email on </h4>
                        <a href="mailto:help@swarnakarmatrimony.com">help@swarnakarmatrimony.com</a>
                    </div>
                </div>
                <Copyright />
            </section>
        </footer>
    );
};

const QuickLinks = () => {
    return (
        <ul className="quicklink-menu">
            {FooterQuickMenu.map((quicklink) => (
                <li key={quicklink.name}>
                    <Link to={quicklink.link}>{quicklink.name}</Link>
                </li>
            ))}
        </ul>
    );
};
const Copyright = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="copyright-section py-3">
            © {currentYear} Swarnakar Matrimony. All Rights Reserved
        </div>
    );
};

export default Footer;

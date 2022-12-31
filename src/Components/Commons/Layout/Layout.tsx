import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout = ({ children, className }: { children: JSX.Element; className?: string }) => {
    return (
        <>
            <Header />
            <main className={className}> {children}</main>
            <Footer />
        </>
    );
};

export default Layout;

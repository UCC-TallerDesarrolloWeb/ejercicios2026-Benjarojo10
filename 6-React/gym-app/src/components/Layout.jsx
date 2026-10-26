import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '@styles/Layout.scss';

function Layout({ isLoggedIn, onLogout }) {
    return (
        <div className="layout">
            <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />
            <main className="main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
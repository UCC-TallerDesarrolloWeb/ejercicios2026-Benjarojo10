import { NavLink, useNavigate } from 'react-router-dom';

function Header({ isLoggedIn, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <header className="header">
            <h2 className="header-logo">Gym App</h2>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/actividades">Actividades</NavLink>
                {isLoggedIn && (
                    <button className="btn-logout" onClick={handleLogout}>Logout</button>
                )}
            </nav>
        </header>
    );
}

export default Header;
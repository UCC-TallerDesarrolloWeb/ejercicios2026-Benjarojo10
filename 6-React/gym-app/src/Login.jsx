import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.scss';

function Login({ onLogin }) {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (usuario === 'admin' && password === 'admin') {
            console.log('Login OK');
            onLogin();
            navigate('/actividades');
        } else {
            console.log('Login Incorrecto');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Iniciar sesión</h2>

                <label htmlFor="usuario">Usuario</label>
                <input
                    id="usuario"
                    type="text"
                    placeholder="Ingresá tu usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />

                <label htmlFor="password">Contraseña</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Ingresá tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
}

export default Login;
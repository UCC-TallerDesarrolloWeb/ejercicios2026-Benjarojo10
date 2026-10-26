import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Login from './Login';
import Actividades from './Actividades';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
                    <Route path="actividades" element={<Actividades isLoggedIn={isLoggedIn} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
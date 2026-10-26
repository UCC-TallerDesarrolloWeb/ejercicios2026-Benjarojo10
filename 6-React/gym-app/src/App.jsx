import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@components/Layout';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Actividades from '@pages/Actividades';

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
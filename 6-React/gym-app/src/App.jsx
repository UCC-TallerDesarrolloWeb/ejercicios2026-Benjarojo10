import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Actividades from './Actividades';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/actividades" element={<Actividades />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
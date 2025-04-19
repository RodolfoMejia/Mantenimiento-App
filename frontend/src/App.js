import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importar correctamente Router, Routes, Route
import { AuthProvider } from './auth/AuthContext'; // Importar contexto de autenticación
import LoginPage from './pages/LoginPage'; // Página de login
import Dashboard from './components/Dashboard'; // Página de dashboard
import Profile from './components/Profile'; // Página de perfil
import AddEquipo from './components/AddEquipo'; // Página para agregar equipo
import RegisterPage from './pages/RegisterPage'; // Página de registro
import DashboardTecnico from './pages/DashboardTecnico';
import DashboardCliente from './components/DashboardCliente';


const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/add-equipo" element={<AddEquipo/>} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/dashboard-tecnico" element={<DashboardTecnico />} />
                    <Route path="/dashboard-cliente" element={<DashboardCliente />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext'; // Asegúrate de que esto esté bien importado

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await login({ username, password });
        navigate('/dashboard'); // Redirige a la página de Dashboard
        } catch (error) {
        console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 mt-10">
        <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="p-2 border rounded"
        />
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
        </button>
        </form>
    );
};

export default LoginPage;

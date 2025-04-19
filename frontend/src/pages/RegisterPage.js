// RegisterPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '', rol: 'cliente' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/usuarios/registro/', form);
            navigate('/login');  // Redirige al login después de registrar
        } catch (error) {
            console.error('Error al registrar el usuario', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 mt-10">
            <input
                name="username"
                onChange={handleChange}
                placeholder="Username"
                className="p-2 border rounded"
                required
            />
            <input
                name="email"
                onChange={handleChange}
                placeholder="Email"
                className="p-2 border rounded"
                required
            />
            <input
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Password"
                className="p-2 border rounded"
                required
            />
            <select
                name="rol"
                onChange={handleChange}
                className="p-2 border rounded"
                value={form.rol}
            >
                <option value="cliente">Cliente</option>
                <option value="tecnico">Técnico</option>
            </select>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Registrar</button>
        </form>
    );
};

export default RegisterPage;

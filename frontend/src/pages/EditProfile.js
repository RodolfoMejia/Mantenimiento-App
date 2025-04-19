import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

const EditProfile = () => {
    const { user, setUser } = useAuth();
    const [email, setEmail] = useState(user.email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.put('http://localhost:8000/api/usuarios/perfil/', { email }, {
        headers: { Authorization: `Bearer ${user.token}` }
        });
        const updated = { ...user, email: res.data.email };
        setUser(updated);
        localStorage.setItem('user', JSON.stringify(updated));
        alert('Perfil actualizado');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 mt-10">
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Guardar</button>
        </form>
    );
};

export default EditProfile;
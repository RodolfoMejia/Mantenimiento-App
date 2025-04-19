import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

const MantenimientosPage = () => {
    const { user } = useAuth();
    const [mantenimientos, setMantenimientos] = useState([]);

    const fetchMantenimientos = async () => {
        const res = await axios.get('http://localhost:8000/api/mantenimientos/', {
        headers: { Authorization: `Bearer ${user.token}` }
        });
        setMantenimientos(res.data);
    };

    useEffect(() => {
        fetchMantenimientos();
    }, []);

    return (
        <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Mantenimientos</h2>
        <ul>
            {mantenimientos.map(m => (
            <li key={m.id}>{m.descripcion} - {m.estado} - {new Date(m.fecha).toLocaleString()}</li>
            ))}
        </ul>
        </div>
    );
};

export default MantenimientosPage;

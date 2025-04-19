import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

const EquiposPage = () => {
    const { user } = useAuth();
    const [equipos, setEquipos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const fetchEquipos = async () => {
        const res = await axios.get('http://localhost:8000/api/equipos/', {
        headers: { Authorization: `Bearer ${user.token}` }
        });
        setEquipos(res.data);
    };

    const crearEquipo = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8000/api/equipos/', {
        nombre, descripcion, cliente: user.id
        }, {
        headers: { Authorization: `Bearer ${user.token}` }
        });
        setNombre('');
        setDescripcion('');
        fetchEquipos();
    };

    useEffect(() => {
        fetchEquipos();
    }, []);

    return (
        <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Mis Equipos</h2>
        <ul className="mb-4">
            {equipos.map(e => (
            <li key={e.id}>{e.nombre}: {e.descripcion}</li>
            ))}
        </ul>
        {user.rol === 'cliente' && (
            <form onSubmit={crearEquipo} className="flex flex-col gap-2">
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" className="p-2 border rounded" />
            <input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" className="p-2 border rounded" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Agregar Equipo</button>
            </form>
        )}
        </div>
    );
};

export default EquiposPage;
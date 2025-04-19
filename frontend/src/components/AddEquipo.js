import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import {addEquipo} from '../api/equipos';

const AddEquipo = () => {
    const { user, loading } = useAuth();
    const [equipoData, setEquipoData] = useState({
        nombre: '',
        descripcion: '',
        cliente: null,  // Se asignará después
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Esperar hasta que se cargue el usuario
    if (loading) return <p>Cargando...</p>;
    if (!user) return <p>No estás autenticado.</p>;

    const handleChange = (e) => {
        setEquipoData({
            ...equipoData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            const equipoPayload = {
                ...equipoData,
                cliente: user.id,
            };
            const newEquipo = await addEquipo(equipoPayload);
            setSuccess('¡Equipo agregado con éxito!');
            console.log('Nuevo equipo:', newEquipo);
            setEquipoData({ nombre: '', descripcion: '', cliente: null });
        } catch (error) {
            setError('Error al agregar equipo');
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Agregar Nuevo Equipo</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={equipoData.nombre}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label>Descripción:</label>
                    <textarea
                        name="descripcion"
                        value={equipoData.descripcion}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {submitting ? 'Agregando...' : 'Agregar Equipo'}
                </button>
                {success && <p className="text-green-600 mt-2">{success}</p>}
                {error && <p className="text-red-600 mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default AddEquipo;

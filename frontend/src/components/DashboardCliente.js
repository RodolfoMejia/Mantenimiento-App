import React, { useEffect, useState } from 'react';
import api from '../api/auth';
import { useAuth } from '../auth/AuthContext';
import { getEquipos } from '../api/equipos';

const DashboardCliente = () => {
    const { user } = useAuth();
    const [equipos, setEquipos] = useState([]);

    useEffect(() => {
        const fetchEquipos = async () => {
            try {
                const equiposCliente = await getEquipos();
                const equiposFiltrados = equiposCliente.filter(
                    (equipo) => equipo.cliente === user.id
                );
                setEquipos(equiposFiltrados);
            } catch (error) {
                console.error('Error al cargar equipos:', error);
            }
        };

        if (user) {
            fetchEquipos();
        }
    }, [user]);

    const solicitarMantenimiento = async (equipoId) => {
        console.log("Solicitando mantenimiento para equipo:", equipoId);
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.error("Token no disponible");
            return;
        }

        try {
            const response = await api.post('/mantenimientos/', {
                equipo: equipoId,
                descripcion: 'Solicitud desde el dashboard del cliente',
                estado: 'pendiente',
                tipo_mantenimiento: 'preventivo',
                cliente: user.id  // Inclúyelo si el backend lo requiere
            });

            console.log("Respuesta del backend:", response.data);
            alert('Solicitud enviada con éxito');
        } catch (error) {
            console.error('Error al solicitar mantenimiento:', error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Mis Equipos</h2>
            {equipos.length === 0 ? (
                <p>No tienes equipos registrados.</p>
            ) : (
                <div className="grid gap-4">
                    {equipos.map((equipo) => (
                        <div key={equipo.id} className="border rounded p-4 shadow-md">
                            <h3 className="text-lg font-semibold">{equipo.nombre}</h3>
                            <p>{equipo.descripcion}</p>
                            <p className="text-sm mt-2">
                                Último mantenimiento:{' '}
                                {equipo.ultimo_mantenimiento?.fecha || 'No registrado'}
                            </p>
                            <p className="text-sm">
                                Tipo: {equipo.ultimo_mantenimiento?.tipo || 'No registrado'}
                            </p>
                            <button
                                onClick={() => solicitarMantenimiento(equipo.id)}
                                className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
                            >
                                Solicitar Mantenimiento
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DashboardCliente;

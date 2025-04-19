import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { Link } from 'react-router-dom';

const DashboardTecnico = () => {
    const { user } = useAuth();

    if (!user || user.rol !== 'tecnico') {
        return <p>No tienes permisos para acceder a esta página.</p>;
    }

    return (
        <div className="dashboard-container">
            <h1 className="text-3xl">Bienvenido al Dashboard del Técnico</h1>
            <p className="mt-4">Aquí puedes gestionar los equipos y más.</p>

            <Link to="/add-equipo">
                <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
                    Agregar Nuevo Equipo
                </button>
            </Link>
        </div>
    );
};

export default DashboardTecnico;



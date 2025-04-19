import React, { useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.rol === 'cliente') {
            navigate('/dashboard-cliente');
        } else if (user?.rol === 'tecnico') {
            navigate('/dashboard-tecnico');
        }
    }, [user, navigate]); // Se ejecuta cuando el user cambia

    return (
        <div className="dashboard-container">
            <h1 className="text-3xl">Welcome to your Dashboard!</h1>
            <p className="mt-4">Here you can manage your data and settings.</p>
        </div>
    );
};

export default Dashboard;


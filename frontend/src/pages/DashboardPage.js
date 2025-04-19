import React from 'react';
import Profile from '../components/Profile';
import Equipos from '../components/Equipos';

const DashboardPage = () => {
    return (
        <div>
            <h1 className="text-2xl mb-4">Dashboard</h1>
            <Profile />
            <Equipos />
        </div>
    );
};

export default DashboardPage;

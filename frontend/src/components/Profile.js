import React from 'react';
import { useAuth } from '../auth/AuthContext';

const Profile = () => {
    const { user, logout, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return (
            <div>
                <h2>You are not logged in</h2>
            </div>
        );
    }

    return (
        <div>
            <h2>Welcome {user.username}</h2>
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
                Logout
            </button>
        </div>
    );
};

export default Profile;

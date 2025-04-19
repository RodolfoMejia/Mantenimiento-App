import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  // Nuevo estado para manejar errores

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedToken = localStorage.getItem('access_token');
        if (storedUser && storedToken) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', credentials);
            const { access } = response.data;

            if (access) {
                // Guardar el token en el localStorage
                localStorage.setItem('access_token', access);

                // Configurar el token en el encabezado para todas las solicitudes
                axios.defaults.headers['Authorization'] = `Bearer ${access}`;

                // Crear una instancia de axios para las solicitudes autenticadas
                const axiosAuth = axios.create({
                    baseURL: 'http://127.0.0.1:8000',
                    headers: {
                        'Authorization': `Bearer ${access}`,
                    },
                });

                const userResponse = await axiosAuth.get('/api/usuarios/perfil/');
                setUser(userResponse.data);
                localStorage.setItem('user', JSON.stringify(userResponse.data));

                return userResponse.data;
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Error de autenticación. Por favor revisa tus credenciales.');
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        axios.defaults.headers['Authorization'] = '';  // Limpiar el token
    };

    const value = {
        user,
        loading,
        error,  // Exponer el error en el contexto
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

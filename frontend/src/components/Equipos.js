import api from './auth';

export const getEquipos = async () => {
    try {
        const response = await api.get('/equipos/');
        return response.data;
    } catch (error) {
        console.error('Error fetching equipos:', error);
        throw error;
    }
};

export const addEquipo = async (newEquipoData) => {
    try {
        const response = await api.post('/equipos/', newEquipoData);
        return response.data;
    } catch (error) {
        console.error('Error adding equipo:', error);
        throw error;
    }
};

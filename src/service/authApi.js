import axios from "axios";

// Creiamo un'istanza di Axios con il base URL del backend
const authApi = axios.create({
    baseURL: "http://localhost:8081/users/",
});

// Funzione per fare login
export const getUsers = async () => {
    try {
        const response = await authApi.get("/");
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore getting users:", error);
        throw error;
    }
};

export const postUser = async (body) => {
    try {
        const response = await authApi.post("/",body);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore creting user:", error);
        throw error;
    }
};

export const getUser = async (userId) => {
    try {
        const response = await authApi.get(`/${userId}`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore getting the user:", error);
        throw error;
    }
};

export const putUser = async (userId, body) => {
    try {
        const response = await authApi.put(`/${userId}`, body);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore changing the user:", error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await authApi.delete(`/${userId}`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore deleting the user:", error);
        throw error;
    }
};





// Funzione per ottenere tutti i profili di un utente
export const getProfiles = async (userId) => {
    try {
        const response = await authApi.get(`/${userId}/profiles`);
        return response.data;
    } catch (error) {
        console.error("Error getting the profiles:", error);
        throw error;
    }
};

// Funzione per selezionare un profilo
export const getProfile = async (userId,profileId) => {
    try {
        const response = await authApi.get(`/${userId}/profiles/${profileId}`);
        return response.data;
    } catch (error) {
        console.error("Error selecting the profile:", error);
        throw error;
    }
};

export const postProfile = async (userId, body) => {
    try {
        const response = await authApi.post(`/${userId}/profiles`, body);
        return response.data;
    } catch (error) {
        console.error("Error creating the profile:", error);
        throw error;
    }
};

export const putProfile = async (userId,profileId, body) => {
    try {
        const response = await authApi.put(`/${userId}/profiles/${profileId}`, body);
        return response.data;
    } catch (error) {
        console.error("Error changing the profile:", error);
        throw error;
    }
};

export const deleteProfile = async (userId,profileId) => {
    try {
        const response = await authApi.delete(`/${userId}/profiles/${profileId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting the profile:", error);
        throw error;
    }
};





export default authApi;
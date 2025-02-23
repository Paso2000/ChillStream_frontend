import axios from "axios";

// Creiamo un'istanza di Axios con il base URL del backend
const authApi = axios.create({
    baseURL: "http://localhost:8081/",
});

// Funzione per fare login
export const getUsers = async () => {
    try {
        const response = await authApi.get("/users/");
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore getting users:", error);
        throw error;
    }
};

export const postUser = async (body) => {
    try {
        const response = await authApi.post("/users/",body);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore creting user:", error);
        throw error;
    }
};

export const getUser = async (userId) => {
    try {
        const response = await authApi.get(`/users/${userId}`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore getting the user:", error);
        throw error;
    }
};

export const putUser = async (userId, body) => {
    try {
        const response = await authApi.put(`/users/${userId}`, body);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore changing the user:", error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await authApi.delete(`/users/${userId}`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore deleting the user:", error);
        throw error;
    }
};


// Funzione per ottenere tutti i profili di un utente
export const getProfiles = async (userId) => {
    try {
        const response = await authApi.get(`/users/${userId}/profiles`);
        return response.data;
    } catch (error) {
        console.error("Error getting the profiles:", error);
        throw error;
    }
};

// Funzione per selezionare un profilo
export const getProfile = async (userId,profileId) => {
    try {
        const response = await authApi.get(`/users/${userId}/profiles/${profileId}`);
        return response.data;
    } catch (error) {
        console.error("Error selecting the profile:", error);
        throw error;
    }
};

export const postProfile = async (userId, body) => {
    try {
        const response = await authApi.post(`/users/${userId}/profiles`, body);
        return response.data;
    } catch (error) {
        console.error("Error creating the profile:", error);
        throw error;
    }
};

export const putProfile = async (userId,profileId, body) => {
    try {
        const response = await authApi.put(`/users/${userId}/profiles/${profileId}`, body);
        return response.data;
    } catch (error) {
        console.error("Error changing the profile:", error);
        throw error;
    }
};

export const deleteProfile = async (userId,profileId) => {
    try {
        const response = await authApi.delete(`/users/${userId}/profiles/${profileId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting the profile:", error);
        throw error;
    }
};

export const getAdminList = async () => {
    try {
        const response = await authApi.get("/admins/");
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore getting users:", error);
        throw error;
    }
};

export const postAdmin = async (body) => {
    try {
        const response = await authApi.post("/admins/",body);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore creting user:", error);
        throw error;
    }
};

export const getAdmin = async (adminId) => {
    try {
        const response = await authApi.get(`/admins/${adminId}`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore getting the user:", error);
        throw error;
    }
};

export const putAdmin = async (adminId, body) => {
    try {
        const response = await authApi.put(`/admins/${adminId}`, body);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore changing the user:", error);
        throw error;
    }
};

export const deleteAdmin = async (adminId) => {
    try {
        const response = await authApi.delete(`/admins/${adminId}`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore deleting the user:", error);
        throw error;
    }
};





export default authApi;
import axios from "axios";

const contentApi = axios.create({
    baseURL: "http://localhost:8080/",
});
export const getFilmList = async () => {
    try {
        const response = await contentApi.get("/films/");
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore getting film:", error);
        throw error;
    }
};

export const postFilm = async (body) => {
    try {
        const response = await contentApi.post("/films/",body);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore creating film:", error);
        throw error;
    }
};

export const getFilm = async (filmId) => {
    try {
        const response = await contentApi.get(`/films/${filmId}`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore getting the film:", error);
        throw error;
    }
};

export const putFilm = async (filmId, body) => {
    try {
        const response = await contentApi.put(`/films/${filmId}`, body);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore changing the film:", error);
        throw error;
    }
};

export const deleteFilm = async (filmId) => {
    try {
        const response = await contentApi.delete(`/films/${filmId}`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore deleting the film:", error);
        throw error;
    }
};

export const getActorList = async () => {
    try {
        const response = await contentApi.get("/actors/");
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore getting actors:", error);
        throw error;
    }
};

export const postActors = async (body) => {
    try {
        const response = await contentApi.post("/actors/",body);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore creating actor:", error);
        throw error;
    }
};

export const getActor = async (actorId) => {
    try {
        const response = await contentApi.get(`/actors/${actorId}`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore getting the actor:", error);
        throw error;
    }
};

export const putActor = async (actorId, body) => {
    try {
        const response = await contentApi.put(`/actors/${actorId}`, body);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore changing the actor:", error);
        throw error;
    }
};

export const deleteActor = async (actorId) => {
    try {
        const response = await contentApi.delete(`/actors/${actorId}`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore deleting the actor:", error);
        throw error;
    }
};

export const getFilmByActorId = async (actorId) => {
    try {
        const response = await contentApi.get(`/actors/${actorId}/films`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore deleting the actor:", error);
        throw error;
    }
};


export default contentApi;
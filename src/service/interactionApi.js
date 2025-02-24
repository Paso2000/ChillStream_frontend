import axios from "axios";

const interactionApi = axios.create({
    baseURL: "http://localhost:8082/users/",
});
export const getViewList = async (userId, profileId) => {
    try {
        const response = await interactionApi.get(`/${userId}/profiles/${profileId}/views`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore getting view:", error);
        throw error;
    }
};

export const postView = async (userId, profileId,body) => {
    try {
        const response = await interactionApi.post(`/${userId}/profiles/${profileId}/views`,body);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore creating film:", error);
        throw error;
    }
};

export const getView = async (userId, profileId, viewId) => {
    try {
        const response = await interactionApi.get(`/${userId}/profiles/${profileId}/views/${viewId}`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore getting the view:", error);
        throw error;
    }
};

export const putView = async (userId, profileId, viewId, body) => {
    try {
        const response = await interactionApi.put(`/${userId}/profiles/${profileId}/views/${viewId}`, body);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore changing the view:", error);
        throw error;
    }
};

export const deleteView = async (userId, profileId, viewId) => {
    try {
        const response = await interactionApi.delete(`/${userId}/profiles/${profileId}/views/${viewId}`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore deleting the view:", error);
        throw error;
    }
};


export const getRecommendedList = async (userId, profileId) => {
    try {
        const response = await interactionApi.get(`/${userId}/profiles/${profileId}/recommendeds`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore getting Recommended :", error);
        throw error;
    }
};

export const postRecommended = async (userId, profileId,body) => {
    try {
        const response = await interactionApi.post(`/${userId}/profiles/${profileId}/recommendeds`,body);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore creating Recommended:", error);
        throw error;
    }
};

export const getRecommended = async (userId, profileId, recommendedId ) => {
    try {
        const response = await interactionApi.get(`/${userId}/profiles/${profileId}/recommendeds/${recommendedId}`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore getting the recommended:", error);
        throw error;
    }
};

export const putRecommended = async (userId, profileId, recommendedId, body) => {
    try {
        const response = await interactionApi.put(`/${userId}/profiles/${profileId}/recommendeds/${recommendedId}`, body);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore changing the recommended:", error);
        throw error;
    }
};

export const deleteRecommended = async (userId, profileId, recommendedId) => {
    try {
        const response = await interactionApi.delete(`/${userId}/profiles/${profileId}/recommendeds/${recommendedId}`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore deleting the recommended:", error);
        throw error;
    }
};

export const getReactionList = async (userId, profileId) => {
    try {
        const response = await interactionApi.get(`/${userId}/profiles/${profileId}/reactions`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore getting reactions :", error);
        throw error;
    }
};

export const postReaction = async (userId, profileId,body) => {
    try {
        const response = await interactionApi.post(`/${userId}/profiles/${profileId}/reactions`,body);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore creating reactions:", error);
        throw error;
    }
};


export const deleteReaction = async (userId, profileId, reactionsId) => {
    try {
        const response = await interactionApi.delete(`/${userId}/profiles/${profileId}/reactions/${reactionsId}`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore deleting the reactions:", error);
        throw error;
    }
};

export const getNotificationList = async (userId, profileId) => {
    try {
        const response = await interactionApi.get(`/${userId}/profiles/${profileId}/notifications`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore getting notifications :", error);
        throw error;
    }
};

export const postNotification = async (userId, profileId,body) => {
    try {
        const response = await interactionApi.post(`/${userId}/profiles/${profileId}/notifications`,body);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore creating notifications:", error);
        throw error;
    }
};


export const deleteNotification = async (userId, profileId, notificationsID) => {
    try {
        const response = await interactionApi.delete(`/${userId}/profiles/${profileId}/notifications/${notificationsID}`);
        return response.data; // Ritorna il token o i dati dell'utente
    } catch (error) {
        console.error("Errore deleting the notifications:", error);
        throw error;
    }
};


import axios from "axios";

// Creiamo un'istanza di Axios con il base URL del backend
const contentApi = axios.create({
    baseURL: "http://localhost:8080/",
});


export default contentApi;
import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:1010/v1",
    timeout: 5000
});
// Interceptor de request
api.interceptors.request.use(
    (config) => {
        // CAMBIO: solo setea Content-Type si no es FormData
        if (!(config.data instanceof FormData)) {
            config.headers["Content-type"] = "application/json; charset=UTF-8";
        }
        if (config.skipAuth) return config;
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Token inválido o expirado");
            // Podés redirigir al login, limpiar storage, etc.
        }
        return Promise.reject(error);
    }
);






export default api
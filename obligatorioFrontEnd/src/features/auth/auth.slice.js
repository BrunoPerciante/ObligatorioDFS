import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usuario: null,
    token: null,
    rol: 'duenio',
    isAuthenticated: false,
    isLoading: false,
    error: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUsuario: (state, action) => {//action que me llega desde el formulario por el dispatchdel mismo
            state.usuario = action.payload.usuario;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
        },
        setRol: (state, action) => {
            state.rol = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        logout: (state) => {
            state.usuario = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
        }
    }
})

export const { setUsuario, setRol, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { username, password } = action.payload;
      // Simulasi user untuk demo
      if (username === 'johnd' && password === 'm38rmF$') {
        state.isAuthenticated = true;
        state.currentUser = { username: 'johnd', email: 'john@gmail.com' };
        state.error = null;
      } else {
        state.error = 'Username atau password salah.';
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { login, logout, clearError } = authSlice.actions;

export default authSlice.reducer;

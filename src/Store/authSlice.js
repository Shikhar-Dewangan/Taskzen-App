import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
    
  },
  reducers: {
    login: (state, action) => {
      console.log("✅ authSlice - login reducer called with:", action.payload);
      state.user = action.payload;
      state.status = 'succeeded';
    },
    logout: (state) => {
      console.log("✅ authSlice - logout reducer called");
      state.user = null;
      state.status = 'idle';
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
// this for the autificatlon and the current user 
const initialState = {
  currentUser: localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null,
  loading: false,
  isAuthenticated: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));

    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("currentUser");

    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setIsAuthenticated,
} = userSlice.actions;

export default userSlice.reducer;

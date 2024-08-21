import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  userAppointments: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
    setUserAppointments: (state, action) => {
      state.userAppointments = action.payload;
    },
    addAppointment: (state, action) => {
      state.userAppointments.push(action.payload);
    },
    updateAppointmentStatus: (state, action) => {
      const { id, status } = action.payload;
      state.userAppointments = state.userAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment
      );
    },
    removeAppointment: (state, action) => {
      state.userAppointments = state.userAppointments.filter(
        (appointment) => appointment.id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const createAppointment = (appointmentData) => async (dispatch) => {
  dispatch(userSlice.actions.setLoading(true));
  try {
    const response = await axios.post(
      "http://localhost:3000/appointments/schedule",
      appointmentData
    );
    dispatch(userSlice.actions.addAppointment(response.data));
    dispatch(userSlice.actions.setLoading(false));
    return { success: true };
  } catch (error) {
    dispatch(userSlice.actions.setLoading(false));
    dispatch(userSlice.actions.setError(error.message));
    return { success: false, error: error.message };
  }
};

export const fetchUserAppointments = (userId) => async (dispatch) => {
  dispatch(userSlice.actions.setLoading(true));
  try {
    const response = await axios.get(
      `http://localhost:3000/appointments/user/${userId}`
    );
    dispatch(userSlice.actions.setUserAppointments(response.data));
    dispatch(userSlice.actions.setLoading(false));
  } catch (error) {
    dispatch(userSlice.actions.setLoading(false));
    dispatch(userSlice.actions.setError(error.message));
  }
};

export const cancelAppointment = (id) => async (dispatch) => {
  dispatch(userSlice.actions.setLoading(true));
  try {
    await axios.delete(`http://localhost:3000/appointments/${id}/cancel`);
    dispatch(userSlice.actions.removeAppointment(id));
    dispatch(userSlice.actions.setLoading(false));
    return { success: true };
  } catch (error) {
    dispatch(userSlice.actions.setLoading(false));
    dispatch(userSlice.actions.setError(error.message));
    return { success: false, error: error.message };
  }
};

export const {
  setUser,
  logoutUser,
  setUserAppointments,
  addAppointment,
  updateAppointmentStatus,
  removeAppointment,
  setLoading,
  setError,
} = userSlice.actions;

export default userSlice.reducer;

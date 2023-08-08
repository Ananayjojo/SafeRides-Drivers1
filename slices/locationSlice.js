// redux/slices/locationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const passengerLocationSlice = createSlice({
  name: 'passengerLocation',
  initialState: {
    latitude: null,
    longitude: null,
  },
  reducers: {
    setLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const { setLocation } = passengerLocationSlice.actions;
export default passengerLocationSlice.reducer;



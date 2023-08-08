// redux/slices/destinationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const passengerDestinationSlice = createSlice({
  name: 'passengerDestination',
  initialState: {
    latitude: null,
    longitude: null,
  },
  reducers: {
    setDestination: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const { setDestination } = passengerDestinationSlice.actions;
export default passengerDestinationSlice.reducer;


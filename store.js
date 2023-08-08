// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import passengerLocationReducer from './slices/locationSlice';
import passengerDestinationReducer from './slices/destinationSlice';

export const store = configureStore({
  reducer: {
    location: passengerLocationReducer,
    destination: passengerDestinationReducer,
  },
});



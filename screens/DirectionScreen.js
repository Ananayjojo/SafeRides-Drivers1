import React, { useEffect, useState } from 'react';
import { View, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getDirections } from '../utils/directions';
import * as Location from 'expo-location';

const DirectionScreen = () => {
  const dispatch = useDispatch();
  const passengerLocation = useSelector((state) => state.passengerLocation);
  const passengerDestination = useSelector((state) => state.passengerDestination);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [userCurrentLocation, setUserCurrentLocation] = useState(null);

  
    useEffect(() => {
      // Check and request location permission
      const checkPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          setHasLocationPermission(true);
          console.log('Location permission granted.');
        } else {
          setHasLocationPermission(false);
          console.log('Location permission not granted.');
        }
      };
      checkPermission();
    }, []);

  const handleGetDirections = () => {
    if (hasLocationPermission) {
      // Get the user's current location
      Location.getCurrentPositionAsync({})
        .then((position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserCurrentLocation(userLocation);

          // Check if passengerLocation and passengerDestination are available and have location data
          if (!passengerLocation || !passengerLocation.location ||
              !passengerDestination || !passengerDestination.location ||
              !passengerLocation.location.lat || !passengerLocation.location.lng ||
              !passengerDestination.location.lat || !passengerDestination.location.lng) {
            console.error('passengerLocation:', passengerLocation);
            console.error('passengerDestination:', passengerDestination);
            console.error('passengerLocation or passengerDestination is missing location data.');
            return;
          }

          // Compare the user's current location with the passenger location
          const passengerLatitude = passengerLocation.location.lat;
          const passengerLongitude = passengerLocation.location.lng;

          if (userLocation.latitude === passengerLatitude && userLocation.longitude === passengerLongitude) {
            // User's current location is the same as the passenger location
            getDirections(userLocation, passengerDestination.location);
          } else {
            // User's current location is different from the passenger location
            getDirections(passengerLocation.location, passengerDestination.location);
          }
        })
        .catch((error) => {
          // Handle error in getting the user's location
          console.error('Error getting location:', error);
          Alert.alert(
            'Location Error',
            'Unable to get your location. Please make sure location services are enabled.'
          );
        });
    } else {
      // Handle the case when location permission is not granted
      Alert.alert(
        'Location Permission Denied',
        'Please grant location permission to use this feature.'
      );
    }
  };

  return (
    <View>
      <Button title="Get Directions" onPress={handleGetDirections} />
    </View>
  );
};

export default DirectionScreen;

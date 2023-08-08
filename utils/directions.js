import { Platform, Linking, Alert } from 'react-native';

export const getDirections = async (origin, destination) => {
  const originStr = `${origin.latitude},${origin.longitude}`;
  const destinationStr = `${destination.latitude},${destination.longitude}`;

  const mode = 'driving'; // You can change this to 'walking', 'bicycling', or 'transit'

  const url = Platform.select({
    ios: `maps://?daddr=${destinationStr}&dirflg=${mode}`, // Apple Maps URL for iOS
    android: `google.navigation:q=${destinationStr}&mode=${mode}`, // Google Maps URL for Android
  });

  if (await Linking.canOpenURL(url)) {
    Linking.openURL(url); // Opens the appropriate navigation app
  } else {
    Alert.alert(
      'Navigation App Not Found',
      'Please install a navigation app like Google Maps or Apple Maps to use this feature.'
    );
  }
};

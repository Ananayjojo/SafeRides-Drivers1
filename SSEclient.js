import EventSource from 'react-native-event-source';
import { store } from './redux/store'; // Import the Redux store instance
import { setLocation} from './slices/locationSlice'; // Import the actions to update location slice
import { setDestination } from './slices/destinationSlice';

const SERVER_URL = 'http://192.168.1.10:8080/sse'; // Replace with your server's URL

class SSEClient {
  constructor() {
    this.eventSource = null;
  }

  connectToSSE() {
    this.eventSource = new EventSource(SERVER_URL);

    this.eventSource.onmessage = (event) => {
      // Handle the received data here
      const data = JSON.parse(event.data);
      console.log('Received data from SSE:', data);

      // Assuming the received data has 'location' and 'destination' properties
      const { location, destination } = data;

      // Dispatch actions to update Redux state with the received data
      store.dispatch(setLocation(location));
      store.dispatch(setDestination(destination));
    };

    this.eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      this.closeSSEConnection();
    };
  }

  closeSSEConnection() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}
// may need to change the server code in node-server folder

export default new SSEClient();

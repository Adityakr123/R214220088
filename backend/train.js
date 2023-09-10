const axios = require('axios');

// API endpoint for fetching train information
const apiUrl = 'http://20.244.56.144/train/trains';

// Replace 'YOUR_AUTH_TOKEN' with your actual authentication token
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQzMzIzOTIsImNvbXBhbnlOYW1lIjoiQWRpdF9sb2NvIiwiY2xpZW50SUQiOiIzMWNmYzJkNC02ZTkxLTRhYjgtOGJhNC1mMWEyOTJkYmVhZjYiLCJvd25lck5hbWUiOiIiLCJvd25lckVtYWlsIjoiIiwicm9sbE5vIjoiUjIxNDIyMDA4OCJ9.5YdpZQ0Rp2BW8eUfu8A57MwUdy0CZQ6ZEIDLL3vKrN4';

// Function to fetch and display train information
async function fetchTrainInfo() {
  try {
    // Set the authorization header with the token
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    // Make an HTTP GET request to the API with headers
    const response = await axios.get(apiUrl, { headers });

    // Check if the request was successful (status code 200)
    if (response.status === 200) {
      const trainData = response.data;

      // Display the fetched train information
      console.log('Train Information:');
      console.log('===================');

      // Check if trainData is an array
      if (Array.isArray(trainData)) {
        trainData.forEach((train) => {
          console.log('Train Name: ' + train.trainName);
          console.log('Deparature time: ' + train.departureTime.Hours + ':' + train.departureTime.Minutes+ ':' + train.departureTime.Seconds)
          console.log('Destination: ' + train.trainNumber);
          console.log('Ticket Price: ' + train.price.sleeper);
          console.log('Ticket Price AC: ' + train.price.AC);
          console.log('Delayed by: :' + train.delayedBy);
          console.log('-------------------');
        });
      } else {
        console.error('API response does not contain an array of trains.');
      }
    } else {
      console.error('Failed to fetch train information. Status:', response.status);
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

// Call the fetchTrainInfo function to fetch and display train information
fetchTrainInfo();

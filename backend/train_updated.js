const axios = require('axios');
const express = require('express');
const app = express();
const apiUrl = 'http://20.244.56.144/train/';
const auth_Url = 'http://20.244.56.144/train/auth';
const train_Data_Url = 'http://20.244.56.144/train/trains';
const port = process.env.PORT || 4000;

// Replace these with your provided credentials
const clientID = "31cfc2d4-6e91-4ab8-8ba4-f1a292dbeaf6";
const clientSecret = 'dEktBDrWMYZTPdmD';
const ownerName = 'Ram';
const ownerEmail = '500083205@stu.upes.ac.in';
const rollNo = 'R214220088';


// Function to fetch and display train information
async function fetchTrainInfo() {
    try {
        const response = await axios.post(
            auth_Url,
            {"companyName": "Adit_loco",
"clientID":"31cfc2d4-6e91-4ab8-8ba4-f1a292dbeaf6",
"clientSecret": "dEktBDrWMYZTPdmD",
"ownerName": "Ram",
 "ownerEmail": "500083205@stu.upes.ac.in",
 "rollNo":"R214220088"}
        );

        if (response.status === 200) {
            var authToken = response.data.access_token;
            // console.log(auth_token);
        } else {
            console.log(`Failed to obtain authentication token. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    }
    console.log(authToken);

    try {
        console.log(authToken);
        const headers = {
            Authorization: `Bearer ${authToken}`,
        };

        // Make an HTTP GET request to the API with headers
        const response = await axios.get(train_Data_Url, { headers });
        console.log(response.data);
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
                    console.log('Deparature time: ' + train.departureTime.Hours + ':' + train.departureTime.Minutes+ ':' + train.departureTime.Seconds);
                    console.log('Destination: ' + train.trainNumber);
                    console.log('Ticket Price: ' + train.price.sleeper);
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

fetchTrainInfo();



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
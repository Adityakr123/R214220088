// Dummy train data (replace with actual API calls)
const dummyTrainData = [
    { number: '123', name: 'Express Train 123', route: 'City A to City B', status: 'On Time' },
    { number: '456', name: 'Local Train 456', route: 'City C to City D', status: 'Delayed' },
    // Add more dummy data here
];

function displayTrainList() {
    const trainListDiv = document.getElementById('trainList');
    trainListDiv.innerHTML = '<h2>All Trains</h2>';
    
    for (const train of dummyTrainData) {
        const trainItem = document.createElement('div');
        trainItem.innerHTML = `<p><b>Train Number:</b> ${train.number}</p>
                               <p><b>Train Name:</b> ${train.name}</p>
                               <p><b>Route:</b> ${train.route}</p>
                               <p><b>Status:</b> ${train.status}</p>
                               <br>`;
        trainListDiv.appendChild(trainItem);
    }
}

function getTrainNumberFromURL() {
    // Extract the trainNumber query parameter from the URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('trainNumber');
}

function displayTrainDetail() {
    const trainNumber = getTrainNumberFromURL();
    const train = dummyTrainData.find(train => train.number === trainNumber);
    if (train) {
        const trainDetailDiv = document.getElementById('trainDetail');
        trainDetailDiv.innerHTML = `<h2>Train ${train.number} Details</h2>
                                    <p><b>Train Name:</b> ${train.name}</p>
                                    <p><b>Route:</b> ${train.route}</p>
                                    <p><b>Status:</b> ${train.status}</p>`;
    } else {
        alert('Train not found.');
        goBack();
    }
}

function goBack() {
    // Navigate back to the main page
    window.location.href = 'index.html';
}

function searchTrain() {
    const trainNumberInput = document.getElementById('trainNumberInput');
    const trainNumber = trainNumberInput.value.trim();
    if (trainNumber) {
        // Construct the URL with the train number as a query parameter
        const url = `train-detail.html?trainNumber=${trainNumber}`;
        // Redirect to the train detail page with the query parameter
        window.location.href = url;
    } else {
        alert('Please enter a train number.');
    }
}

// Initial page load
if (window.location.pathname.includes('train-detail.html')) {
    // If on the train-detail.html page, display the train details
    displayTrainDetail();
} else if (window.location.pathname.includes('index.html')) {
    // If on the index.html page, display all train details
    displayTrainList();
}

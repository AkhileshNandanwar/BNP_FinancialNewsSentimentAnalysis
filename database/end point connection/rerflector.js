const inputData = { someInput: "example data" }; // Replace with actual input data

fetch('http://192.168.1.100:5000/predict', {  // Use the server's IP
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputData)
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Prediction result:", data);
        // Use the data in your application
    })
    .catch(error => {
        console.error("Error fetching prediction:", error);
    });

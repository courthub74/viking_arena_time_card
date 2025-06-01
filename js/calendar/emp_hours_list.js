// Test print
console.log('Employee hours list JS loaded');

// Get employee names from the URL
const urlParams = new URLSearchParams(window.location.search);
const employeeName = urlParams.get('username');
// Log the employee name for debugging
console.log(`Employee name from URL: ${employeeName}`);
// Check if employeeName is not null or undefined
if (employeeName) {
    // Log the employee name for debugging
    console.log(`Employee name from URL: ${employeeName}`);
}

// If employeeName is null or undefined, you can handle it accordingly
else {
    console.error('Employee name not found in URL parameters.');
}

// Query the employee name element from the DOM
const employeeNameHours = document.getElementById('emp_name_box');
// Check if the employeeNameHours element exists
if (employeeNameHours) {
    // Set the text content of the employee name element
    employeeNameHours.textContent = employeeName;
}
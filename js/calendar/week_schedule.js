// Test Print
console.log("Week Schedule JS Loaded");


// Current date tracker
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth(); // 0-11 (January-December)
let currentDay = currentDate.getDay(); // 0-6 (Sunday-Saturday)
let currentDayName = currentDate.toLocaleString('default', { weekday: 'short' });

console.log(currentMonth + 1);
console.log(currentYear);
console.log(currentMonth);
console.log(currentDay);
console.log(currentDayName);

// Function to format date as a readable string
function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

// Function to update the display
function updateDayDisplay() {
    const dayElement = document.getElementById('current-day');
    const today = new Date();
    
    // Check if current date is today
    if (currentDate.toDateString() === today.toDateString()) {
        dayElement.textContent = 'Today';
    } else {
        dayElement.textContent = formatDate(currentDate);
    }
}

// Function to go to previous day
function prevDay() {
    currentDate.setDate(currentDate.getDate() - 1);
    updateDayDisplay();
}

// Function to go to next day
function nextDay() {
    currentDate.setDate(currentDate.getDate() + 1);
    updateDayDisplay();
}

// Initialize the display when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateDayDisplay();
});

// Optional: Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        prevDay();
    } else if (event.key === 'ArrowRight') {
        nextDay();
    }
});

// Create div elements for each employee's hours based on the day selection
function createEmployeeHoursDivs() {
    const employeeHoursContainer = document.getElementById('zam-day-table');
    employeeHoursContainer.innerHTML = ''; // Clear previous content
    // Style the container
    employeeHoursContainer.style.display = 'flex';
    employeeHoursContainer.style.flexDirection = 'column'; // Allow wrapping of employee divs
    // Example employee data
    // const employees = [
    //     { name: 'Alice', hours: '9 AM - 5 PM' },
    //     { name: 'Bob', hours: '10 AM - 6 PM' },
    //     { name: 'Charlie', hours: '8 AM - 4 PM' }
    // ];

    // Get the employee name and hours entered on manager weekly page
        // Store the information in a variable called employees

    // Check if employees exist
    // if (employees.length === 0) {
    //     console.warn('No employees found in local storage.');
    //     return; // Exit if no employees are found
    // }


    // employees.forEach(employee => {
    //     const div = document.createElement('div');
    //     div.className = 'zam-day-work';
    //     // Style the div
    //     div.style.flex = '1'; // Make each div take equal space
    //     div.style.flexDirection = 'column'; // Stack name and hours vertically
    //     div.style.margin = '0.5em'; // Add some margin for spacing
    //     // Append Zam day work to Zam day table
    //     employeeHoursContainer.appendChild(div);

    //     //  Get the Data entered by the manager that will be stored in local storage
    
    // });
}

// Call the Above function
createEmployeeHoursDivs();

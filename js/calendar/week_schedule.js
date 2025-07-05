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

    // Get the hours for each employee from local storage
    // (In a real application, you would fetch this data from a server or database)
    // Get the users from local storage
    const employees = JSON.parse(localStorage.getItem('users')) || [];

    // Check if employees exist
    if (employees.length === 0) {
        console.warn('No employees found in local storage.');
        return; // Exit if no employees are found
    }


    employees.forEach(employee => {
        const div = document.createElement('div');
        div.className = 'zam-day-work';
        // Style the div
        div.style.flex = '1'; // Make each div take equal space
        div.style.flexDirection = 'column'; // Stack name and hours vertically
        div.style.margin = '0.5em'; // Add some margin for spacing
        // Append Zam day work to Zam day table
        employeeHoursContainer.appendChild(div);
        // Create nested div for employee name
        const nameDiv = document.createElement('div');
        nameDiv.className = 'zam-day-name';
        // Exclude the managers
        // Assuming employee object has a 'username' property
        // If you want to exclude managers and skate guards, you can add a condition here
        if (employee.accountType !== 'Zamboni%20Driver') {
            return; // Skip this employee if they are a manager or skate guard
        }
        
        // Decode the username
        employee.username = decodeURIComponent(employee.username); // Decode the username if it is URL encoded
        // Place the user name inside the nameDiv
        nameDiv.textContent = employee.username; // Assuming employee object has a 'name' property
        // Append the nameDiv to Zam day work
        div.appendChild(nameDiv);
        // Create nested div for employee hours
        const hoursDiv = document.createElement('div');
        hoursDiv.className = 'zam-day-time';
        
        // Add more detailed logging to see what's happening
        console.log('Employee object:', employee);
        console.log('Employee.hours:', employee.hours);
        console.log('Type of employee.hours:', typeof employee.hours);

        const userHours = employee.hours || [];
        console.log('User Hours after fallback:', userHours);
        
        div.appendChild(hoursDiv);

        console.log(`The Employees: ${employee.username} : ${employee.hours}`);
    });
}

// Call the Above function
createEmployeeHoursDivs();

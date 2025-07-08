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
  

    // Retrieve schedules data from local storage
    const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    // Check if schedules exist
    if (schedules.length === 0) {
        console.warn('No schedules found in local storage.');
        return; // Exit if no schedules are found
    }
    // Filter scedules from updateDayDisplay function
    // Assuming currentDate is set to the date you want to filter schedules for
    // Test Print
    console.log(`Filtering schedules for date: ${currentDate.toDateString()}`);
    console.log('Current Date:', currentDate);
    console.log('Schedules from local storage:', schedules);

//    Fill in JS with date selected from the day selected button
    const selectedDate = currentDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    console.log('Selected Date:', selectedDate);

    // Filter schedules for the selected date
    const filteredSchedules = schedules.filter(schedule => {
        return schedule.date === selectedDate;
    });

    // Check if any schedules match the selected date
    if (filteredSchedules.length === 0) {
        console.warn(`No schedules found for date: ${selectedDate}`);
        return; // Exit if no schedules match the selected date
    }

    // Create divs for each employee's hours
    // CONTINUE HERE
    // filteredSchedules.forEach(schedule => {
    //     const employeeDiv = document.createElement('div');
    //     employeeDiv.className = 'employee-hours';
    //     employeeDiv.innerHTML = `
    //         <p class="employee-name">${schedule.employeeName}</p>
    //         <p class="employee-hours">${schedule.hours}</p>
    //         <button class="edit-button">Edit</button>
    //     `;
    //     employeeHoursContainer.appendChild(employeeDiv);
    // });

}

// Call the Above function
createEmployeeHoursDivs();

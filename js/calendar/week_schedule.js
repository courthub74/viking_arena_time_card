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

    const todaySchedules = schedules.filter(schedule => {
        // Convert schedule date to a Date object for comparison
        const scheduleDate = new Date(schedule.date); // Assuming schedule has a 'date' property
        // Compare the date parts (year, month, day) to check if they match
        return scheduleDate.getFullYear() === currentDate.getFullYear() &&
               scheduleDate.getMonth() === currentDate.getMonth() &&
                scheduleDate.getDate() === currentDate.getDate();
    });
    // Check if today's schedules exist
    if (todaySchedules.length === 0) {
        console.warn('No schedules found for today in local storage.');
        return; // Exit if no schedules for today are found
    }
    // Test Print
    console.log(`Schedules for ${currentDate.toDateString()}:`, todaySchedules);

    // Create a div for each employee's hours
    todaySchedules.forEach(schedule => {
        const div = document.createElement('div');
        div.className = 'zam-day-work';
        // Style the div
        div.style.flex = '1'; // Make each div take equal space
        div.style.flexDirection = 'column'; // Stack name and hours vertically
        div.style.margin = '0.5em'; // Add some margin for spacing

        // Create elements for employee name and hours
        const nameElement = document.createElement('p');
        nameElement.className = 'zam-day-name'; // Add class for styling
        // Assuming schedule has properties driver_one and zam_in_one for name and hours
        nameElement.textContent = schedule.driver_one; // Assuming employeeName is a property in schedule
        const InHoursElement = document.createElement('p');
        InHoursElement.className = 'zam-day-time'; // Add class for styling
        // Assuming schedule has properties zam_in_one for hours
        InHoursElement.textContent = schedule.zam_in_one; // Assuming hours is a property in schedule

        // Create an edit button
        const editButton = document.createElement('button');
        editButton.className = 'zam-day-one-edit'; // Add class for styling
        editButton.textContent = 'Edit'; // Set button text
        // Add an event listener to the edit button
        editButton.addEventListener('click', function() {
            // Handle edit functionality here
            // For example, you could open a modal or redirect to an edit page
            alert(`Edit ${schedule.driver_one}'s hours: ${schedule.zam_in_one}`);
        });
        // Append the edit button to the div
        div.appendChild(editButton);
        // Test Print 
        console.log(`Creating div for ${schedule.driver_one} with hours ${schedule.zam_in_one}`);
        // Append name and hours to the div
        div.appendChild(nameElement);
        div.appendChild(InHoursElement);

        // Append the employee hours div to the container
        employeeHoursContainer.appendChild(div);
    });

}

// Call the Above function
createEmployeeHoursDivs();

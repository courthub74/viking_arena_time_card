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

// // Create div elements for each employee's hours based on the day selection
// function createEmployeeHoursDivs() {
//     const employeeHoursContainer = document.getElementById('zam-day-table');
//     employeeHoursContainer.innerHTML = ''; // Clear previous content
//     // Style the container
//     employeeHoursContainer.style.display = 'flex';
//     employeeHoursContainer.style.flexDirection = 'column'; // Allow wrapping of employee divs
  

//     // Retrieve schedules data from local storage
//     const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
//     // Check if schedules exist
//     if (schedules.length === 0) {
//         console.warn('No schedules found in local storage.');
//         return; // Exit if no schedules are found
//     }
//     // Filter scedules from updateDayDisplay function
//     // Assuming currentDate is set to the date you want to filter schedules for
//     // Test Print
//     console.log(`Filtering schedules for date: ${currentDate.toDateString()}`);
//     console.log('Current Date:', currentDate);
//     console.log('Schedules from local storage:', schedules);

// //    Fill in JS with date selected from the day selected button
//     const selectedDate = currentDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
//     console.log('Selected Date:', selectedDate);

//     // Filter schedules for the selected date
//     const filteredSchedules = schedules.filter(schedule => {
//         return schedule.date === selectedDate;
//     });

//     // Check if any schedules match the selected date
//     if (filteredSchedules.length === 0) {
//         console.warn(`No schedules found for date: ${selectedDate}`);
//         return; // Exit if no schedules match the selected date
//     }

//     // Create divs for each employee's hours
//     // CONTINUE HERE
//     filteredSchedules.forEach(schedule => {
//         const employeeDiv = document.createElement('div');
//         employeeDiv.className = 'employee-hours';
//         employeeDiv.innerHTML = `
//             <p class="zam-day-name">${schedule.drivers.name}</p>
//             <p class="zam-day-time">${schedule.drivers.zam_in} - ${schedule.drivers.zam_out}</p>
//             <button class="edit-button">Edit</button>
//         `;
//         employeeHoursContainer.appendChild(employeeDiv);
//     });
// }

// Create div elements for each employee's hours based on the day selection
function createEmployeeHoursDivs() {
    const employeeHoursContainer = document.getElementById('zam-day-table');
    employeeHoursContainer.innerHTML = ''; // Clear previous content
    // Style the container
    employeeHoursContainer.style.display = 'flex';
    employeeHoursContainer.style.flexDirection = 'column';

    // Retrieve schedules data from local storage
    const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    // Check if schedules exist
    if (schedules.length === 0) {
        console.warn('No schedules found in local storage.');
        return; // Exit if no schedules are found
    }

    // Filter schedules from updateDayDisplay function
    console.log(`Filtering schedules for date: ${currentDate.toDateString()}`);
    console.log('Current Date:', currentDate);
    console.log('Schedules from local storage:', schedules);

    // Fill in JS with date selected from the day selected button
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

    // Check if we have drivers or skate guards before creating containers
    let hasDrivers = false;
    let hasSkateGuards = false;

    // Check what employee types exist in the filtered schedules
    filteredSchedules.forEach(schedule => {
        if (schedule.drivers) {
            hasDrivers = true;
        }
        if (schedule.skate_guards || schedule.skateGuards) {
            hasSkateGuards = true;
        }
    });

    // Only create containers if we have employees for that role
    let driversContainer = null;
    let skateGuardsContainer = null;

    if (hasDrivers) {
        driversContainer = createRoleContainer('Drivers', employeeHoursContainer);
    }
    if (hasSkateGuards) {
        skateGuardsContainer = createRoleContainer('Skate Guards', employeeHoursContainer);
    }

    // Process each schedule
    filteredSchedules.forEach(schedule => {
        // Handle drivers
        if (schedule.drivers && driversContainer) {
            if (Array.isArray(schedule.drivers)) {
                schedule.drivers.forEach(driver => {
                    createEmployeeDiv(driver, 'Driver', driversContainer);
                });
            } else {
                createEmployeeDiv(schedule.drivers, 'Driver', driversContainer);
            }
        }

        // Handle skate guards
        if ((schedule.skate_guards || schedule.skateGuards) && skateGuardsContainer) {
            const skateGuards = schedule.skate_guards || schedule.skateGuards;
            if (Array.isArray(skateGuards)) {
                skateGuards.forEach(guard => {
                    createEmployeeDiv(guard, 'Skate Guard', skateGuardsContainer);
                });
            } else {
                createEmployeeDiv(skateGuards, 'Skate Guard', skateGuardsContainer);
            }
        }
    });
}

// Helper function to create role containers
function createRoleContainer(title, parentContainer) {
    const roleContainer = document.createElement('div');
    roleContainer.className = 'role-container';
    roleContainer.style.marginBottom = '20px';
    
    const roleHeader = document.createElement('h3');
    roleHeader.textContent = title;
    roleHeader.style.marginBottom = '10px';
    roleHeader.style.color = '#333';
    roleHeader.style.borderBottom = '2px solid #ddd';
    roleHeader.style.paddingBottom = '5px';
    
    roleContainer.appendChild(roleHeader);
    parentContainer.appendChild(roleContainer);
    
    return roleContainer;
}

// Helper function to format name as first initial + last name
function formatName(fullName) {
    if (!fullName || typeof fullName !== 'string') {
        return 'N/A';
    }
    
    const nameParts = fullName.trim().split(' ');
    if (nameParts.length < 2) {
        return fullName; // Return as-is if no space found
    }
    
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1]; // Get last part in case of middle names
    
    return `${firstName.charAt(0).toUpperCase()}. ${lastName}`;
}

// Helper function to create individual employee divs
function createEmployeeDiv(employee, role, container) {
    const employeeDiv = document.createElement('div');
    employeeDiv.className = 'employee-hours';
    
    // Handle different possible time field names
    const timeIn = employee.zam_in || employee.start_time || employee.in || 'N/A';
    const timeOut = employee.zam_out || employee.end_time || employee.out || 'N/A';
    
    // Format the name as first initial + last name
    const formattedName = formatName(employee.name);
    
    // Check if any field displays "not needed" and hide the entire div if so
    if (formattedName.toLowerCase().includes('n. needed') || 
        timeIn.toLowerCase().includes('N/A') || 
        timeOut.toLowerCase().includes('N/A')) {
        employeeDiv.style.display = 'none';
        return;
    }
    
    employeeDiv.innerHTML = `
        <p class="zam-day-name">${formattedName}</p>
        <p class="zam-day-time">${timeIn} - ${timeOut}</p>
        <button class="edit-button">Edit</button>
    `;
    container.appendChild(employeeDiv);
}

// Call the Above function
createEmployeeHoursDivs();

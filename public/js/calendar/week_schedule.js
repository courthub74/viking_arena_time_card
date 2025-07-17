// Week Schedule Refactored for MongoDB
console.log("Week Schedule JS Loaded");

let currentDate = new Date();

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
}

function updateDayDisplay() {
    const dayElement = document.getElementById('current-day');
    const today = new Date();

    if (currentDate.toDateString() === today.toDateString()) {
        dayElement.textContent = 'Today';
    } else {
        dayElement.textContent = formatDate(currentDate);
    }

    createEmployeeHoursDivs();
}

function prevDay() {
    currentDate.setDate(currentDate.getDate() - 1);
    updateDayDisplay();
}

function nextDay() {
    currentDate.setDate(currentDate.getDate() + 1);
    updateDayDisplay();
}

async function fetchSchedulesFromMongoDB(dateStr) {
    try {
        const res = await fetch(`/api/schedules?date=${dateStr}`);
        if (!res.ok) throw new Error('Failed to fetch schedules');
        const data = await res.json();
        return data || [];
    } catch (err) {
        console.error("Error fetching schedules:", err);
        return [];
    }
}

async function createEmployeeHoursDivs() {
    const container = document.getElementById('zam-day-table');
    if (!container) return;

    container.innerHTML = '';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';

    const selectedDate = currentDate.toISOString().split('T')[0];
    const schedules = await fetchSchedulesFromMongoDB(selectedDate);

    if (!schedules.length) {
        const div = document.createElement('div');
        div.innerHTML = `<p>No schedules found for ${formatDate(currentDate)}.</p>`;
        container.appendChild(div);
        return;
    }

    let hasDrivers = false;
    let hasSkateGuards = false;

    schedules.forEach(s => {
        if (s.drivers) hasDrivers = true;
        if (s.skate_guards || s.skateGuards) hasSkateGuards = true;
    });

    const driversContainer = hasDrivers ? createRoleContainer('Drivers', container) : null;
    const skateGuardsContainer = hasSkateGuards ? createRoleContainer('Skate Guards', container) : null;

    schedules.forEach(s => {
        const drivers = Array.isArray(s.drivers) ? s.drivers : [s.drivers];
        drivers.forEach(d => driversContainer && createEmployeeDiv(d, 'Driver', driversContainer));

        const guards = s.skate_guards || s.skateGuards || [];
        const guardsArr = Array.isArray(guards) ? guards : [guards];
        guardsArr.forEach(g => skateGuardsContainer && createEmployeeDiv(g, 'Skate Guard', skateGuardsContainer));
    });
}

function createRoleContainer(title, parent) {
    const container = document.createElement('div');
    container.className = 'role-container';
    container.style.marginTop = '30px';
    container.style.marginBottom = '20px';

    const header = document.createElement('p');
    header.className = 'role-header';
    header.textContent = title;
    header.style.fontSize = '1em';
    header.style.marginBottom = '10px';
    header.style.color = '#333';
    container.appendChild(header);
    parent.appendChild(container);
    return container;
}

function formatName(fullName) {
    if (!fullName || typeof fullName !== 'string') return 'N/A';
    const parts = fullName.trim().split(' ');
    if (parts.length < 2) return fullName;
    return `${parts[0].charAt(0).toUpperCase()}. ${parts[1].substring(0, 6)}`;
}

function createEmployeeDiv(employee, role, container) {
    const div = document.createElement('div');
    div.className = 'employee-hours';
    div.style.display = 'flex';
    div.style.justifyContent = 'space-between';
    div.style.alignItems = 'center';
    div.style.padding = '10px';
    div.style.border = '1px solid #0076cb98';
    div.style.borderRadius = '10px';
    div.style.marginBottom = '10px';
    div.style.backgroundColor = 'var(--input-background)';

    let timeIn = employee.start_time || employee.zam_in || employee.in || employee.time_in || 'N/A';
    let timeOut = employee.end_time || employee.zam_out || employee.out || employee.time_out || 'N/A';
    const name = formatName(employee.name);

    if (name.toLowerCase().includes('not needed') || timeIn === 'N/A' || timeOut === 'N/A') {
        div.innerHTML = `
            <p class="zam-day-name">Not Needed today</p>
            <p class="zam-day-time"></p>
            <button class="edit-button" style="display:none;"><img src="../../img/edit-buttons/white-edit-pen.png" alt="Edit" style="width:18px;height:18px;"></button>`;
    } else {
        div.innerHTML = `
            <p class="zam-day-name">${name}</p>
            <p class="zam-day-time">${timeIn} - ${timeOut}</p>
            <button class="edit-button"><img src="../../img/edit-buttons/white-edit-pen.png" alt="Edit" style="width:18px;height:18px;"></button>`;
    }

    container.appendChild(div);
}

// Dashboard back link
const backToDashboardLink = document.getElementById('link_back');
if (backToDashboardLink) {
  backToDashboardLink.addEventListener('click', function(event) {
    event.preventDefault();

      // ✅ Debug prints
      console.log("Back Link Clicked");
     

    const session = sessionStorage.getItem('currentUser') || sessionStorage.getItem('session');
    if (session) {
      try {
        const user = JSON.parse(session);
        const rawRole = user.role || '';
        const userRole = decodeURIComponent(rawRole).trim().toLowerCase();

         // ✅ Debug prints
        console.log('Raw user object:', user);
        console.log('Raw role:', rawRole);
        console.log('Decoded role:', userRole);

        if (userRole === 'manager') {
          window.location.href = '../../html/dashboards/manager.html';
        } else {
          window.location.href = '../../html/dashboards/employee.html';
        }
      } catch (err) {
        console.error('Failed to parse session user:', err);
        window.location.href = '../../html/dashboards/employee.html';
      }
    } else {
      // Default fallback
      window.location.href = '../../html/dashboards/employee.html';
    }
  });
}

// Init
window.addEventListener('DOMContentLoaded', () => {
    updateDayDisplay();
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') prevDay();
    else if (event.key === 'ArrowRight') nextDay();
});


// // Test Print
// console.log("Week Schedule JS Loaded");

// // Current date tracker
// let currentDate = new Date();
// let currentYear = currentDate.getFullYear();
// let currentMonth = currentDate.getMonth(); // 0-11 (January-December)
// let currentDay = currentDate.getDay(); // 0-6 (Sunday-Saturday)
// let currentDayName = currentDate.toLocaleString('default', { weekday: 'short' });

// console.log(currentMonth + 1);
// console.log(currentYear);
// console.log(currentMonth);
// console.log(currentDay);
// console.log(currentDayName);

// // Function to format date as a readable string
// function formatDate(date) {
//     const options = { 
//         weekday: 'long', 
//         year: 'numeric', 
//         month: 'long', 
//         day: 'numeric' 
//     };
//     return date.toLocaleDateString('en-US', options);
// }

// // Function to update the display
// function updateDayDisplay() {
//     const dayElement = document.getElementById('current-day');
//     const today = new Date();
    
//     // Check if current date is today
//     if (currentDate.toDateString() === today.toDateString()) {
//         dayElement.textContent = 'Today';
//     } else {
//         dayElement.textContent = formatDate(currentDate);
//     }
    
//     // Update employee hours display when date changes
//     createEmployeeHoursDivs();
// }

// // Function to go to previous day
// function prevDay() {
//     currentDate.setDate(currentDate.getDate() - 1);
//     updateDayDisplay();
// }

// // Function to go to next day
// function nextDay() {
//     currentDate.setDate(currentDate.getDate() + 1);
//     updateDayDisplay();
// }

// // Initialize the display when page loads
// document.addEventListener('DOMContentLoaded', function() {
//     updateDayDisplay();
// });

// // Optional: Add keyboard navigation
// document.addEventListener('keydown', function(event) {
//     if (event.key === 'ArrowLeft') {
//         prevDay();
//     } else if (event.key === 'ArrowRight') {
//         nextDay();
//     }
// });

// // Create div elements for each employee's hours based on the day selection
// function createEmployeeHoursDivs() {
//     const employeeHoursContainer = document.getElementById('zam-day-table');
//     if (!employeeHoursContainer) {
//         console.warn('Element with id "zam-day-table" not found.');
//         return;
//     }
    
//     employeeHoursContainer.innerHTML = ''; // Clear previous content
//     // Style the container
//     employeeHoursContainer.style.display = 'flex';
//     employeeHoursContainer.style.flexDirection = 'column';

//     // Retrieve schedules data from local storage
//     const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
//     // Check if schedules exist
//     if (schedules.length === 0) {
//         console.warn('No schedules found in local storage.');
//         // Show a message to the user
//         const noScheduleDiv = document.createElement('div');
//         noScheduleDiv.innerHTML = '<p>No schedules available for this date.</p>';
//         employeeHoursContainer.appendChild(noScheduleDiv);
//         return;
//     }

//     // Filter schedules from updateDayDisplay function
//     console.log(`Filtering schedules for date: ${currentDate.toDateString()}`);
//     console.log('Current Date:', currentDate);
//     console.log('Schedules from local storage:', schedules);

//     // Fill in JS with date selected from the day selected button
//     const selectedDate = currentDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
//     console.log('Selected Date:', selectedDate);

//     // Filter schedules for the selected date
//     const filteredSchedules = schedules.filter(schedule => {
//         return schedule.date === selectedDate;
//     });

//     // Check if any schedules match the selected date
//     if (filteredSchedules.length === 0) {
//         console.warn(`No schedules found for date: ${selectedDate}`);
//         // Show a message to the user
//         const noScheduleDiv = document.createElement('div');
//         noScheduleDiv.innerHTML = `<p>No schedules found for ${formatDate(currentDate)}.</p>`;
//         employeeHoursContainer.appendChild(noScheduleDiv);
//         return;
//     }

//     // Check if we have drivers or skate guards before creating containers
//     let hasDrivers = false;
//     let hasSkateGuards = false;

//     // Check what employee types exist in the filtered schedules
//     filteredSchedules.forEach(schedule => {
//         if (schedule.drivers) {
//             hasDrivers = true;
//         }
//         if (schedule.skate_guards || schedule.skateGuards) {
//             hasSkateGuards = true;
//         }
//     });

//     // Only create containers if we have employees for that role
//     let driversContainer = null;
//     let skateGuardsContainer = null;

//     if (hasDrivers) {
//         driversContainer = createRoleContainer('Drivers', employeeHoursContainer);
//     }
//     if (hasSkateGuards) {
//         skateGuardsContainer = createRoleContainer('Skate Guards', employeeHoursContainer);
//     }

//     // Process each schedule
//     filteredSchedules.forEach(schedule => {
//         // Handle drivers
//         if (schedule.drivers && driversContainer) {
//             if (Array.isArray(schedule.drivers)) {
//                 schedule.drivers.forEach(driver => {
//                     createEmployeeDiv(driver, 'Driver', driversContainer);
//                 });
//             } else {
//                 createEmployeeDiv(schedule.drivers, 'Driver', driversContainer);
//             }
//         }

//         // Handle skate guards
//         if ((schedule.skate_guards || schedule.skateGuards) && skateGuardsContainer) {
//             const skateGuards = schedule.skate_guards || schedule.skateGuards;
//             if (Array.isArray(skateGuards)) {
//                 skateGuards.forEach(guard => {
//                     createEmployeeDiv(guard, 'Skate Guard', skateGuardsContainer);
//                 });
//             } else {
//                 createEmployeeDiv(skateGuards, 'Skate Guard', skateGuardsContainer);
//             }
//         }
//     });
// }

// // Helper function to create role containers
// function createRoleContainer(title, parentContainer) {
//     const roleContainer = document.createElement('div');
//     roleContainer.className = 'role-container';
//     roleContainer.style.marginTop = '30px';
//     roleContainer.style.marginBottom = '20px';
    
//     const roleHeader = document.createElement('p');
//     roleHeader.textContent = title;
//     roleHeader.className = 'role-header';
//     // Style the role header
//     roleHeader.style.fontSize = '1em';
//     roleHeader.style.fontWeight = 'normal';
//     roleHeader.style.color = '#0076cb';
//     roleHeader.style.marginBottom = '10px';
//     roleHeader.style.color = '#333';
//     // roleHeader.style.borderBottom = '2px solid #ddd';
//     roleHeader.style.paddingBottom = '5px';
    
//     roleContainer.appendChild(roleHeader);
//     parentContainer.appendChild(roleContainer);
    
//     return roleContainer;
// }

// // Helper function to format name as first initial + last name
// function formatName(fullName) {
//     if (!fullName || typeof fullName !== 'string') {
//         return 'N/A';
//     }
   
//     const nameParts = fullName.trim().split(' ');
//     if (nameParts.length < 2) {
//         return fullName; // Return as-is if no space found
//     }
   
//     const firstName = nameParts[0];
//     const lastName = nameParts[nameParts.length - 1]; // Get last part in case of middle names
   
//     // Limit last name to 6 characters
//     const truncatedLastName = lastName.length > 6 ? lastName.substring(0, 6) : lastName;
   
//     return `${firstName.charAt(0).toUpperCase()}. ${truncatedLastName}`;
// }

// // Helper function to create individual employee divs
// function createEmployeeDiv(employee, role, container) {
//     const employeeDiv = document.createElement('div');
//     employeeDiv.className = 'employee-hours';
//     // Style the employee div
//     employeeDiv.style.display = 'flex';
//     employeeDiv.style.justifyContent = 'space-between';
//     employeeDiv.style.alignItems = 'center';    
//     employeeDiv.style.padding = '10px';
//     employeeDiv.style.border = '1px solid #0076cb98';
//     employeeDiv.style.borderRadius = '10px';
//     employeeDiv.style.marginBottom = '10px';
//     employeeDiv.style.backgroundColor = 'var(--input-background)';
//     employeeDiv.style.fontSize = '0.9em';
    
//     // Handle different possible time field names for skate guards and drivers
//     let timeIn, timeOut;
    
//     if (role === 'Skate Guard') {
//         // For skate guards, try different possible field names
//         timeIn = employee.start_time || employee.zam_in || employee.in || employee.time_in || 'N/A';
//         timeOut = employee.end_time || employee.zam_out || employee.out || employee.time_out || 'N/A';
//     } else {
//         // For drivers, use the original field names
//         timeIn = employee.zam_in || employee.start_time || employee.in || 'N/A';
//         timeOut = employee.zam_out || employee.end_time || employee.out || 'N/A';
//     }
    
//     // Format the name as first initial + last name
//     const formattedName = formatName(employee.name);
    
//     // Debug logging to see what we're getting
//     console.log('Employee data:', employee);
//     console.log('Role:', role);
//     console.log('TimeIn:', timeIn);
//     console.log('TimeOut:', timeOut);
//     console.log('Formatted Name:', formattedName);
    
//     // Check if any field displays "not needed" and hide the entire div if so
//     // Fixed the condition - it was checking if timeIn/timeOut INCLUDES 'N/A', which would hide valid entries
//     if (formattedName.toLowerCase().includes('Not Needed') || 
//         timeIn === 'N/A' || 
//         timeOut === 'N/A') {
//         console.log('Hiding employee div due to N/A values');
//         // employeeDiv.style.display = 'flex'; // or 'inline', 'flex', etc.
//         employeeDiv.innerHTML = `
//             <p class="zam-day-name">Not Needed today</p>
//             <p class="zam-day-time"></p>
//             <button class="edit-button" style="display:none;">
//                 <img src="../../img/edit-buttons/white-edit-pen.png" alt="Edit" style="width:18px;height:18px;vertical-align:middle;">`;
//         return;
//     }
    
//     employeeDiv.innerHTML = `
//         <p class="zam-day-name">${formattedName}</p>
//         <p class="zam-day-time">${timeIn} - ${timeOut}</p>
//         <button class="edit-button">
//         <img src="../../img/edit-buttons/white-edit-pen.png" alt="Edit" style="width:18px;height:18px;vertical-align:middle;">
//     </button>
//     `;
//     container.appendChild(employeeDiv);
// }

// console.log('Decoded Role:', userRole);



// // Back to dashboard functionality
// const backToDashboardLink = document.getElementById('link_back');
// if (backToDashboardLink) {
//   backToDashboardLink.addEventListener('click', function(event) {
//     event.preventDefault();

//     const userType = sessionStorage.getItem('currentUser') || sessionStorage.getItem('session');
//     if (userType) {
//       const userTypeAcc = JSON.parse(userType);
//       const rawRole = userTypeAcc.accountType || '';
//       const userRole = decodeURIComponent(rawRole).trim().toLowerCase();  // normalize

//       if (userRole === 'manager') {
//         window.location.href = '../../html/dashboards/manager.html';
//       } else {
//         window.location.href = '../../html/dashboards/employee.html';
//       }
//     }
//   });
// }
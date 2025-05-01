// Test Print
console.log("Monthly Calendar JS Loaded");

// // Function to generate the monthly calendar
// function generateMonthlyCalendar(year, month) {

// }

// // Function to get the number of days in a month
// function getDaysInMonth(year, month) {
//     return new Date(year, month + 1, 0).getDate();
// }

// // Function to get the first day of the month (0-6, 0 = Sunday, 1 = Monday, etc.)
// function getFirstDayOfMonth(year, month) {
//     return new Date(year, month, 1).getDay();
// }

// // Function to create the calendar table
// function createCalendarTable(year, month) {
//     const daysInMonth = getDaysInMonth(year, month);
//     const firstDay = getFirstDayOfMonth(year, month);

//     // Create a table element
//     const table = document.createElement('table');
//     table.className = 'calendar-table';

//     // Create the header row with day names
//     const headerRow = document.createElement('tr');
//     const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     dayNames.forEach(day => {
//         const th = document.createElement('th');
//         th.textContent = day;
//         headerRow.appendChild(th);
//     });
//     table.appendChild(headerRow);

//     // Create the body of the calendar
//     let currentDay = 1;
//     for (let i = 0; i < 6; i++) { // 6 rows for the calendar
//         const row = document.createElement('tr');
//         for (let j = 0; j < 7; j++) { // 7 days in a week
//             const cell = document.createElement('td');
//             if (i === 0 && j < firstDay) {
//                 cell.textContent = ''; // Empty cell before the first day of the month
//             } else if (currentDay > daysInMonth) {
//                 cell.textContent = ''; // Empty cell after the last day of the month
//             } else {
//                 cell.textContent = currentDay;
//                 currentDay++;
//             }
//             row.appendChild(cell);
//         }
//         table.appendChild(row);
//     }

//     return table;
// }
// // Function to display the calendar in a specific element
// function displayCalendar(year, month, elementId) {
//     const calendarElement = document.getElementById(elementId);
//     calendarElement.innerHTML = ''; // Clear previous content
//     const calendarTable = createCalendarTable(year, month);
//     calendarElement.appendChild(calendarTable);
// }
// // Function to handle the month change
// function changeMonth(direction) {
//     const currentYear = parseInt(document.getElementById('calendar-year').textContent);
//     const currentMonth = parseInt(document.getElementById('calendar-month').textContent);

//     let newMonth = currentMonth + direction;
//     let newYear = currentYear;

//     if (newMonth < 0) {
//         newMonth = 11; // December
//         newYear--;
//     } else if (newMonth > 11) {
//         newMonth = 0; // January
//         newYear++;
//     }

//     displayCalendar(newYear, newMonth, 'calendar');
//     document.getElementById('calendar-year').textContent = newYear;
//     document.getElementById('calendar-month').textContent = newMonth + 1; // Months are 0-indexed
// }
// // Event listeners for the previous and next buttons
// document.getElementById('prev-month').addEventListener('click', () => changeMonth(-1));
// document.getElementById('next-month').addEventListener('click', () => changeMonth(1));
// // Initial display of the calendar
// const today = new Date();
// const currentYear = today.getFullYear();
// const currentMonth = today.getMonth();
// document.getElementById('calendar-year').textContent = currentYear;
// document.getElementById('calendar-month').textContent = currentMonth + 1; // Months are 0-indexed
// displayCalendar(currentYear, currentMonth, 'calendar');
// // Function to handle the month change
// function changeMonth(direction) {
//     const currentYear = parseInt(document.getElementById('calendar-year').textContent);
//     const currentMonth = parseInt(document.getElementById('calendar-month').textContent);

//     let newMonth = currentMonth + direction;
//     let newYear = currentYear;

//     if (newMonth < 0) {
//         newMonth = 11; // December
//         newYear--;
//     } else if (newMonth > 11) {
//         newMonth = 0; // January
//         newYear++;
//     }

//     displayCalendar(newYear, newMonth, 'calendar');
//     document.getElementById('calendar-year').textContent = newYear;
//     document.getElementById('calendar-month').textContent = newMonth + 1; // Months are 0-indexed
// }

// Query the back to dashboard link and add an event listener to it
const backToDashboardLink = document.getElementById('link_back');

if (backToDashboardLink) {
    backToDashboardLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior
        const userRole = sessionStorage.getItem('accountType'); // Assuming you store the user role in local storage
        if (userRole === 'manager') {
            // Redirect to manager dashboard
            window.location.href = '../../html/dashboards/manager.html'; // Replace with the actual URL for the manager dashboard
        } else {
            // Default redirect to the main dashboard
            window.location.href = '../../html/dashboards/employee.html'; // Replace with the actual URL for the main dashboard
        }
    });
};

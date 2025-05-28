// Test Print
console.log("Calendar Test Script Loaded");

// Event Listener Duplication: Every time renderCalendar() 
// is called, you're querying
//  document.querySelectorAll('.calendar-cell') 
// and adding new event listeners, but this query 
// happens BEFORE the new cells are actually created 
// and added to the DOM.

// add the event listener directly to each cell 
// as it's created in the loop.

// Get current month and year
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Initialize month names array
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Function to render the calendar
function renderCalendar(month, year) {
     // Get the table body
    const calendarBody = document.getElementById('calendar-body');
    if (!calendarBody) {
        console.error('Calendar table body not found');
        return;
    }
    calendarBody.innerHTML = ''; // Clear previous cells

    // Get the first day of the month
    const firstDay = new Date(year, month, 1).getDay();

    // Get the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create cells for the calendar
    for (let i = 0; i < 6; i++) { // 6 rows
        // The DAYS in a week are 7, so we create 7 cells per row
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) { // 7 columns for 7 days of the week

            // EACH DAY is represented by a cell
            const cell = document.createElement('td');
            const cellIndex = i * 7 + j;

            // Check if the cell is in the first week and before the first day of the month
            if (i === 0 && j < firstDay) {
                cell.textContent = '';
            } else if (cellIndex - firstDay < daysInMonth) {
                cell.textContent = cellIndex - firstDay + 1;
                cell.classList.add('calendar-cell');
                // Add event listener to each cell
                cell.addEventListener('click', function() {
                    console.log(`You clicked on ${cell.textContent} ${monthNames[month]} ${year}`);
                });
            } else {
                cell.textContent = '';
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
    }
}
// Function to change the month
function changeMonth(direction) {
    if (direction === 'next') {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
    } else if (direction === 'prev') {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
    }
    renderCalendar(currentMonth, currentYear);
}
// Initial render of the calendar
renderCalendar(currentMonth, currentYear);
// Previous and Next buttons Functionality
// Also call styleCellsWithTimeEntries after month navigation
function prevMonth() {
    currentMonth = currentMonth <= 0 ? 11 : currentMonth - 1;
    currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
    renderCalendar(currentMonth, currentYear);
    updateCalendarHeader(currentMonth, currentYear);
    // Call the function to style today's cell (after month navigation)
    styleTodayCell();
    return false;
  }
  
  function nextMonth() {
    currentMonth = currentMonth >= 11 ? 0 : currentMonth + 1;
    currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
    renderCalendar(currentMonth, currentYear);
    updateCalendarHeader(currentMonth, currentYear);
    // Call the function to style today's cell (after month navigation)
    styleTodayCell();
    return false;
  }

// Function to update the calendar header
function updateCalendarHeader(month, year) {
    const header = document.getElementById('current-month');
    if (header) {
        header.textContent = `${monthNames[month]} ${year}`;
    } else {
        console.error('Calendar header not found');
    }
}
// Initial call to update the header
updateCalendarHeader(currentMonth, currentYear);

// Style the today's date cell
function styleTodayCell() {
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    const todayDate = today.getDate();

    // Check if the current month and year match today's
    if (currentMonth === todayMonth && currentYear === todayYear) {
        const cells = document.querySelectorAll('.calendar-cell');
        cells.forEach(cell => {
            if (cell.textContent == todayDate) {
                cell.classList.add('today');
            }
        });
    }
}


// Call the function to style today's cell (after initial render)
styleTodayCell();

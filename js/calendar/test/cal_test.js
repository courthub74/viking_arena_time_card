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
                cell.addEventListener('click', function(e) {
                    e.preventDefault(); // Prevent default action
                    e.stopPropagation(); // Stop the event from bubbling up
                    console.log(`You clicked on ${cell.textContent} ${monthNames[month]} ${year}`);
                    // Here you can add functionality to handle the click event
                    // For example, you can open a modal or display a message
                    // MODAL HERE
                    const modal = document.getElementById('cal_modal');
                    if (modal) {
                        modal.style.display = 'block'; // Show the modal
                        // Get the modal content elements
                        // You can add more functionality here

                        // Get the selected date
                        const selectedDate = cell.textContent;
                        const selectedMonth = monthNames[month];
                        const selectedYear = year;


                        // Display the selected date in the modal
                        const now = new Date();
                        now.setDate(selectedDate);
                        now.setMonth(month);
                        now.setFullYear(year);
                        const modalDate = document.getElementById('current_day');
                        if (modalDate) {
                            console.log(`Selected Date: ${selectedDate} ${selectedMonth} ${selectedYear}`);
                            // Format the date for display
                            // modalDate.value = now.toISOString().split('T')[0]; // Set the value of the date input
                            modalDate.value = now.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit'
                              });
                            console.log(`Modal Date: ${modalDate.value}`);
                        }

                        // Set the Time picker values

                        // IN TIME
                        // In Hours select element
                        const inHourSelect = document.getElementById('in_hour');
                        // Populate the inHoursSelect with options
                        for (let i = 1; i <= 12; i++) {
                            const in_option = document.createElement('option');
                            in_option.value = i;
                            in_option.textContent = i < 10 ? '0' + i : i; // Add leading zero for single digit hours
                            inHourSelect.appendChild(in_option);
                            console.log(`In Hour: ${inHourSelect.value}`);
                          }

                        // In Minutes select element
                        const inMinuteSelect = document.getElementById('in_minute');
                        // Populate the inMinutesSelect with options
                        for (let i = 0; i < 60; i += 5) {
                            const in_minute_option = document.createElement('option');
                            in_minute_option.value = i;
                            in_minute_option.textContent = i < 10 ? '0' + i : i; // Add leading zero for single digit minutes
                            inMinuteSelect.appendChild(in_minute_option);
                            console.log(`In Minute: ${inMinuteSelect.value}`);
                        }

                        // OUT TIME
                        // Out Hours select element
                        const outHourSelect = document.getElementById('out_hour');
                        // Populate the outHoursSelect with options
                        for (let i = 1; i <= 12; i++) {
                            const out_option = document.createElement('option');
                            out_option.value = i;
                            out_option.textContent = i < 10 ? '0' + i : i; // Add leading zero for single digit hours
                            outHourSelect.appendChild(out_option);
                            console.log(`Out Hour: ${outHourSelect.value}`);
                        }

                        // Out Minutes select element
                        const outMinuteSelect = document.getElementById('out_minute');
                        // Populate the outMinutesSelect with options
                        for (let i = 0; i < 60; i += 5) {
                            const out_minute_option = document.createElement('option');
                            out_minute_option.value = i;
                            out_minute_option.textContent = i < 10 ? '0' + i : i; // Add leading zero for single digit minutes
                            outMinuteSelect.appendChild(out_minute_option);
                            console.log(`Out Minute: ${outMinuteSelect.value}`);
                        }

                         // Close the modal 
                         const closeModal = document.getElementById('close_modal');
                         if (closeModal) {
                             closeModal.addEventListener('click', function() {
                                 modal.style.display = 'none'; // Hide the modal
                             });
                         } else {
                             console.error('Close modal button not found');
                         }




                        //  style an input field to test
                        const modal_in_field = document.getElementById('time-picker-in');
                        const modal_out_field = document.getElementById('time-picker-out');

                        // remove the time pickers
                        const timePickerHourIn = document.getElementById('in_hour');
                        const timePickerMinuteIn = document.getElementById('in_minute');
                        const timePickerHourOut = document.getElementById('out_hour');
                        const timePickerMinuteOut = document.getElementById('out_minute');
                        

                        // change the spans html to the pertaining day
                        const modal_in_span = document.getElementById('in_time_span');
                        const modal_out_span = document.getElementById('out_time_span');

                        // Get the logged user from session storage
                        const currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('session')) || null;
                        // Test Print
                        // console.log(currentUser.username);
                        // decode the current user from session storage
                        const userName = decodeURIComponent(currentUser.username);
                        // Test Print
                        console.log(`Current User: ${userName}`);
                        // If No User Logged in
                        if (!currentUser) {
                        console.error('No user logged in');
                             return;
                        }
                        // Place user name in the modal title
                        const modalName = document.getElementById('employee_name_month');
                        if (modalName) {
                            modalName.textContent = `${userName}`;
                        } else {
                            console.error('Modal name element not found');
                        }
                        
                        // Get the hours for user and style the appropriate cells
                        // Get the user data
                        const userString = sessionStorage.getItem('currentUser') || sessionStorage.getItem('session') || null;
                        const loggedUser = userString ? JSON.parse(userString) : null;
                        
                        if (!loggedUser) {
                            error.log('No logged user found');
                            return;
                        }
                        
                        // Get all users from local storage
                        const allUsers = JSON.parse(localStorage.getItem('users')) || [];
                        
                        // Find the logged in user by index
                        const userIndex = allUsers.findIndex(user => user.username === loggedUser.username);
                        
                        if (userIndex === -1) {
                            console.log('User not found in local storage');
                            return;
                        }
                        
                        // Get the hours array for the logged in user
                        const userHours = allUsers[userIndex].hours || [];
                        
                        console.log('User Hours for styling:', userHours);
                        
                        

                        // Get the times from the hours array associated with 
                        //  that user from local storage
                        

                        //  Enable the submit button when the time pickers are changed
                        const submitButton = document.getElementById('submit_employee_hours_modal');

                        // Enable the submit button with select elements
                        inHourSelect.addEventListener('change', function() {
                            // Enable the submit button when the out hour is changed
                            submitButton.disabled = false;
                        });
                        outHourSelect.addEventListener('change', function() { 
                            // Enable the submit button when the out hour is changed
                            submitButton.disabled = false;
                        });
                        inMinuteSelect.addEventListener('change', function() {
                            // Enable the submit button when the out hour is changed
                            submitButton.disabled = false;
                        });
                        outMinuteSelect.addEventListener('change', function() {
                            // Enable the submit button when the out hour is changed
                            submitButton.disabled = false;
                        });

                        // Submit button functionality send it to the local storage
                        submitButton.addEventListener('click', function() {
                            // Get the selected in and out times
                            const inHour = inHourSelect.value;
                            const inMinute = inMinuteSelect.value;
                            const outHour = outHourSelect.value;
                            const outMinute = outMinuteSelect.value;

                            // Create a new time entry object
                            const timeEntry = {
                                // date: now.toISOString().split('T')[0], // Format date as YYYY-MM-DD
                                date: modalDate.value,
                                inTime: `${inHour}:${inMinute}`,
                                outTime: `${outHour}:${outMinute}`,
                                user: userName // Add the user name
                            };

                            // Add the time entry to the user's hours array
                            userHours.push(timeEntry);

                            // Update the user's hours in local storage
                            allUsers[userIndex].hours = userHours;
                            localStorage.setItem('users', JSON.stringify(allUsers));

                            console.log('Time entry submitted:', timeEntry);
                            
                            // Close the modal after submission
                            modal.style.display = 'none';
                        });


                    } else {
                        console.error('Modal element not found');
                    }
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



///////////////////////////////////////////////////////////////////
///////////////////BACK TO DASHBOARD LINK///////////////////////////////
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
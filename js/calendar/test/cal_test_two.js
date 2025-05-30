// Test Print
console.log("Calendar Test Script Loaded");

// Get current month and year
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Initialize month names array
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Function to get user hours from localStorage
function getUserHours() {
    const userString = sessionStorage.getItem('currentUser') || sessionStorage.getItem('session') || null;
    const loggedUser = userString ? JSON.parse(userString) : null;
    
    if (!loggedUser) {
        console.log('No logged user found');
        return [];
    }
    
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = allUsers.findIndex(user => user.username === loggedUser.username);
    
    if (userIndex === -1) {
        console.log('User not found in local storage');
        return [];
    }
    
    return allUsers[userIndex].hours || [];
}

// Function to style calendar cells with existing entries
function styleCellsWithTimeEntries() {
    // Calling the getUserHours() and storing it in a function
    const userHours = getUserHours();
    // Querying all of the cell dates
    const cells = document.querySelectorAll('.calendar-cell');
    
    // For each cell date of the month
    cells.forEach(cell => {
        // gets the date number of each cell
        const cellDate = parseInt(cell.textContent);
        // Test print the dates
        console.log(`The CellDate: ${cellDate}`);
        if (!cellDate) return;
        
        // Create date object for this cell
        const cellDateObj = new Date(currentYear, currentMonth, cellDate);
        // Turn that cellDateObj into an English string
        const cellDateString = cellDateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        });
        
        // Boolean Check if there's an entry for this date
        const hasEntry = userHours.some(entry => {
            return entry.date === cellDateString;
        });

        // Print out the actual entry
        if (hasEntry) {
            console.log(`The Cell above hasEntry: ${hasEntry}`);
            // Add Styling HERE
            const entries = userHours.filter(entry => entry.date === cellDateString);
            // Test Print 
            console.log(entries);
            console.log('This prints the hours pertaining to the day ABOVE:');
        }
    });
}

// Function to populate time selects without duplicating options
function populateTimeSelects() {
    const selects = [
        { id: 'in_hour', max: 12, step: 1, start: 1 },
        { id: 'out_hour', max: 12, step: 1, start: 1 },
        { id: 'in_minute', max: 60, step: 5, start: 0 },
        { id: 'out_minute', max: 60, step: 5, start: 0 }
    ];
    
    selects.forEach(selectConfig => {
        const selectElement = document.getElementById(selectConfig.id);
        if (selectElement && selectElement.children.length === 0) { // Only populate if empty
            for (let i = selectConfig.start; i < selectConfig.max; i += selectConfig.step) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i < 10 ? '0' + i : i;
                selectElement.appendChild(option);
            }
        }
    });
}


// DISPLAY EXISTING ENTRY DATA IN MODAL
// Function to display existing entry data in modal
function displayExistingEntryData(selectedDate, selectedMonth, selectedYear) {
    const userHours = getUserHours();
    const selectedDateString = new Date(selectedYear, selectedMonth, selectedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    });
    
    // Find existing entry for this date
    const existingEntry = userHours.find(entry => entry.date === selectedDateString);
    
    // Get the time picker input fields
    const timePickerIn = document.getElementById('time-picker-in');
    const timePickerOut = document.getElementById('time-picker-out');
    
    // Get all the dropdown elements
    const inHourSelect = document.getElementById('in_hour');
    const inMinuteSelect = document.getElementById('in_minute');
    const outHourSelect = document.getElementById('out_hour');
    const outMinuteSelect = document.getElementById('out_minute');
    const in_ampm = document.getElementById('in_ampm');
    const out_ampm = document.getElementById('out_ampm');
    
    if (existingEntry) {
        // Hide the dropdown time pickers
        inHourSelect.style.display = 'none';
        inMinuteSelect.style.display = 'none';
        outHourSelect.style.display = 'none';
        outMinuteSelect.style.display = 'none';
        in_ampm.style.display = 'none';
        out_ampm.style.display = 'none';
        
        // Query the span elements for displaying time
        const inTimeSpan = document.getElementById('in_time_span');
        const outTimeSpan = document.getElementById('out_time_span');
        console.log(existingEntry)
        // Set the time span text content
        inTimeSpan.textContent = existingEntry.inTime || '';
        outTimeSpan.textContent = existingEntry.outTime || '';
        
        
    } else if (!existingEntry) {
        // Show the dropdown time pickers for new entries
        inHourSelect.style.display = 'block';
        inMinuteSelect.style.display = 'block';
        outHourSelect.style.display = 'block';
        outMinuteSelect.style.display = 'block';
        in_ampm.style.display = 'block';
        out_ampm.style.display = 'block';
        
        // Reset the time span text content
        const inTimeSpan = document.getElementById('in_time_span');
        const outTimeSpan = document.getElementById('out_time_span');
        inTimeSpan.textContent = '';
        outTimeSpan.textContent = '';
        // Reset the time select values
        inHourSelect.value = '';
        inMinuteSelect.value = '';
        outHourSelect.value = '';
        outMinuteSelect.value = '';
         
        console.log('No existing entry found - showing dropdown time pickers for new entry');
    }
}

// Function to render the calendar
function renderCalendar(month, year) {
    const calendarBody = document.getElementById('calendar-body');
    if (!calendarBody) {
        console.error('Calendar table body not found');
        return;
    }
    calendarBody.innerHTML = ''; // Clear previous cells

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create cells for the calendar
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            const cellIndex = i * 7 + j;

            if (i === 0 && j < firstDay) {
                cell.textContent = '';
            } else if (cellIndex - firstDay < daysInMonth) {
                const dayNumber = cellIndex - firstDay + 1;
                cell.textContent = dayNumber;
                cell.classList.add('calendar-cell');
                
                // Add event listener to each cell
                cell.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`You clicked on ${cell.textContent} ${monthNames[month]} ${year}`);
                    
                    const modal = document.getElementById('cal_modal');
                    if (modal) {
                        modal.style.display = 'block';
                        
                        // Set up modal date
                        const selectedDate = cell.textContent;
                        const now = new Date();
                        now.setDate(selectedDate);
                        now.setMonth(month);
                        now.setFullYear(year);
                        
                        const modalDate = document.getElementById('current_day');
                        if (modalDate) {
                            modalDate.value = now.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit'
                            });
                        }

                        // Enable The Submit Button on Modals
                        // first iterate through every single cell


                        // // Enable Submit Button on modal
                        // function enableSubmitButton() {
                        //     const submitButtonModal = document.getElementById('submit_employee_hours_modal');
                        //     // Query the timepickers
                        //     const inHourSelect = document.getElementById('in_hour');
                        //     const inMinuteSelect = document.getElementById('in_minute');
                        //     const outHourSelect = document.getElementById('out_hour');
                        //     const outMinuteSelect = document.getElementById('out_minute');
                        //     const in_ampm = document.getElementById('in_ampm');
                        //     const out_ampm = document.getElementById('out_ampm');

                        //     if (!submitButtonModal || !inHourSelect || !inMinuteSelect || !outHourSelect || !outMinuteSelect || !in_ampm || !out_ampm) {
                        //         console.error('One or more elements are missing');
                        //         return;
                        //     }

                        //     // add event listeners to the time pickers
                        //     inHourSelect.addEventListener('change', () => {
                        //         submitButtonModal.disabled = false;
                        //         console.log('In Hour changed');
                        //     });
                        //     inMinuteSelect.addEventListener('change', () => {
                        //         submitButton.disabled = false;
                        //     });
                        //     outHourSelect.addEventListener('change', () => {
                        //         submitButton.disabled = false;
                        //     });
                        //     outMinuteSelect.addEventListener('change', () => {
                        //         submitButton.disabled = false;
                        //     });
                        //     in_ampm.addEventListener('change', () => {
                        //         submitButton.disabled = false;
                        //     });
                        //     out_ampm.addEventListener('change', () => {
                        //         submitButton.disabled = false;
                        //     });
                        // }

                        // // Call the function to enable the submit button
                        // try {
                        //     enableSubmitButton();
                        // } catch (error) {
                        //     console.error('Error enabling submit button:', error);
                        // }

                        // call the function to populate time selects
                        try {
                            populateTimeSelects();
                        } catch (error) {
                            console.error('Error populating time selects:', error);
                        }
                        
                        // Display existing entry data if available
                        displayExistingEntryData(selectedDate, month, year);

                        // Set up user name
                        const currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('session')) || null;
                        if (currentUser) {
                            const userName = decodeURIComponent(currentUser.username);
                            const modalName = document.getElementById('employee_name_month');
                            if (modalName) {
                                modalName.textContent = `${userName}`;
                            }
                        }

                        // Set up close modal functionality
                        const closeModal = document.getElementById('close_modal');
                        if (closeModal) {
                            // Remove existing listeners to prevent duplicates
                            closeModal.replaceWith(closeModal.cloneNode(true));
                            const newCloseModal = document.getElementById('close_modal');
                            newCloseModal.addEventListener('click', function() {
                                modal.style.display = 'none';
                            });
                        }

                        // Set up form validation
                        // setupFormValidation();
                        
                        // Set up submit functionality
                        setupSubmitFunctionality(modalDate, selectedDate, month, year);

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
    
    // Style cells with existing entries after rendering
    setTimeout(() => {
        styleCellsWithTimeEntries();
        styleTodayCell();
    }, 100);
}





// Function to set up submit functionality
function setupSubmitFunctionality(modalDate, selectedDate, month, year) {
    const submitButton = document.getElementById('submit_employee_hours_modal');
    if (!submitButton) return;
    
    // Remove existing listener
    const newSubmitButton = submitButton.cloneNode(true);
    submitButton.parentNode.replaceChild(newSubmitButton, submitButton);
    // ABOVE CLONES THE BUTTON TO REMOVE ANY EXISTING LISTENERS

    // Enable Submit Button on modal
    function enableSubmitButton() {
        
        // Query the timepickers
        const inHourSelect = document.getElementById('in_hour');
        const inMinuteSelect = document.getElementById('in_minute');
        const outHourSelect = document.getElementById('out_hour');
        const outMinuteSelect = document.getElementById('out_minute');
        const in_ampm = document.getElementById('in_ampm');
        const out_ampm = document.getElementById('out_ampm');

        if (!newSubmitButton || !inHourSelect || !inMinuteSelect || !outHourSelect || !outMinuteSelect || !in_ampm || !out_ampm) {
            console.error('One or more elements are missing');
            return;
        }

        // add event listeners to the time pickers
        inHourSelect.addEventListener('change', () => {
            newSubmitButton.disabled = false;
            console.log('In Hour changed');
        });
        inMinuteSelect.addEventListener('change', () => {
            newSubmitButton.disabled = false;
        });
        outHourSelect.addEventListener('change', () => {
            newSubmitButton.disabled = false;
        });
        outMinuteSelect.addEventListener('change', () => {
            newSubmitButton.disabled = false;
        });
        in_ampm.addEventListener('change', () => {
            newSubmitButton.disabled = false;
        });
        out_ampm.addEventListener('change', () => {
            newSubmitButton.disabled = false;
        });
    }

    // Call the function to enable the submit button
    try {
        enableSubmitButton();
    } catch (error) {
        console.error('Error enabling submit button:', error);
    }
    
    // Add new listener
    document.getElementById('submit_employee_hours_modal').addEventListener('click', function() {
        const inHour = document.getElementById('in_hour').value;
        const inMinute = document.getElementById('in_minute').value;
        const outHour = document.getElementById('out_hour').value;
        const outMinute = document.getElementById('out_minute').value;
        const inAmpm = document.getElementById('in_ampm').value;
        const outAmpm = document.getElementById('out_ampm').value;
        
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('session'));
        if (!currentUser) {
            console.error('No user logged in');
            return;
        }
        
        const userName = decodeURIComponent(currentUser.username);
        const allUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = allUsers.findIndex(user => user.username === currentUser.username);
        
        if (userIndex === -1) {
            console.log('User not found in local storage');
            return;
        }
        
        const timeEntry = {
            date: modalDate.value,
            inTime: `${inHour}:${inMinute} ${inAmpm}`,
            outTime: `${outHour}:${outMinute} ${outAmpm}`,
            user: userName
        };
        
        // Check if entry already exists for this date
        const userHours = allUsers[userIndex].hours || [];
        const existingEntryIndex = userHours.findIndex(entry => entry.date === modalDate.value);
        
        if (existingEntryIndex !== -1) {
            // Update existing entry
            userHours[existingEntryIndex] = timeEntry;
            console.log('Time entry updated:', timeEntry);
        } else {
            // Add new entry
            userHours.push(timeEntry);
            console.log('Time entry submitted:', timeEntry);
        }
        
        // Update local storage
        allUsers[userIndex].hours = userHours;
        localStorage.setItem('users', JSON.stringify(allUsers));
        
        // Close modal and refresh display
        document.getElementById('cal_modal').style.display = 'none';
    });
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
    updateCalendarHeader(currentMonth, currentYear);
}

// Previous and Next buttons Functionality
function prevMonth() {
    currentMonth = currentMonth <= 0 ? 11 : currentMonth - 1;
    currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
    renderCalendar(currentMonth, currentYear);
    updateCalendarHeader(currentMonth, currentYear);
    return false;
}

function nextMonth() {
    currentMonth = currentMonth >= 11 ? 0 : currentMonth + 1;
    currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
    renderCalendar(currentMonth, currentYear);
    updateCalendarHeader(currentMonth, currentYear);
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

// Style the today's date cell
function styleTodayCell() {
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    const todayDate = today.getDate();

    if (currentMonth === todayMonth && currentYear === todayYear) {
        const cells = document.querySelectorAll('.calendar-cell');
        cells.forEach(cell => {
            cell.classList.remove('today'); // Remove existing today class
            if (parseInt(cell.textContent) === todayDate) {
                cell.classList.add('today');
            }
        });
    }
}

// Initialize calendar
renderCalendar(currentMonth, currentYear);
updateCalendarHeader(currentMonth, currentYear);

// Back to dashboard functionality
const backToDashboardLink = document.getElementById('link_back');
if (backToDashboardLink) {
    backToDashboardLink.addEventListener('click', function(event) {
        event.preventDefault();
        const userRole = sessionStorage.getItem('accountType');
        if (userRole === 'manager') {
            window.location.href = '../../html/dashboards/manager.html';
        } else {
            window.location.href = '../../html/dashboards/employee.html';
        }
    });
}
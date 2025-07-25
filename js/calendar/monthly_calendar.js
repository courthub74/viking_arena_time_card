// Test Print
console.log("Monthly Calendar JS Loaded");

// Get current month and year
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Initialize month names array
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Function to RENDER THE CALENDAR for a specific month and year
function renderCalendar(month, year) {
  // Get the table body
  const calendarBody = document.getElementById('calendar-body');
  if (!calendarBody) {
    console.error('Calendar table body not found');
    return;
  }
  
  calendarBody.innerHTML = '';
  
  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDay = new Date(year, month, 1).getDay();
  
  // Get number of days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Create calendar rows and cells
  let date = 1;
  
  // Always create exactly 6 rows for the calendar (standard calendar view)
  for (let i = 0; i < 6; i++) {
    // Create table row
    const row = document.createElement('tr');
    
    // Create cells for each day of the week
    for (let j = 0; j < 7; j++) {
      // Each day cell is created here
      const cell = document.createElement('td');
      
      /////////////// FOR HOURS MODAL /////////////////
      ////////////////////////////////////////////////
      ////////////////////////////////////////////////
      // Add class to be queryable in javascript 
      // here you will query all the cells and when each is clicked
      // the modal will open.  There you will enter date and hours worked
      // and then save it to the database
      cell.classList.add('calendar-cell');


      // The JS will query all the cells and when each is clicked
      // the modal will open.  There you will enter date and hours worked
      let eachDay = document.querySelectorAll('.calendar-cell');

      // Add data attribute to each cell for the date
      cell.setAttribute('data-date', `${date}`);
      // Add data attribute to each cell for the month
      cell.setAttribute('data-month', `${month}`);
      // Add data attribute to each cell for the year
      cell.setAttribute('data-year', `${year}`);
      // Add data attribute to each cell for the day of the week
      cell.setAttribute('data-day', `${j}`);
      
  
      // Add event listener to each cell
      // MODAL FOR EACH DAY TO POPUP
      // This will open a modal or perform an action when a cell is clicked
      eachDay.forEach(function(cell) {

        // Add click event listener to each cell
        cell.addEventListener('click', function(e) {
          e.stopPropagation(); // Prevent event bubbling
          e.preventDefault(); // Prevent default action if used in onclick
          ////////////////////////////////////////////////////////////////
          ////////////////////////////////////////////////////////////////
          // Check if this cell has an existing time entry
          const hasTimeEntry = this.getAttribute('data-has-entry') === 'true';
          const existingInTime = this.getAttribute('data-in-time');
          const existingOutTime = this.getAttribute('data-out-time');
          
          // Query the modal to open and close it
          const modal = document.getElementById('cal_modal');
          
          // Style the modal based on whether it has an entry
          if (hasTimeEntry) {
            // modal.style.backgroundColor = 'darkblue'; // Light blue for existing entries
            // Query the time picker in
            const inTimeSelect = document.getElementById('time-picker-in');
            // Query the time picker out
            const outTimeSelect = document.getElementById('time-picker-out');
            // Query the time picker AM/PM in
            const inAmPmSelect = document.getElementById('in_ampm');
            // Query the time picker AM/PM out
            const outAmPmSelect = document.getElementById('out_ampm');

            // Add the existing time values to the modal fields
            // Query the time picker element
            const timeSpanIn = document.getElementById('in_time_span');
            const timeSpanOut = document.getElementById('out_time_span');

            // Add padding to the time picker elements
            timeSpanIn.style.padding = '4px'; // Add padding to the in time picker
            timeSpanOut.style.padding = '4px'; // Add padding to the out time picker
            // eliminate cursor pointer on the time picker elements
            timeSpanIn.style.cursor = 'default'; // Remove pointer cursor from the in time picker
            timeSpanOut.style.cursor = 'default'; // Remove pointer cursor from the out time picker

            // Set the time picker values to the existing in and out times
            timeSpanIn.innerHTML = existingInTime; // Set the in time picker value
            timeSpanOut.innerHTML = existingOutTime; // Set the out time picker value

            // Set the time picker values to the existing in and out times
            inTimeSelect.value = existingInTime; // Set the in time picker value
            outTimeSelect.value = existingOutTime; // Set the out time picker value

            // Test Print
            console.log(`Cell clicked: ${cell.textContent}`);
            // Test Print for existing times
            console.log(`Existing In Time: ${existingInTime}`);
            console.log(`Existing Out Time: ${existingOutTime}`);
            
            // Query the total hours span element
            const totalHoursSpan = document.getElementById('total_hours_span');

            // Query the time picker in (hours)
            const inTimePicker = document.getElementById('in_hour');
            // Query the time picker out (hours)
            const outTimePicker = document.getElementById('out_hour');
            // Query the time picker in (minutes)
            const inMinutePicker = document.getElementById('in_minute');
            // Query the time picker out (minutes)
            const outMinutePicker = document.getElementById('out_minute');

          //  Make the time pickers dissapear
            inTimePicker.style.display = 'none'; // Hide the in time picker
            outTimePicker.style.display = 'none'; // Hide the out time picker
            inMinutePicker.style.display = 'none'; // Hide the in minute picker
            outMinutePicker.style.display = 'none'; // Hide the out minute picker
            inAmPmSelect.style.display = 'none'; // Hide the in AM/PM picker
            outAmPmSelect.style.display = 'none'; // Hide the out AM/PM picker

            // needs to work every time the modal is opened
            // Calculate total hours worked
            
            
            console.log(`Cell has existing entry: In: ${existingInTime}, Out: ${existingOutTime}`);
            

            // Pre-populate the form fields with existing data if needed
            // You can add logic here to parse and set the time values
            
          } else {
            modal.style.backgroundColor = ''; // Default styling for new entries
            console.log('Cell has no existing entry');
          }
          ////////////////////////////////////////////////////////////////
          ////////////////////////////////////////////////////////////////
          // Query the modal to open and close it
          // const modal = document.getElementById('cal_modal');
          // Populate the header with the Logged User name
          const pageHeader = document.getElementById('employee_name_month');
          console.log(`This is the Page Header: ${pageHeader.innerText}`);
          // Parse the user name
          // const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser') || sessionStorage.getItem('session'));
          const userString = sessionStorage.getItem('currentUser') || sessionStorage.getItem('session') || null;
          //Error handling for null userString
          const loggedUser = userString ? JSON.parse(userString) : null;
          // Get the user name from the logged user object
          console.log(`The Logged User: ${loggedUser.username}`);
          // Decode the user name from the logged user object
          const decodedUser = decodeURIComponent(loggedUser.username);
          pageHeader.innerHTML = `${decodedUser}`; // Populate the header with the logged user name

          //////////////////////////////////////////////////////
          // Populate the modal with the clicked date
          const cellDate = cell.textContent;
          const cellMonth = month + 1; // Add 1 to month since it's 0-indexed
          const cellYear = year;

          
          // Set The DatePicker to the clicked date
          const now = new Date(); // This goes in the top date picker
          // make now the date in the cell clicked
          now.setDate(cellDate); // Set the date to the cell clicked
          // Query the DatePicker element
          const datePicker = document.getElementById('current_day');
          // Set the value of the DatePicker to the current date in YYYY-MM-DD format
          datePicker.value = now.toISOString().split('T')[0]; // YYYY-MM-DD
          // Set the value of the DatePicker to month name
          datePicker.value = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
          });

          ///////////////////////////////////////////////////////
          // TIME PICKER

          // IN

          // Hours
          // Query the In Hour select element
          const inHourSelect = document.getElementById('in_hour');
          // Populate the In Hour select element with options from 1 to 12
          for (let i = 1; i <= 12; i++) {
            const in_option = document.createElement('option');
            in_option.value = i;
            in_option.textContent = i < 10 ? '0' + i : i; // Add leading zero for single digit hours
            inHourSelect.appendChild(in_option);
            console.log(`In Hour: ${inHourSelect.value}`);
          }

          // Minutes
          // Query the In Minute select element
          const inMinuteSelect = document.getElementById('in_minute');
          for (let i = 0; i < 60; i++) {
            const in_option = document.createElement('option');
            in_option.value = i;
            in_option.textContent = i < 10 ? '0' + i : i; // Add leading zero for single digit minutes
            // just in increments of 15 minutes
            if (i % 15 === 0) {
              in_option.value = i;
              in_option.textContent = i < 10 ? '0' + i : i; // Add leading zero for single digit minutes
              inMinuteSelect.appendChild(in_option);
            }
            console.log(`In Minute: ${inMinuteSelect.value}`);
          }


          // OUT
          // Query for the hour select element
          const outHourSelect = document.getElementById('out_hour');
          // Populate the hour select element with options from 1 to 12
          for (let i = 1; i <= 12; i++) {
            // Create an option element for each hour
            const out_option = document.createElement('option');
            // Set the value and text content of the option element
            // value is set to each iteration
            out_option.value = i;
            // textContent is set to i, and if less than 10, it adds a leading zero else just leave it as is
            out_option.textContent = i < 10 ? '0' + i : i;
            // Append the option element to the hour select element
            outHourSelect.appendChild(out_option);
            console.log(`Out Hour: ${outHourSelect.value}`);
          }
          // Minutes
          const outMinuteSelect = document.getElementById('out_minute');
          for (let i = 0; i < 60; i++) {
            const out_option = document.createElement('option');
            out_option.value = i;
            out_option.textContent = i < 10 ? '0' + i : i; // Add leading zero for single digit minutes
            // just in increments of 15 minutes
            if (i % 15 === 0) {
              out_option.value = i;
              out_option.textContent = i < 10 ? '0' + i : i; // Add leading zero for single digit minutes
              outMinuteSelect.appendChild(out_option);
            }
            console.log(`Out Minute: ${outMinuteSelect.value}`);
          }


          ///////////////////////////////////////////////////////

          const closeModal = document.getElementById('close_modal');
          // Open modal or perform action here
          console.log(`Clicked on ${cell.textContent}`);
          // Open the modal (you can use a library or custom code to show the modal)
          modal.classList.add('modal_active'); // Show the modal
          // pageHeader.classList.add('modal_active'); // Fade out the top of page
          // Test Print 
          console.log(`${modal.classList}the new class of the modal`);
          // console.log(`${pageHeader.classList} the new class of the page header`);
          // Add event listener to close the modal when clicking outside of it
          window.addEventListener('click', function(event) {
            if (event.target === modal) {
              modal.classList.remove('modal_active'); // Hide the modal
              console.log(`${modal.classList} normal class of the modal`);
            }
          });
          // Add event listener to close the modal when clicking the close button
          closeModal.addEventListener('click', function() {
            modal.classList.remove('modal_active'); // Hide the modal
            console.log(`${modal.classList} normal class of the modal`);
          });
          // Add event listener to close the modal when pressing the escape key
          document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
              // closeModal();
              modal.classList.remove('modal_active'); // Hide the modal
              console.log(`${modal.classList} normal class of the modal`);

            }
          });
        });
      });

      
      ///////////////////////////////////////////////////////
      ///////CELL CONTENT (THE DATE)
      const cellContent = document.createElement('span');

      // give it a general class to style change
      cellContent.classList.add('the_date_number');
     
      
      // Add dates starting from the correct day of the week
      if (i === 0 && j < firstDay) {
        // Empty cells before the first day of month
        cell.classList.add('empty');
      } else if (date > daysInMonth) {
        // Empty cells after the last day of month
        cell.classList.add('empty');
      } else {
        // Regular day cells
        cellContent.textContent = date;
        
        // Check if it's today
        if (date === currentDate.getDate() && 
            month === currentDate.getMonth() && 
            year === currentDate.getFullYear()) {
          cell.classList.add('today');
        }
        
        // Add click handler
        cell.addEventListener('click', function() {
          // Remove any previously selected cell
          const selectedCells = document.querySelectorAll('.selected');
          selectedCells.forEach(cell => cell.classList.remove('selected'));
          
          // Mark this cell as selected
          this.classList.add('selected');
        });
        
        date++;
      }
      // The Date appended to the cell appended to the calendar
      cell.appendChild(cellContent);
      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
  }
}



// Function to update calendar header
function updateCalendarHeader(month, year) {
  document.getElementById('current-month').textContent = `${monthNames[month]} ${year}`;
}



// SUBMIT BUTTON
// Query the submit button element
const submitButton = document.getElementById('submit_employee_hours_modal');

// Query the in hour select element
const inHourSelect = document.getElementById('in_hour');
// Query the in minute select element
const inMinuteSelect = document.getElementById('in_minute');
// Query the out hour select element
const outHourSelect = document.getElementById('out_hour');
// Query the out minute select element
const outMinuteSelect = document.getElementById('out_minute');
// Query the AM/PM select elements
const inAmPmSelect = document.getElementById('in_ampm');
const outAmPmSelect = document.getElementById('out_ampm');

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
}
);
outMinuteSelect.addEventListener('change', function() {
  // Enable the submit button when the out hour is changed
  submitButton.disabled = false;
});

// SUBMIT BUTTON FUNCTION
submitButton.addEventListener('click', function() {
  try {

    console.log('Button clicked!');
    
    // Query the in hour select element
    const inHourSelect = document.getElementById('in_hour');
    const inMinuteSelect = document.getElementById('in_minute');
    const outHourSelect = document.getElementById('out_hour');
    const outMinuteSelect = document.getElementById('out_minute');
   
    // Query the date picker element
    const datePicker = document.getElementById('current_day');
    // Get the selected values from the hour and minute select elements
    const inHour = inHourSelect.value;
    // console.log(`In Hour: ${inHour}`);
    const inMinute = inMinuteSelect.value;
    // console.log(`In Minute: ${inMinute}`);
    const outHour = outHourSelect.value;
    // console.log(`Out Hour: ${outHour}`);
    const outMinute = outMinuteSelect.value;
    // console.log(`Out Minute: ${outMinute}`);
    // Get the selected value from the AM/PM select element
    const inAmPm = document.getElementById('in_ampm').value;
    const outAmPm = document.getElementById('out_ampm').value;
    // Get the selected date from the DatePicker element
    const selectedDate = datePicker.value; // YYYY-MM-DD format
    // console.log(`Selected Date: ${selectedDate}`);

    // Perform your submit action here (e.g., send data to server)
    console.log(`In Time: ${inHour}:${inMinute} ${inAmPm}`);
    console.log(`Out Time: ${outHour}:${outMinute} ${outAmPm}`);
    console.log(`Selected Date: ${selectedDate}`);
    
    // Send data to local storage
    const userString = sessionStorage.getItem('currentUser') || sessionStorage.getItem('session') || null;
    //Error handling for null userString
    const loggedUser = userString ? JSON.parse(userString) : null;
    // Get the user name from the logged user object
    console.log(`The Logged User: ${loggedUser.username}`);
    // Decode the user name from the logged user object
    const decodedUser = decodeURIComponent(loggedUser.username);
    console.log(`The Decoded User: ${decodedUser}`);

    // Create an object to store the data
    const timeEntry = {
      date: selectedDate,
      inTime: `${inHour}:${inMinute} ${inAmPm}`,
      outTime: `${outHour}:${outMinute} ${outAmPm}`,
      user: decodedUser // Store the user name
    };

    // Get current logged-in user from session storage
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('session')) || null;
    // Test Print
    console.log(currentUser.username);
    // If No User Logged in
    if (!currentUser) {
      console.error('No user logged in');
      return;
    }
    // Get all users from local storage
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    // Test Print
    console.log(allUsers);
    // If No Users in Local Storage
    if (!allUsers) {
      console.error('No users in local storage');
      return;
    }

    // Find the logged in user by index
   const userIndex = allUsers.findIndex(user => user.username === loggedUser.username);
    // Test Print
    console.log(userIndex);
    // If user not found in local storage
    if (userIndex === -1) {
      console.error('User not found in local storage');
      return;
    }

    // If hours array doesn't exist yet for this user, create it
    if (!allUsers[userIndex].hours) {
      allUsers[userIndex].hours = [];
    }

    // Add the new hours (timeEntry) object to the users time array
    allUsers[userIndex].hours.push(timeEntry);

    // Update the local storage with the new user data
    localStorage.setItem('users', JSON.stringify(allUsers));

    // Test Print
    console.log('Updated user data:', allUsers[userIndex]);
    console.log(`Time entry added for user ${currentUser.username}:`, timeEntry);
    
    
    // Store the data in local storage under another object
    // localStorage.setItem('employeeHours', JSON.stringify(data));
    // console.log('Data stored in local storage:', data);

    // Redirect to the confirmation page
    window.location.href = '../../html/calendar/employee_day_confirm.html';
    
  } catch (error) {
    console.error('Error in click handler:', error);
  }
});


// Function to style cells with time entries
function styleCellsWithTimeEntries() {
  // Get the user data
  const userString = sessionStorage.getItem('currentUser') || sessionStorage.getItem('session') || null;
  const loggedUser = userString ? JSON.parse(userString) : null;
  
  if (!loggedUser) {
    console.log('No logged user found');
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
  
  // Iterate through the userHours array and style the cells
  userHours.forEach(function(entry) {
    const entryDate = new Date(entry.date);
    const day = entryDate.getDate();
    const month = entryDate.getMonth();
    const year = entryDate.getFullYear();
    const inTime = entry.inTime;
    const outTime = entry.outTime;
    
    if (inTime && outTime) {
      console.log(`Styling cell for date: ${day}/${month}/${year}`);
      
      // Find the specific calendar cell for this date
      const targetCell = document.querySelector(`.calendar-cell[data-date="${day}"][data-month="${month}"][data-year="${year}"]`);
      
      console.log(`Target cell found:`, targetCell);
      
      if (targetCell) {
        // Find the cellContent (date number) within this cell
        const cellContent = targetCell.querySelector('.the_date_number');
        
        if (cellContent) {
          // Add a class for easier identification
          cellContent.classList.add('filled');
          
          // Store the time data as attributes on the cell for easy access
          targetCell.setAttribute('data-has-entry', 'true');
          targetCell.setAttribute('data-in-time', inTime);
          targetCell.setAttribute('data-out-time', outTime);

          console.log(`Successfully styled cell for ${day}/${month}/${year}`);
        } else {
          console.log(`Cell content not found for ${day}/${month}/${year}`);
        }
      } else {
        console.log(`Target cell not found for ${day}/${month}/${year}`);
      }
    }
  });
}

// Modified DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
  renderCalendar(currentMonth, currentYear);
  updateCalendarHeader(currentMonth, currentYear);
  
  // Style cells with time entries AFTER the calendar is rendered
  styleCellsWithTimeEntries();
});

// Also call styleCellsWithTimeEntries after month navigation
function prevMonth() {
  currentMonth = currentMonth <= 0 ? 11 : currentMonth - 1;
  currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
  renderCalendar(currentMonth, currentYear);
  updateCalendarHeader(currentMonth, currentYear);
  
  // Re-style cells after rendering new month
  styleCellsWithTimeEntries();
  
  return false;
}

function nextMonth() {
  currentMonth = currentMonth >= 11 ? 0 : currentMonth + 1;
  currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
  renderCalendar(currentMonth, currentYear);
  updateCalendarHeader(currentMonth, currentYear);
  
  // Re-style cells after rendering new month
  styleCellsWithTimeEntries();
  
  return false;
}
///////////////////////////////////////////////////////////////////
///////////////////BACK TO DASHBOARD LINK///////////////////////////////
// Query the back to dashboard link and add an event listener to it
const backToDashboardLink = document.getElementById('link_back');

if (backToDashboardLink) {
    backToDashboardLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior

        // You have to fix hour you grab BELOW
        const userType = sessionStorage.getItem('currentUser') || sessionStorage.getItem('session') || null;
        const userTypeAcc = userType ? JSON.parse(userType) : null;
        const userRole = userTypeAcc.accountType;

        if (userRole === 'Manager') {
            // Redirect to manager dashboard
            window.location.href = '../../html/dashboards/manager.html'; // Replace with the actual URL for the manager dashboard
        } else {
            // Default redirect to the main dashboard
            window.location.href = '../../html/dashboards/employee.html'; // Replace with the actual URL for the main dashboard
        }
    });
};

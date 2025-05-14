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
      const cell = document.createElement('td');
      
      /////////////// FOR HOURS MODAL /////////////////
      ////////////////////////////////////////////////
      // Add class to be queryable in javascript 
      // here you will query all the cells and when each is clicked
      // the modal will open.  There you will enter date and hours worked
      // and then save it to the database
      cell.classList.add('calendar-cell');
      // The JS will query all the cells and when each is clicked
      // the modal will open.  There you will enter date and hours worked
      let eachDay = document.querySelectorAll('.calendar-cell');
      // Add event listener to each cell
      // This will open a modal or perform an action when a cell is clicked
      eachDay.forEach(function(cell) {
        cell.addEventListener('click', function(e) {
          e.stopPropagation(); // Prevent event bubbling
          e.preventDefault(); // Prevent default action if used in onclick
          // Query the modal to open and close it
          const modal = document.getElementById('cal_modal');
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

          // NOW put this in the date input in the modal
          // const dateInput = document.getElementById('date_input');
          // dateInput.value = `${cellYear}-${cellMonth.toString().padStart(2, '0')}-${cellDate.toString().padStart(2, '0')}`;
          // Query the close button to close the modal
          // Set current time as default
          // Make the dates match the date in the cell clicked
        
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
          // Populate In Hours
          let in_hours = now.getHours() - 7; // Get the current hour and subtract 12 to convert to 12-hour format
          const ampm = in_hours >= 12 ? 'PM' : 'AM';
          in_hours = in_hours % 12;
          in_hours = in_hours ? in_hours : 12; // Convert 0 to 12
          const inHourSelect = document.getElementById('in_hour');
          inHourSelect.value = in_hours;

          // Populate In Minutes
          const inMinuteSelect = document.getElementById('in_minute');  // Query the In Minute select element
          inMinuteSelect.value = now.getMinutes();
          // set the minutes to 00
          inMinuteSelect.value = 0; // Set the minutes to 00
          document.getElementById('in_ampm').value = ampm;
          // Populate Out Hours
          let out_hours = now.getHours();
          const out_ampm = out_hours >= 12 ? 'PM' : 'AM';
          out_hours = out_hours % 12;
          out_hours = out_hours ? out_hours : 12; // Convert 0 to 12
          const outHourSelect = document.getElementById('out_hour');
          outHourSelect.value = out_hours;
          // Test Print
          console.log("Out Hours: " + out_hours);
          // Populate Out Minutes
          const outMinuteSelect = document.getElementById('out_minute'); // Query the Out Minute select element
          outMinuteSelect.value = now.getMinutes();
          // set the minutes to 00
          outMinuteSelect.value = 0; // Set the minutes to 00
          // Test Print
          console.log("Out Minutes: " + outMinuteSelect.value);

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


          // // Get the date to populate the modal date input
          // // const dateInput = document.getElementById('date_input');
          // const dateInput = "This is a test input"; // Placeholder for the date input element
          // // Get the date from the cell clicked
          // const cellDate = cell.textContent;
          // // Get the month from the current month
          // const cellMonth = month + 1; // Add 1 to month since it's 0-indexed
          // // Get the year from the current year
          // const cellYear = year;
          // // Populate the date input with the clicked date
          // dateInput.value = `${cellYear}-${cellMonth.toString().padStart(2, '0')}-${cellDate.toString().padStart(2, '0')}`;
          // // Test Print
          // console.log(`Date input value: ${dateInput.value}`);


          // Add event listener to close the modal when clicking the save button
        //   const saveButton = document.getElementById('save_button');
        //   saveButton.addEventListener('click', function() {
        //     // Get the date and hours worked from the modal inputs
        //     const dateInput = document.getElementById('date_input');
        //     const hoursInput = document.getElementById('hours_input');  
        //     const dateValue = dateInput.value;
        //     const hoursValue = hoursInput.value;
        //     // Save the data to the database or perform an action here
        //     console.log(`Date: ${dateValue}, Hours Worked: ${hoursValue}`);
        //     // Close the modal after saving
        //     modal.classList.remove('modal_active'); // Hide the modal
        //     console.log(`${modal.classList} normal class of the modal`);
        });
      });

      

      const cellContent = document.createElement('span');
      
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
      
      cell.appendChild(cellContent);
      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
  }
    // calendarBody.appendChild(row);
  }



// Function to update calendar header
function updateCalendarHeader(month, year) {
  document.getElementById('current-month').textContent = `${monthNames[month]} ${year}`;
}

// Function to navigate to previous month
function prevMonth() {
  currentMonth = currentMonth <= 0 ? 11 : currentMonth - 1;
  currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
  renderCalendar(currentMonth, currentYear);
  updateCalendarHeader(currentMonth, currentYear);
    return false; // Prevent default action if used in onclick
}

// Function to navigate to next month
function nextMonth() {
  currentMonth = currentMonth >= 11 ? 0 : currentMonth + 1;
  currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
  renderCalendar(currentMonth, currentYear);
  updateCalendarHeader(currentMonth, currentYear);
  return false; // Prevent default action if used in onclick
}

// Initial render
document.addEventListener('DOMContentLoaded', function() {
  renderCalendar(currentMonth, currentYear);
  updateCalendarHeader(currentMonth, currentYear);
});



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

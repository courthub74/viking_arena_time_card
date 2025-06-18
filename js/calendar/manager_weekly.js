// Test Print
console.log("Weekly Calendar JS Loaded");

// Get current date and set up week tracking
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Track the current week - start with current week
let currentWeekStart = getWeekStart(currentDate);

console.log(currentMonth + 1);
console.log(currentYear);
console.log(currentDate);

// Month names array
const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Day names array
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Function to get the start of the week (Sunday) for any given date
function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

// Function to get the end of the week (Saturday) for any given date
function getWeekEnd(weekStart) {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  return weekEnd;
}

// Function to format date range for display
function formatWeekRange(weekStart) {
  const weekEnd = getWeekEnd(weekStart);
  
  // If week spans multiple months
  if (weekStart.getMonth() !== weekEnd.getMonth()) {
    // return `${monthNames[weekStart.getMonth()]} ${weekStart.getDate()} - ${monthNames[weekEnd.getMonth()]} ${weekEnd.getDate()}, ${weekEnd.getFullYear()}`;
    return `${monthNames[weekStart.getMonth()]} ${weekStart.getDate()} - ${monthNames[weekEnd.getMonth()]} ${weekEnd.getDate()}`;
  } 
  // If week is within same month
  else {
    // return `${monthNames[weekStart.getMonth()]} ${weekStart.getDate()} - ${weekEnd.getDate()}, ${weekStart.getFullYear()}`;
    return `${monthNames[weekStart.getMonth()]} ${weekStart.getDate()} - ${weekEnd.getDate()}`;
  }
}

// Function to render the weekly calendar as buttons in a column
function renderWeeklyCalendar(weekStart) {
  // Get the calendar container
  const calendarBody = document.getElementById('calendar-body');
  if (!calendarBody) {
    console.error('Calendar container not found');
    return;
  }
  
  calendarBody.innerHTML = '';
  
  // Generate 7 days starting from weekStart
  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(weekStart);
    dayDate.setDate(weekStart.getDate() + i);
    
    // Create button element for each day
    const dayButton = document.createElement('button');
    dayButton.classList.add('calendar-cell', 'week-day-button');
    
    // Add data attributes for the date
    dayButton.setAttribute('data-date', dayDate.getDate());
    dayButton.setAttribute('data-month', dayDate.getMonth());
    dayButton.setAttribute('data-year', dayDate.getFullYear());
    dayButton.setAttribute('data-day', i);
    
    // Create button content
    const buttonContent = document.createElement('div');
    buttonContent.classList.add('day-button-content');
    
    // Add day name
    const dayName = document.createElement('span');
    dayName.classList.add('day-name');
    dayName.textContent = `${dayNames[i]}\u00A0\u00A0|\u00A0\u00A0`;
    
    // Add date number
    const dateNumber = document.createElement('span');
    dateNumber.classList.add('date-number');
    dateNumber.textContent = dayDate.getDate();
    
    // Add full date
    const fullDate = document.createElement('span');
    fullDate.classList.add('full-date');
    // fullDate.textContent = `${monthNames[dayDate.getMonth()]} ${dayDate.getDate()}, ${dayDate.getFullYear()}`;
    fullDate.textContent = `${monthNames[dayDate.getMonth()]} ${dayDate.getDate()}`;
    
    // Check if it's today
    const today = new Date();
    if (dayDate.toDateString() === today.toDateString()) {
      dayButton.classList.add('today');
    }
    
    // Check if it's in a different month
    if (dayDate.getMonth() !== currentMonth) {
      dayButton.classList.add('other-month');
    }
    
    // To each Day Button
    // Add click event listener
    dayButton.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      
      // Remove previous selection
      const selectedButtons = document.querySelectorAll('.selected');
      selectedButtons.forEach(btn => btn.classList.remove('selected'));
      
      // Mark this button as selected
      this.classList.add('selected');
      
      // Your existing modal logic here
      console.log(`Clicked on `);
      
      // Add your existing modal opening code here
      // ... (your existing modal code from the original file)
      // Query the Modal
      const make_employee_schedule = document.getElementById('cal_modal');
      // make the modal appear
      make_employee_schedule.classList.add('modal_active');
      // make the logged in name show in the header
      // Get the user from session storage
      const userString = sessionStorage.getItem('currentUser') || sessionStorage.getItem('session') || null;
      // Error handling for logged user object
      const loggedUser = userString ? JSON.parse(userString) : null;
      // Test Print
      console.log(`The Logged User: ${loggedUser.username}`);
      // Decode the user name 
      const decodedUser = decodeURIComponent(loggedUser.username);
      // Query the Header
      const emp_modal_header = document.getElementById('employee_name_month');
      // Populate the header
      emp_modal_header.innerHTML = decodedUser;
      // Query the Current Date Field
      const emp_hours_current_date = document.getElementById('day_selected');
      // Get The Date of the Button
      console.log(`The Selected Date: ${dayDate.toDateString()}`);
      // Formatted Date
      const formattedDate = dayDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      // Put the current date in it
      emp_hours_current_date.innerHTML = formattedDate;

      // Let's Get the employees
      const users_for_scheduling = JSON.parse(localStorage.getItem('users')) || [];

      // Test Print 
      console.log(users_for_scheduling);

      // MAKE DROPDOWN THEN CLEAR IT

      // display the Zam Driver names in the dropdowns
      // Query the Zam Driver Dropdowns
      const driver_one_am_dropdown = document.getElementById('driver-one-am');
      // Test Print
      console.log(driver_one_am_dropdown);

      // Clear the dropdown first 
      driver_one_am_dropdown.innerHTML = '';
      // Create a blank option element
      const blank_option = document.createElement('option');
      // Set the value to blank
      blank_option.value = '';
      // Set the option selected to true
      blank_option.selected = true;
      // style the blank option
      // blank_option.classList.add('blank-option');
      blank_option.style.backgroundColor = 'black';
      // Append it to the main drop down
      driver_one_am_dropdown.appendChild(blank_option);
      
      // Only list the Zam Drivers
      // Only list the Zam Drivers
users_for_scheduling.forEach(user => {
  // Test print user - ADD THIS TO DEBUG
  console.log(`User: ${user.username}, Account Type: "${user.accountType}"`);
  
  // Decode the account type to handle URL encoding
  const decodedAccountType = decodeURIComponent(user.accountType);
  
  // More flexible comparison - handles both encoded and non-encoded versions
  const isZamboniDriver = decodedAccountType.toLowerCase() === "zamboni driver" || 
      user.accountType === "Zamboni%20Driver" ||
      user.accountType === "Zamboni Driver";

    if (!isZamboniDriver) {
      // Test Print
      console.log(`(Manager Weekly)Skipping User: ${user.username} - Account Type: "${user.accountType}" (decoded: "${decodedAccountType}")`);
      return;
    }

    // Create the Driver Option element
    const zamDriverOption = document.createElement('option');

    // Store the Zam Drivers name in a variable and decode it
    const zamDriver = decodeURIComponent(user.username);
    // Set the value and text content
    zamDriverOption.value = zamDriver;
    zamDriverOption.textContent = zamDriver; // ADD THIS LINE - you were missing textContent!
    
    // Test Print
    console.log(`Zam Driver Listed: ${zamDriver}`);
    
    // Style the Option
    // zamDriverOption.style.backgroundColor = 'var(--input-background)';
    // zamDriverOption.style.color = 'var(--text-color)';
    // zamDriverOption.style.fontSize = 'small';
    zamDriverOption.classList.add('driver-option');

    // Append to dropdown
    driver_one_am_dropdown.appendChild(zamDriverOption);
  });
      // users_for_scheduling.forEach(user => {
      //   // Test print user
      //   // console.log(user.accountType);
      //   if (user.accountType !== "Zamboni%20Driver"){
      //     // Test Print
      //     console.log(`(Manager Weekly)Skipping User: ${user.username} as they are NOT Zam Drivers.`);
      //     return;
      //   }

      //   // Create the Driver Option element
      //   const zamDriverOption = document.createElement('option');

      //   // Store the Zam Drivers name in a variable and decode it
      //   const zamDriver = decodeURIComponent(user.username);
      //   // Set the value and text content
      //   zamDriverOption.value = zamDriver;
      //    NEED TO SET THE TEXT CONTENT
      //   // Test Print
      //   console.log(`Zam Driver Listed: ${zamDriver}`);
        
      //   // Style the Option
      //   zamDriverOption.style.backgroundColor = 'var(--input-background)';
      //   zamDriverOption.style.color = 'var(--text-color)';
      //   zamDriverOption.style.fontSize = 'small';
      //   // zamDriverOption.className = 'driver-option';

      //   // Append to dropdown
      //   driver_one_am_dropdown.appendChild(zamDriverOption);
      // });

      // CLOSE MODAL BUTTON
      const closeSchedulerModal = document.getElementById('close_modal');
      // ADD EVENT LISTENER TO THE CANCEL BUTTON
      closeSchedulerModal.addEventListener('click', function(e) {
        // Prevent Resetting
        e.preventDefault();
        // Remove the showing class
        make_employee_schedule.classList.remove('modal_active');
      });
    });
    
    // Assemble button content
    buttonContent.appendChild(dayName);
    // buttonContent.appendChild(dateNumber);
    buttonContent.appendChild(fullDate);
    dayButton.appendChild(buttonContent);
    
    // Add button to calendar container
    calendarBody.appendChild(dayButton);
  }
}

// Function to update the week header display
function updateWeekHeader(weekStart) {
  const weekHeader = document.getElementById('current-week');
  if (weekHeader) {
    weekHeader.textContent = formatWeekRange(weekStart);
  }
}

// Navigation functions for the buttons
function prevWeek() {
  // Move back one week
  currentWeekStart.setDate(currentWeekStart.getDate() - 7);
  renderWeeklyCalendar(currentWeekStart);
  updateWeekHeader(currentWeekStart);
  return false;
}

function nextWeek() {
  // Move forward one week
  currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  renderWeeklyCalendar(currentWeekStart);
  updateWeekHeader(currentWeekStart);
  return false;
}

// Function to go to current week (useful to add as a button)
function goToCurrentWeek() {
  currentWeekStart = getWeekStart(new Date());
  renderWeeklyCalendar(currentWeekStart);
  updateWeekHeader(currentWeekStart);
}

// Initialize the weekly calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  renderWeeklyCalendar(currentWeekStart);
  updateWeekHeader(currentWeekStart);
});

// Back to dashboard functionality
const backToDashboardLink = document.getElementById('link_back');
if (backToDashboardLink) {
    backToDashboardLink.addEventListener('click', function(event) {
        event.preventDefault();

        // You have to fix hour you grab BELOW
        const userType = sessionStorage.getItem('currentUser') || sessionStorage.getItem('session') || null;
        const userTypeAcc = userType ? JSON.parse(userType) : null;
        const userRole = userTypeAcc.accountType;
        
        if (userRole === 'Manager') {
            window.location.href = '../../html/dashboards/manager.html';
        } else {
            window.location.href = '../../html/dashboards/employee.html';
        }
    });
}
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
    return `${monthNames[weekStart.getMonth()]} ${weekStart.getDate()} - ${monthNames[weekEnd.getMonth()]} ${weekEnd.getDate()}`;
  } 
  // If week is within same month
  else {
    return `${monthNames[weekStart.getMonth()]} ${weekStart.getDate()} - ${weekEnd.getDate()}`;
  }
}

// Move the submit listener flag outside to module level
let submitListenerAdded = false;

// Function to set up submit button listener (only once)
function setupSubmitButtonListener() {
  if (submitListenerAdded) return; // Exit if already added

  const submitScheduleButton = document.getElementById('submit_employee_hours_modal');
  if (!submitScheduleButton) return;

  submitScheduleButton.addEventListener('click', async function(e) {
    e.preventDefault();
    console.log("Submit Hours Manager Modal Pressed");

    // Get the currently selected date from the modal
    const selectedDate = document.getElementById('day_selected').dataset.selectedDate;
    if (!selectedDate) {
      console.error("No date selected");
      return;
    }

    // Query the Name and Time Fields
    const driver_one = document.getElementById('driver-one-am');
    const driver_two = document.getElementById('driver-two-am');
    const driver_three = document.getElementById('driver-one-pm');
    const driver_four = document.getElementById('driver-two-pm');
    const skate_guard_one = document.getElementById('skate-guard-one');
    const skate_guard_two = document.getElementById('skate-guard-two');

    // Need to get the values of the time pickers
    const zam_in_one = document.getElementById('zam-in-one');
    const zam_out_one = document.getElementById('zam-out-one'); 
    const zam_in_two = document.getElementById('zam-in-two');
    const zam_out_two = document.getElementById('zam-out-two'); 
    const zam_in_three = document.getElementById('zam-in-three');
    const zam_out_three = document.getElementById('zam-out-three'); 
    const zam_in_four = document.getElementById('zam-in-four');
    const zam_out_four = document.getElementById('zam-out-four');
    const skate_guard_in_one = document.getElementById('skate-guard-in-one');
    const skate_guard_out_one = document.getElementById('skate-guard-out-one');
    const skate_guard_in_two = document.getElementById('skate-guard-in-two');
    const skate_guard_out_two = document.getElementById('skate-guard-out-two');

    // Get values
    const scheduleData = {
    date: selectedDate,
    drivers: [
      {
        name: driver_one.value || 'Not Needed',
        zam_in: zam_in_one.value || '',
        zam_out: zam_out_one.value || ''
      },
      {
        name: driver_two.value || 'Not Needed',
        zam_in: zam_in_two.value || '',
        zam_out: zam_out_two.value || ''
      },
      {
        name: driver_three.value || 'Not Needed',
        zam_in: zam_in_three.value || '',
        zam_out: zam_out_three.value || ''
      },
      {
        name: driver_four.value || 'Not Needed',
        zam_in: zam_in_four.value || '',
        zam_out: zam_out_four.value || ''
      }
    ],
    skate_guards: [
      {
        name: skate_guard_one.value || 'Not Needed',
        time_in: skate_guard_in_one.value || '',
        time_out: skate_guard_out_one.value || ''
      },
      {
        name: skate_guard_two.value || 'Not Needed',
        time_in: skate_guard_in_two.value || '',
        time_out: skate_guard_out_two.value || ''
      }
    ]
  };
  

    console.log('Schedule Data:', scheduleData);

    // Store the schedule data in localStorage
    // let schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    // schedules.push(scheduleData);
    // localStorage.setItem('schedules', JSON.stringify(schedules));

    // New MongoDB code to save schedule
    try {
      const res = await fetch('/api/schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(scheduleData)
      });

      if (!res.ok) throw new Error('Failed to save schedule');

      console.log('Schedule successfully saved to MongoDB');
    } catch (err) {
      console.error('Error saving schedule:', err);
    }


    // Close the modal
    const make_employee_schedule = document.getElementById('cal_modal');
    make_employee_schedule.classList.remove('modal_active');
    
    // Remove No Scroll
    if (document.body.classList.contains('no-scroll')) {
      document.body.classList.remove('no-scroll');
    }

    // Reset form fields
    resetFormFields();

    // Refresh calendar
    renderWeeklyCalendar(currentWeekStart);
    updateWeekHeader(currentWeekStart);

    // Show success message
    const selectedDateObj = new Date(selectedDate);
    alert(`
      Driver One ${scheduleData.drivers[0].name} (AM): ${scheduleData.drivers[0].zam_in} - ${scheduleData.drivers[0].zam_out}
      Driver Two ${scheduleData.drivers[1].name} (AM): ${scheduleData.drivers[1].zam_in} - ${scheduleData.drivers[1].zam_out}
      Driver Three ${scheduleData.drivers[2].name} (PM): ${scheduleData.drivers[2].zam_in} - ${scheduleData.drivers[2].zam_out}
      Driver Four ${scheduleData.drivers[3].name} (PM): ${scheduleData.drivers[3].zam_in} - ${scheduleData.drivers[3].zam_out}
      Skate Guard 1: ${scheduleData.skate_guards[0].name} ${scheduleData.skate_guards[0].time_in ? `(${scheduleData.skate_guards[0].time_in} - ${scheduleData.skate_guards[0].time_out})` : '' }  
      Skate Guard 2: ${scheduleData.skate_guards[1].name} ${scheduleData.skate_guards[1].time_in ? `(${scheduleData.skate_guards[1].time_in} - ${scheduleData.skate_guards[1].time_out})` : '' }
      for ${selectedDateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}. Schedule saved successfully!`     
    );
  });

  submitListenerAdded = true;
}

// Function to reset form fields
function resetFormFields() {
  const selects = [
    'driver-one-am', 'driver-two-am', 'driver-one-pm', 'driver-two-pm',
    'skate-guard-one', 'skate-guard-two'
  ];
  
  selects.forEach(id => {
    const select = document.getElementById(id);
    if (select) select.value = '';
  });

  // Reset time pickers
  const timePickers = document.querySelectorAll('.time_picker_sched');
  timePickers.forEach(picker => {
    picker.selectedIndex = 0;
  });

  // Reset selected button
  const selectedButton = document.querySelector('.selected');
  if (selectedButton) {
    selectedButton.classList.remove('selected');
  }

  // Clear date field
  const emp_hours_current_date = document.getElementById('day_selected');
  if (emp_hours_current_date) {
    emp_hours_current_date.innerHTML = '';
    emp_hours_current_date.removeAttribute('data-selected-date');
  }
}

////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
// Change Here   
// Function to render the weekly calendar as buttons in a column
async function renderWeeklyCalendar(weekStart) {
  const calendarBody = document.getElementById('calendar-body');
  if (!calendarBody) {
    console.error('Calendar container not found');
    return;
  }
  
  calendarBody.innerHTML = '';

  // Fetch saved schedules from MongoDB for this week
  const weekStartISO = weekStart.toISOString().split('T')[0];
  const weekEndISO = getWeekEnd(weekStart).toISOString().split('T')[0];

  const scheduleMap = await fetch(`/api/schedules?start=${weekStartISO}&end=${weekEndISO}`)
    .then(res => res.json())
    .then(data => {
      const map = {};
      data.forEach(schedule => {
        map[schedule.date] = schedule;
      });
      return map;
    })
    .catch(err => {
      console.error('Failed to load schedules:', err);
      return {};
    });
  
  // Generate 7 days starting from weekStart
  // The buttons for each day
  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(weekStart);
    dayDate.setDate(weekStart.getDate() + i);

    const dateKey = dayDate.toISOString().split('T')[0];
    
    // Create button element for each day
    const dayButton = document.createElement('button');
    dayButton.classList.add('calendar-cell', 'week-day-button');

    // If MongoDB has a schedule for this day
    if (scheduleMap[dateKey]) {
      dayButton.classList.add('has-schedule');
      dayButton.dataset.schedule = JSON.stringify(scheduleMap[dateKey]);
    }
    
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
    
    // Add full date
    const fullDate = document.createElement('span');
    fullDate.classList.add('full-date');
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

    // Add click event listener to each day button
    dayButton.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();

      // Toggle body scroll
      document.body.classList.toggle('no-scroll');

      // Remove previous selection
      const selectedButtons = document.querySelectorAll('.selected');
      selectedButtons.forEach(btn => btn.classList.remove('selected'));
      
      // Mark this button as selected
      this.classList.add('selected');
      
      console.log(`Clicked on day: ${dayDate.toDateString()}`);
      
      // Open modal
      openScheduleModal(dayDate);
    });
    
    // Assemble button content
    buttonContent.appendChild(dayName);
    buttonContent.appendChild(fullDate);
    dayButton.appendChild(buttonContent);
    
    // Add button to calendar container
    calendarBody.appendChild(dayButton);
  }
}

// Function to open the schedule modal
function openScheduleModal(dayDate) {
  const make_employee_schedule = document.getElementById('cal_modal');
  if (!make_employee_schedule) {
    console.error('Modal not found');
    return;
  }

  make_employee_schedule.classList.add('modal_active');
  
  // Set user name in header
  const userString = sessionStorage.getItem('currentUser') || sessionStorage.getItem('session');
  if (userString) {
    const loggedUser = JSON.parse(userString);
    const decodedUser = decodeURIComponent(loggedUser.username);
    const emp_modal_header = document.getElementById('employee_name_month');
    if (emp_modal_header) {
      emp_modal_header.innerHTML = decodedUser;
    }
  }
  
  // Set selected date
  const emp_hours_current_date = document.getElementById('day_selected');
  if (emp_hours_current_date) {
    const formattedDate = dayDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    emp_hours_current_date.innerHTML = formattedDate;
    emp_hours_current_date.dataset.selectedDate = dayDate.toISOString().split('T')[0];
  }

  // Populate dropdowns
  populateDropdowns();
  
  // Setup close button
  setupCloseButton();
  
  // Setup form validation
  setupFormValidation();
}

// Function to populate all dropdowns
async function populateDropdowns() {
  // const users_for_scheduling = JSON.parse(localStorage.getItem('users')) || [];

  const users_for_scheduling = await fetch('/api/users')
  .then(res => res.json())
  .catch(err => {
    console.error('Failed to load users:', err);
    return [];
  });

  
  // Clear and populate driver dropdowns
  const driverDropdowns = [
    'driver-one-am', 'driver-two-am', 'driver-one-pm', 'driver-two-pm'
  ];
  
  driverDropdowns.forEach(id => {
    const dropdown = document.getElementById(id);
    if (dropdown) {
      clearAndAddBlankOption(dropdown);
      
      // Add zamboni drivers
      users_for_scheduling.forEach(user => {
        const decodedAccountType = decodeURIComponent(user.accountType);
        const isZamboniDriver = decodedAccountType.toLowerCase() === "zamboni driver" || 
                               user.accountType === "Zamboni%20Driver" ||
                               user.accountType === "Zamboni Driver";
        
        if (isZamboniDriver) {
          const option = document.createElement('option');
          const userName = decodeURIComponent(user.username);
          option.value = userName;
          option.textContent = userName;
          option.classList.add('driver-option');
          dropdown.appendChild(option);
        }
      });
    }
  });

  // Clear and populate skate guard dropdowns
  const skateGuardDropdowns = ['skate-guard-one', 'skate-guard-two'];
  
  skateGuardDropdowns.forEach(id => {
    const dropdown = document.getElementById(id);
    if (dropdown) {
      clearAndAddBlankOption(dropdown);
      
      // Add skate guards
      users_for_scheduling.forEach(user => {
        const decodedAccountType = decodeURIComponent(user.accountType);
        const isSkateGuard = decodedAccountType.toLowerCase() === "skate guard" ||
                            user.accountType === "Skate%20Guard" ||
                            user.accountType === "Skate Guard";
        
        if (isSkateGuard) {
          const option = document.createElement('option');
          const userName = decodeURIComponent(user.username);
          option.value = userName;
          option.textContent = userName;
          option.classList.add('driver-option');
          dropdown.appendChild(option);
        }
      });
    }
  });

  // Populate time pickers
  populateTimePickers();
}

// Helper function to clear dropdown and add blank option
function clearAndAddBlankOption(dropdown) {
  dropdown.innerHTML = '';
  const blankOption = document.createElement('option');
  blankOption.value = '';
  blankOption.selected = true;
  blankOption.style.backgroundColor = 'var(--input-background)';
  dropdown.appendChild(blankOption);
}

// Function to populate time pickers
function populateTimePickers() {
  const timePickers = [
    'zam-in-one', 'zam-out-one', 'zam-in-two', 'zam-out-two',
    'zam-in-three', 'zam-out-three', 'zam-in-four', 'zam-out-four',
    'skate-guard-in-one', 'skate-guard-out-one', 'skate-guard-in-two', 'skate-guard-out-two'
  ];
  timePickers.forEach(id => {
    const select = document.getElementById(id);
    if (select) {
      select.innerHTML = '';
     
      // Add blank option
      const blankOption = document.createElement('option');
      blankOption.value = '';
      blankOption.textContent = select.id.includes('in') ? 'In' : 'Out';
      blankOption.selected = true;
      select.appendChild(blankOption);
      
      // Generate time options (5:00 AM to 11:30 PM)
      for (let hour = 5; hour <= 23; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          addTimeOption(select, hour, minute);
        }
      }
     
      // Add "Close" option after 10:00 PM
      const closeOption = document.createElement('option');
      closeOption.value = 'close';
      closeOption.textContent = 'Close';
      select.appendChild(closeOption);
    }
  });
}

// Function to add time options to a select element
function addTimeOption(select, hour, minute) {
  let displayHour = hour;
  let ampm = 'AM';

  if (hour === 0) {
    displayHour = 12;
  } else if (hour === 12) {
    ampm = 'PM';
  } else if (hour > 12) {
    displayHour = hour - 12;
    ampm = 'PM';
  }
  
  const formattedMinute = minute.toString().padStart(2, '0');
  const timeString = `${displayHour}:${formattedMinute} ${ampm}`;

  const option = document.createElement('option');
  option.value = timeString;
  option.textContent = timeString;
  option.classList.add('time-option');
  select.appendChild(option);
}

// Function to setup close button
function setupCloseButton() {
  const closeSchedulerModal = document.getElementById('close_modal');
  if (closeSchedulerModal) {
    // Remove any existing listeners
    closeSchedulerModal.replaceWith(closeSchedulerModal.cloneNode(true));
    const newCloseButton = document.getElementById('close_modal');
    
    newCloseButton.addEventListener('click', function(e) {
      e.preventDefault();
      const make_employee_schedule = document.getElementById('cal_modal');
      make_employee_schedule.classList.remove('modal_active');
      
      if (document.body.classList.contains('no-scroll')) {
        document.body.classList.remove('no-scroll');
      }
    });
  }
}

// Function to setup form validation
// Function to setup form validation
function setupFormValidation() {
  const submitButton = document.getElementById('submit_employee_hours_modal');
  if (!submitButton) return;

  function checkEnableSubmit() {
    let hasValidEntry = false;

    // Check zamboni drivers (each needs name + in time + out time)
    const drivers = [
      { name: 'driver-one-am', in: 'zam-in-one', out: 'zam-out-one' },
      { name: 'driver-two-am', in: 'zam-in-two', out: 'zam-out-two' },
      { name: 'driver-one-pm', in: 'zam-in-three', out: 'zam-out-three' },
      { name: 'driver-two-pm', in: 'zam-in-four', out: 'zam-out-four' }
    ];

    // Check if any driver has complete entry (name + in + out)
    drivers.forEach(driver => {
      const nameSelect = document.getElementById(driver.name);
      const inSelect = document.getElementById(driver.in);
      const outSelect = document.getElementById(driver.out);
      
      if (nameSelect && inSelect && outSelect) {
        const hasName = nameSelect.value && nameSelect.value.trim() !== '';
        const hasInTime = inSelect.value && inSelect.value.trim() !== '';
        const hasOutTime = outSelect.value && outSelect.value.trim() !== '';
        
        if (hasName && hasInTime && hasOutTime) {
          hasValidEntry = true;
        }
      }
    });

    // Check skate guards (each needs name + in time + out time)
    const skateGuards = [
      { name: 'skate-guard-one', in: 'skate-guard-in-one', out: 'skate-guard-out-one' },
      { name: 'skate-guard-two', in: 'skate-guard-in-two', out: 'skate-guard-out-two' }
    ];

    // Check if any skate guard has complete entry (name + in + out)
    skateGuards.forEach(guard => {
      const nameSelect = document.getElementById(guard.name);
      const inSelect = document.getElementById(guard.in);
      const outSelect = document.getElementById(guard.out);
      
      if (nameSelect && inSelect && outSelect) {
        const hasName = nameSelect.value && nameSelect.value.trim() !== '';
        const hasInTime = inSelect.value && inSelect.value.trim() !== '';
        const hasOutTime = outSelect.value && outSelect.value.trim() !== '';
        
        if (hasName && hasInTime && hasOutTime) {
          hasValidEntry = true;
        }
      }
    });

    // Enable submit button if at least one complete entry exists
    submitButton.disabled = !hasValidEntry;
  }

  // Add event listeners to all form elements (names and times)
  const allSelects = document.querySelectorAll('.name_picker_sched, .time_picker_sched');
  allSelects.forEach(select => {
    select.addEventListener('change', checkEnableSubmit);
  });

  // Initially disable submit button
  submitButton.disabled = true;
}

// Function to setup form validation
// function setupFormValidation() {
//   const submitButton = document.getElementById('submit_employee_hours_modal');
//   if (!submitButton) return;

//   function checkEnableSubmit() {
//     let hasValidEntry = false;

//     // Check zamboni drivers (each needs name + in time + out time)
//     const drivers = [
//       { name: 'driver-one-am', in: 'zam-in-one', out: 'zam-out-one' },
//       { name: 'driver-two-am', in: 'zam-in-two', out: 'zam-out-two' },
//       { name: 'driver-one-pm', in: 'zam-in-three', out: 'zam-out-three' },
//       { name: 'driver-two-pm', in: 'zam-in-four', out: 'zam-out-four' }
//     ];

//     // Check if any driver has complete entry
//     drivers.forEach(driver => {
//       const nameSelect = document.getElementById(driver.name);
//       const inSelect = document.getElementById(driver.in);
//       const outSelect = document.getElementById(driver.out);
      
//       if (nameSelect && inSelect && outSelect) {
//         const hasName = nameSelect.value && nameSelect.value.trim() !== '';
//         const hasInTime = inSelect.value && inSelect.value.trim() !== '';
//         const hasOutTime = outSelect.value && outSelect.value.trim() !== '';
        
//         if (hasName && hasInTime && hasOutTime) {
//           hasValidEntry = true;
//         }
//       }
//     });

//     // Check skate guards (each needs name + in time + out time)
//     const skateGuards = [
//       { name: 'skate-guard-one', in: 'skate-guard-in-one', out: 'skate-guard-out-one' },
//       { name: 'skate-guard-two', in: 'skate-guard-in-two', out: 'skate-guard-out-two' }
//     ];

//     // Check if any skate guard has complete entry
//     skateGuards.forEach(guard => {
//       const nameSelect = document.getElementById(guard.name);
//       const inSelect = document.getElementById(guard.in);
//       const outSelect = document.getElementById(guard.out);
      
//       if (nameSelect && inSelect && outSelect) {
//         const hasName = nameSelect.value && nameSelect.value.trim() !== '';
//         const hasInTime = inSelect.value && inSelect.value.trim() !== '';
//         const hasOutTime = outSelect.value && outSelect.value.trim() !== '';
        
//         if (hasName && hasInTime && hasOutTime) {
//           hasValidEntry = true;
//         }
//       }
//     });

//     // Enable submit button if at least one complete entry exists
//     submitButton.disabled = !hasValidEntry;
//   }

//   // Add event listeners to all form elements
//   const allSelects = document.querySelectorAll('.name_picker_sched, .time_picker_sched');
//   allSelects.forEach(select => {
//     select.addEventListener('change', checkEnableSubmit);
//   });

//   // Initially disable submit button
//   submitButton.disabled = true;
// }

// Function to update the week header display
function updateWeekHeader(weekStart) {
  const weekHeader = document.getElementById('current-week');
  if (weekHeader) {
    weekHeader.textContent = formatWeekRange(weekStart);
  }
}

// Navigation functions
function prevWeek() {
  currentWeekStart.setDate(currentWeekStart.getDate() - 7);
  renderWeeklyCalendar(currentWeekStart);
  updateWeekHeader(currentWeekStart);
  return false;
}

function nextWeek() {
  currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  renderWeeklyCalendar(currentWeekStart);
  updateWeekHeader(currentWeekStart);
  return false;
}

function goToCurrentWeek() {
  currentWeekStart = getWeekStart(new Date());
  renderWeeklyCalendar(currentWeekStart);
  updateWeekHeader(currentWeekStart);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  renderWeeklyCalendar(currentWeekStart);
  updateWeekHeader(currentWeekStart);
  setupSubmitButtonListener(); // Set up submit listener once
});



// Back to dashboard functionality
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


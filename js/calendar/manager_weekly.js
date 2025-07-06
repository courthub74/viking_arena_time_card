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
    
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    // THE WHOLE DAY
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////

    // If the body contains no-scroll remove
    // Query the body
    const page_body = document.querySelector('body');
    // Test print
    console.log(page_body);

    // To each Day Button
    // Add click event listener
    dayButton.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();

      // Freeze the Body
       // Toggle the no-scroll class
      if (document.body.classList.contains('no-scroll')) {
          document.body.classList.remove('no-scroll');
      } else {
          document.body.classList.add('no-scroll');
      }

      // Remove previous selection
      const selectedButtons = document.querySelectorAll('.selected');
      selectedButtons.forEach(btn => btn.classList.remove('selected'));
      
      // Mark this button as selected
      this.classList.add('selected');
      
      // Your existing modal logic here
      console.log(`Clicked on a day of the week`);
      
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

      /////////////////////////////////////////////////
      /////////////////////////////////////////////////
      /////////////////////////////////////////////////
      /////////////////////////////////////////////////
      // ZAM DRIVER DROPDOWNS 
      /////////////////////////////////////////////////
      /////////////////////////////////////////////////

      // display the Zam Driver names in the dropdowns
      // Query the Zam Driver Dropdowns
      //////////////////////// ZAM DRIVER ONE ////////////////////////////////
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
      blank_option.style.backgroundColor = 'var(--input-background)';
      // Append it to the main drop down
      driver_one_am_dropdown.appendChild(blank_option);

      //////////////////////// ZAM DRIVER TWO ////////////////////////////////
      const driver_two_am_dropdown = document.getElementById('driver-two-am');
      // Test Print
      console.log(driver_two_am_dropdown);
      // Clear the dropdown 
      driver_two_am_dropdown.innerHTML = '';
      // Create a blank option element
      const blank_option_two = document.createElement('option');
      // Set the value of the option to blank
      blank_option_two.value = '';
      // Set the option selected to true
      blank_option_two.selected = true;
      // Style the blank option
      blank_option_two.style.backgroundColor = 'var(--input-background)';
      // Append it to the main drop down
      driver_two_am_dropdown.appendChild(blank_option_two);


      //////////////////////// ZAM DRIVER THREE ///////////////////////////////
      const driver_three_am_dropdown = document.getElementById('driver-one-pm');
      // Test Print
      console.log(driver_three_am_dropdown);
      // Clear the dropdown
      driver_three_am_dropdown.innerHTML = '';
      // Create a blank option element
      const blank_option_three = document.createElement('option');
      // Set the value of the option to blank
      blank_option_three.value = '';
      // Set the option selected to true
      blank_option_three.selected = true;
      // Style the blank option
      blank_option_three.style.backgroundColor = 'var(--input-background)';
      // Append it to the main drop down
      driver_three_am_dropdown.appendChild(blank_option_three);


      //////////////////////// ZAM DRIVER FOUR ///////////////////////////////
      const driver_four_am_dropdown = document.getElementById('driver-two-pm');
      // Test Print
      console.log(driver_four_am_dropdown);
      // Clear the dropdown
      driver_four_am_dropdown.innerHTML = '';
      // Create a blank option element
      const blank_option_four = document.createElement('option');
      // Set the value of the option to blank
      blank_option_four.value = '';
      // Set the option selected to true
      blank_option_four.selected = true;
      // Style the blank option
      blank_option_four.style.backgroundColor = 'var(--input-background)';
      // Append it to the main drop down
      driver_four_am_dropdown.appendChild(blank_option_four);


      /////////////////////////// SKATE GUARD DROPDOWNS ////////////////////////

      ////////////////// Skate Guard One ///////////////////////////
      const skate_guard_one_dropdown = document.getElementById('skate-guard-one');
      // Test Print
      console.log(skate_guard_one_dropdown);
      // Clear the dropdown
      skate_guard_one_dropdown.innerHTML = '';
      // Create a blank option element
      const blank_option_five = document.createElement('option');
      // Set the value of the option to blank
      blank_option_five.value = '';
      // Set the option selected to true
      blank_option_five.selected = true;
      // Style the blank option
      blank_option_five.style.backgroundColor = 'var(--input-background)';
      // Append it to the main drop down
      skate_guard_one_dropdown.appendChild(blank_option_five);

      ////////////////// Skate Guard Two /////////////////////////////
      const skate_guard_two_dropdown = document.getElementById('skate-guard-two');
      // Test Print
      console.log(skate_guard_two_dropdown);
      // Create a blank option element
      skate_guard_two_dropdown.innerHTML = '';
      // Create a blank option element
      const blank_option_six = document.createElement('option');
      // Set the value of the option to blank
      blank_option_six.value = '';
      // Set the option selected to true
      blank_option_six.selected = true;
      // Style the blank option
      blank_option_six.style.backgroundColor = 'var(--input-background)';
      // Append it to the main drop down
      skate_guard_two_dropdown.appendChild(blank_option_six);


      //////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////
      // ZAM DRIVERS FUNCTION
      users_for_scheduling.forEach(user => {
        // Test print user - ADD THIS TO DEBUG
        console.log(`User: ${user.username}, Account Type: "${user.accountType}"`);
        
        // Decode the account type to handle URL encoding
        const decodedAccountType = decodeURIComponent(user.accountType);
        
        // More flexible comparison - handles both encoded and non-encoded versions

        // For Zam Drivers
        const isZamboniDriver = decodedAccountType.toLowerCase() === "zamboni driver" || 
            user.accountType === "Zamboni%20Driver" ||
            user.accountType === "Zamboni Driver";

          if (!isZamboniDriver) {
            // Test Print
            console.log(`(Manager Weekly)Skipping User: ${user.username} - Account Type: "${user.accountType}" (decoded: "${decodedAccountType}")`);
            return;
          }
          ////////////////// ZAM DRIVER OPTION ELEMENTS/////////////////////////
        
          ///////////OPTION ELEMENT FOR DRIVER ONE///////////////

          // Create the Driver Option element
          const zamDriverOption = document.createElement('option');

          // Store the Zam Drivers name in a variable and decode it
          const zamDriver = decodeURIComponent(user.username);
          // Set the value and text content
          zamDriverOption.value = zamDriver;
          // Set the Text content of the option
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

          ///////////OPTION ELEMENT FOR DRIVER TWO////////////////////
          const zamDriverTwoOption = document.createElement('option');

          // Store the Zam Drivers name in a variable and decode it
          const zamDriverTwo = decodeURIComponent(user.username);

          // Set the value and text content
          zamDriverTwoOption.value = zamDriverTwo;

          // Set the Text content of the option
          zamDriverTwoOption.textContent = zamDriverTwo;

          // Test Print
          console.log(`Zam Driver Listed for 2nd Drop: ${zamDriverTwo}`);

          //Style the option 
          zamDriverTwoOption.classList.add('driver-option');

          // Append to dropdown
          driver_two_am_dropdown.appendChild(zamDriverTwoOption);

          ////////////////OPTION ELEMENT FOR DRIVER THREE////////////////
          const zamDriverThreeOption = document.createElement('option');

          // Store the Zam Drivers name in a variable and decode it
          const zamDriverThree = decodeURIComponent(user.username);

          // Set the value and text content
          zamDriverThreeOption.value = zamDriverThree;

          // Set the Text content to the value
          zamDriverThreeOption.textContent = zamDriverThree;

          // Test Print
          console.log(`Zam Driver 3 Listed: ${zamDriverThree}`);

          // Style the Option
          zamDriverThreeOption.classList.add('driver-option');
          // Append to dropdown
          driver_three_am_dropdown.appendChild(zamDriverThreeOption);


          ////////////////OPTION ELEMENT FOR DRIVER FOUR////////////////
          const zamDriverFourOption = document.createElement('option');

          // Store the Zam Drivers name in a variable and decode it
          const zamDriverFour = decodeURIComponent(user.username);

          // Set the value and text content
          zamDriverFourOption.value = zamDriverFour;

          // Set the Text content to the value
          zamDriverFourOption.textContent = zamDriverFour;

          // Test Print
          console.log(`Zam Driver 4 Listed: ${zamDriverFour}`);

          // Style the Option
          zamDriverFourOption.classList.add('driver-option');
          // Append to dropdown
          driver_four_am_dropdown.appendChild(zamDriverFourOption);
        });

        // For Each function for the Skate Guards
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        // SKATE GUARDS FUNCTION
        users_for_scheduling.forEach(skate_guard => {
           // Test print user - ADD THIS TO DEBUG
          console.log(`Skate Guard: ${skate_guard.username}, Account Type: "${skate_guard.accountType}"`);
          
          // Decode the account type to handle URL encoding
          const decodedAccountType = decodeURIComponent(skate_guard.accountType);
            // Get only the skate guards
            const isSkateGuard = decodedAccountType.toLowerCase() === "skate guard" ||
              skate_guard.accountType === "Skate%20Guard" ||
              skate_guard.accountType === "Skate Guard";

              // Filter out only the skate guards
              if (!isSkateGuard) {
                // Test Print
                console.log(`(Manager Weekly)Skipping User: ${skate_guard.username} - Account Type: ${skate_guard.accountType}`);
                return;
              }

              /////////////////// SKATE GUARD OPTION ELEMENTS //////////////////////

              /////////////////////Skate Guard Option One//////////////////////////
              const skateGuardOptionOne = document.createElement('option');

              // Store the Skate Guard name in a variable and decode it
              const skateGuardOne = decodeURIComponent(skate_guard.username);

              // Set the value and text content
              skateGuardOptionOne.value = skateGuardOne;

              // Set the Text content of the option
              skateGuardOptionOne.textContent = skateGuardOne;

              // Test Print
              console.log(`Skate Guard Listed: ${skateGuardOne}`);

              // Style the Option
              skateGuardOptionOne.classList.add('driver-option');

              // Append option to dropdown
              skate_guard_one_dropdown.appendChild(skateGuardOptionOne);

              //////////////////////Skate Guard Option Two//////////////////////////
              const skateGuardOptionTwo = document.createElement('option');

              // Store the Skate Guard name in a variable and decode it
              const skateGuardTwo = decodeURIComponent(skate_guard.username);

              // Set the value of the option
              skateGuardOptionTwo.value = skateGuardTwo;

              // Set the Text content of the option
              skateGuardOptionTwo.text = skateGuardTwo;

              // Test Print
              console.log(`Skate Guard Listed: ${skateGuardTwo}`);

              // Style the Option
              skateGuardOptionTwo.classList.add('driver-option');

              // Append option to dropdown
              skate_guard_two_dropdown.appendChild(skateGuardOptionTwo);
        });

        // FOR TIME PICKERS 

        // Function for Populating Time Pickers
        // Inside the function:
              // Query the Time Picker Inputs
        function populateTimePickers() {
          // Place Time Pickers in a an array
          const timePickers = [
            // Zam Driver One
            document.getElementById('zam-in-one'),
            document.getElementById('zam-out-one'),
            // Zam Driver Two
            document.getElementById('zam-in-two'),
            document.getElementById('zam-out-two'),
            // Zam Driver Three
            document.getElementById('zam-in-three'),
            document.getElementById('zam-out-three'),
            // Zam Driver Four
            document.getElementById('zam-in-four'),
            document.getElementById('zam-out-four'),
            // Skate Guard One
            document.getElementById('skate-guard-in-one'),
            document.getElementById('skate-guard-out-one'),
            // Skate Guard Two
            document.getElementById('skate-guard-in-two'),
            document.getElementById('skate-guard-out-two'),
          ];

          // Clear existing options in the time pickers
          timePickers.forEach(select => {
            // Test Print
            // console.log(timePickers)
            if (select) {
              select.innerHTML = '';
              // Test Print
              console.log(`Cleared options for: ${select.id}`);
              // Add a blank option at the top
              const blankOption = document.createElement('option');
              blankOption.value = ''; 
              // blankOption.textContent = 'In';
              // Another forEach to determine and in or out
              
              // if the id contains 'in' then set the text to 'In'
              if (select.id.includes('in')) {
                blankOption.textContent = 'In'; // Set text to 'In'
              } else if (select.id.includes('out')) {
                blankOption.textContent = 'Out'; // Set text to 'Out'
              } else {
                blankOption.textContent = 'Select Time'; // Default text
              }
              
             
              blankOption.selected = true; // Make it selected by default
              // Append the blank option to the select element
              select.appendChild(blankOption);

              // Generate times from 5:00 AM to 3:00 PM (30 min increments)
              for (let hour = 5; hour <= 15; hour++) {
                for (let minute = 0; minute < 60; minute += 30) {
                  addTimeOption(select, hour, minute);
                }
              }

              // Generate times from 2:00 PM to 3:00 AM next day (30 min increments)
              for (let hour = 14; hour <= 23; hour++) {
                for (let minute = 0; minute < 60; minute += 30) {
                  addTimeOption(select, hour, minute);
                }
              }
              // Continue from 12:00 AM to 3:00 AM next day
              for (let hour = 0; hour <= 3; hour++) {
                for (let minute = 0; minute < 60; minute += 30) {
                  addTimeOption(select, hour, minute);
                }
              }

              // // Generate the times from 5:00 AM to 11:45 PM
              // for (let hour = 5; hour <= 23; hour++) {
              //   for (let minute = 0; minute < 60; minute += 15) {
              //     addTimeOption(select, hour, minute);
              //   }
              // }

              // // Generate times from 12:00 AM to 3:45 AM next day
              // for (let hour = 0; hour <= 3; hour++) {
              //   for (let minute = 0; minute < 60; minute += 15) {
              //     addTimeOption(select, hour, minute);
              //   }
              // }
            }
          });
       }

        // Function to add time options to a select element
        function addTimeOption(select, hour, minute) {
          // Convert hour to 12-hour format
          let displayHour = hour;
          let ampm = 'AM';

          if (hour === 0) {
            displayHour = 12; // Midnight
          } else if (hour === 12) {
            ampm = 'PM'; // Noon
          } else if (hour > 12) {
            displayHour = hour - 12; // Convert to 12-hour format
            ampm = 'PM'; // PM for hours after noon
          }
          
      // Format minutes with leading zero if needed
      const formattedMinute = minute.toString().padStart(2, '0');

      // Create the time string
      const timeString = `${displayHour}:${formattedMinute} ${ampm}`;

      // Create a new option element
      const option = document.createElement('option');
      // Maybe here can empty the text on the time picker

      option.value = timeString;
      // Set the text content of the option
      option.textContent = timeString;
      option.classList.add('time-option');
      
      select.appendChild(option);
    }

    // In your day button click event listener, add this line after populating the dropdowns:
    // RIGHT AFTER THE SKATE GUARDS FOREACH LOOP, ADD:

    // Populate time pickers when modal opens
    populateTimePickers();

    // Test Print
    console.log('Time pickers populated');

    //////////////////////////////////////////////////////////////////////////////////////////////
    
    // CLOSE MODAL BUTTON
    const closeSchedulerModal = document.getElementById('close_modal');
    // ADD EVENT LISTENER TO THE CANCEL BUTTON
    closeSchedulerModal.addEventListener('click', function(e) {
      // Prevent Resetting
      e.preventDefault();
      // Remove the showing class
      make_employee_schedule.classList.remove('modal_active');
      // Remove No Scroll
      if (document.body.classList.contains('no-scroll')) {
        document.body.classList.remove('no-scroll');
      }
    });

    //////////////////////////////////////////////////////////////////////////////////////////////
    // SUBMIT SCHEDULE BUTTON

    // ...existing code...

    // Query all of the name selects
    const name_selects_manager_modal = document.querySelectorAll('.name_picker_sched');
    // Query all of the time selects
    const time_selects_manager_modal = document.querySelectorAll('.time_picker_sched');
    // Query the Submit Button
    const submitScheduleButton = document.getElementById('submit_employee_hours_modal');

    // Function to check if all selects have a value
    function checkEnableSubmit() {
        const anyNamesSelected = Array.from(name_selects_manager_modal).some(sel => sel.value && sel.value.trim() !== '');
        const anyTimesSelected = Array.from(time_selects_manager_modal).some(sel => sel.value && sel.value.trim() !== '');
        submitScheduleButton.disabled = !(anyNamesSelected && anyTimesSelected);
    }

    // Add event listeners to each name select element
    name_selects_manager_modal.forEach(function(select) {
        select.addEventListener('change', function() {
            console.log("Name Selected");
            checkEnableSubmit();
        });
    });

    // Add event listeners to each time select element
    time_selects_manager_modal.forEach(function(select) {
        select.addEventListener('change', function() {
            console.log("Time Selected");
            checkEnableSubmit();
        });
    });

    // Initially disable the submit button
    submitScheduleButton.disabled = true;

  // ...existing code...

    // Enable the Submit Button if both of the above are executed

    // ADD a CLICK EVENT LISTENER TO THE SUBMIT BUTTON
    submitScheduleButton.addEventListener('click', function(e) {
      // Prevent Default Form Submission
      e.preventDefault();
      // Test Print
      console.log("Submit Hours Manager Modal Pressed");

      // Query the Name and Time Fields
      const driver_one = document.getElementById('driver-one-am');
      const driver_two = document.getElementById('driver-two-am');
      const driver_three = document.getElementById('driver-one-pm');
      const driver_four = document.getElementById('driver-two-pm');
      const skate_guard_one = document.getElementById('skate-guard-one');
      const skate_guard_two = document.getElementById('skate-guard-two');
      // retrieve the value selected

      // Driver One
      const driver_one_value = driver_one.value;
      // Driver Two
      const driver_two_value = driver_two.value;
      // Driver Three
      const driver_three_value = driver_three.value;
      // Driver Four
      const driver_four_value = driver_four.value;
      // Skate Guard One
      const skate_guard_one_value = skate_guard_one.value;
      // Skate Guard Two
      const skate_guard_two_value = skate_guard_two.value;

      // store all of the values in an object
      const scheduleData = {
        date: dayDate.toISOString().split('T')[0], // Store the date in YYYY-MM-DD format
        driver_one: driver_one_value,
        driver_two: driver_two_value,
        driver_three: driver_three_value,
        driver_four: driver_four_value,
        skate_guard_one: skate_guard_one_value,
        skate_guard_two: skate_guard_two_value
      };

      // if there is no driver one selected, then return text saying Not needed
      if (!driver_one_value) {
        scheduleData.driver_one = 'Not Needed';
      }
      // if there is no driver two selected, then return text saying Not needed
      if (!driver_two_value) {
        scheduleData.driver_two = 'Not Needed';
      }
      // if there is no driver three selected, then return text saying Not needed
      if (!driver_three_value) {
        scheduleData.driver_three = 'Not Needed';
      }
      // if there is no driver four selected, then return text saying Not needed
      if (!driver_four_value) {
        scheduleData.driver_four = 'Not Needed';
      }
      // if there is no skate guard one selected, then return text saying Not needed
      if (!skate_guard_one_value) {
        scheduleData.skate_guard_one = 'Not Needed';
      }
      // if there is no skate guard two selected, then return text saying Not needed
      if (!skate_guard_two_value) {
        scheduleData.skate_guard_two = 'Not Needed';
      }

      // Test Print
      // console.log(`Driver Info: ${scheduleData.driver_one}, ${scheduleData.driver_two}, ${scheduleData.driver_three}, ${scheduleData.driver_four}`);
      console.log(`Driver One Selected: ${scheduleData.driver_one}`);
      console.log(`Driver Two Selected: ${scheduleData.driver_two}`);
      console.log(`Driver Three Selected: ${scheduleData.driver_three}`);
      console.log(`Driver Four Selected: ${scheduleData.driver_four}`);
      console.log(`Skate Guard One Selected: ${scheduleData.skate_guard_one}`);
      console.log(`Skate Guard Two Selected: ${scheduleData.skate_guard_two}`);

      // Store the schedule data in localStorage
      let schedules = JSON.parse(localStorage.getItem('schedules')) || [];
      // Add the new schedule data to the array
      schedules.push(scheduleData);
      // Save the updated schedules back to localStorage
      localStorage.setItem('schedules', JSON.stringify(schedules));
      // Test Print
      console.log('Schedule data saved to localStorage:', scheduleData);
      // Close the modal after submission
      make_employee_schedule.classList.remove('modal_active');
      // Remove No Scroll
      if (document.body.classList.contains('no-scroll')) {
        document.body.classList.remove('no-scroll');
      }
      // Reset the form fields
      driver_one.value = '';
      driver_two.value = '';
      driver_three.value = '';
      driver_four.value = '';
      skate_guard_one.value = '';
      skate_guard_two.value = '';
      // Reset the time pickers
      const timePickers = document.querySelectorAll('.time_picker_sched');
      timePickers.forEach(picker => {
        picker.selectedIndex = 0; // Reset to the first option (blank)
      });
      // Reset the selected button
      const selectedButton = document.querySelector('.selected');
      if (selectedButton) {
        selectedButton.classList.remove('selected');
      }
      // Reset the current date field
      const emp_hours_current_date = document.getElementById('day_selected');
      if (emp_hours_current_date) {
        emp_hours_current_date.innerHTML = ''; // Clear the date field
      }
      // Optionally, you can refresh the calendar to show the updated schedule
      renderWeeklyCalendar(currentWeekStart);
      updateWeekHeader(currentWeekStart);
      // Show a success message or alert
      alert(
        `Driver One: ${scheduleData.driver_one}` +
        `\nDriver Two: ${scheduleData.driver_two}` +
        `\nDriver Three: ${scheduleData.driver_three}` +
        `\nDriver Four: ${scheduleData.driver_four}` +
        `\nSkate Guard One: ${scheduleData.skate_guard_one}` +
        `\nSkate Guard Two: ${scheduleData.skate_guard_two}` +
        `\n\nSchedule for ${dayDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} has been saved!`
      );
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
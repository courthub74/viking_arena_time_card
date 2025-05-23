// Test print the page
console.log("Employee Day.js loaded");

// Query the submit button
const submit_button_employee_hours = document.getElementById('submit_employee_hours');

// Submit Button Event
submit_button_employee_hours.addEventListener('click', (e) => {

    // prevent default
    e.preventDefault();

    // Test Print
    console.log("Submit Button pressed");

    // Query the current Date
    const current_date = document.getElementById('current_day');

    // Set the value in a variable
    let the_day = current_date.value 

    // Test Print
    console.log(the_day);

    ///////////////////////////////////////////////////////////

    // Query the TIME IN 

    // Hour
    const time_in_hour = document.getElementById('in_hour');

    // Test Print
    // console.log(time_in_hour.value);

    // Minute 
    const time_in_minute = document.getElementById('in_minute');

    // Test Print
    // console.log(time_in_minute.value);

    // AM / PM
    const time_in_period = document.getElementById('in_ampm');

    // Test Print
    // console.log(time_in_period.value);

    // Concatenate the values
    let time_in_whole = `${time_in_hour.value} ${time_in_minute.value} ${time_in_period.value}`

    console.log(`The Time In (employee_day.js): ${time_in_whole}`);
    ////////////////////////////////////////////////////////////////

    // Query the TIME OUT 

    // Hour
    const time_out_hour = document.getElementById('out_hour');

    // Test Print
    // console.log(time_out_hour.value);

    // Minute 
    const time_out_minute = document.getElementById('out_minute');

    // Test Print
    // console.log(time_out_minute.value);

    // AM / PM
    const time_out_period = document.getElementById('out_ampm');

    // Test Print
    // console.log(time_out_period.value);

    // Concatenate the values
    let time_out_whole = `${time_out_hour.value} ${time_out_minute.value} ${time_out_period.value}`

    // Test Print the concatenation
    console.log(`The Time Out (employee_day.js): ${time_out_whole}`);
    ////////////////////////////////////////////////////////////////

    // Get current logged-in user from session storage
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('session')) || null;

    // Decode the current username and store it in a variable
    // const currentUsername = currentUser ? currentUser.username : null;
    let currentUsername = decodeURIComponent(currentUser.username);
    // Test print
    console.log("Current User:", currentUsername);
    

    // If No User Logged in
    if (!currentUser) {
        alert('No user is currently logged in. Please log in first.');
        return;
    }

    // Get all users from localStorage (by creating a new variable)
        // This is for the comparison to find the currentUser amongst all users 
            // To push the hours
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Test print 
    console.log(allUsers);

    

    // Create an entry object with the time information
    /////////////////////////////////////
    /////////////////////////////////////
    /////////////////////////////////////
    /////////////////////////////////////
    // const timeEntry = {
    //     date: the_day,
    //     timeIn: time_in_whole,
    //     timeOut: time_out_whole
    // };
    const timeEntry = {
        date: the_day,
        inTime: time_in_whole,
        outTime: time_out_whole,
        user: currentUser.username,
    };
    /////////////////////////////////////
    /////////////////////////////////////
    /////////////////////////////////////
    /////////////////////////////////////
    /////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////////

    // Iterate through all users

    // compare current user to all users

    // if one of all users matches the current

    // push the time in and time out to the current users JSON in the localStorage

    ///////////////////////////////////////////////////////////////////////////////////////////

    // Testers

    console.log("Current user object:", currentUser);
    // Problem is here
        // SOLVED I didn't parse through the session get item
    console.log("Current user's username:", currentUser.username);
    console.log("All users:", allUsers);
    console.log("All usernames:", allUsers.map(user => user.username));

    ///////////////////////////////////////////////////////////////////////////////////////////


    // // Find the logged-in user in the users array by username
    const userIndex = allUsers.findIndex(user => user.username === currentUser.username);

    // // Test print
    console.log(userIndex);

    // // If user is not there, alert us
    if (userIndex === -1) {
        alert('User not found in database');
        return;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////

    // If hours array doesn't exist yet for this user, create it
    if (!allUsers[userIndex].hours) {
        allUsers[userIndex].hours = [];
    }

    // Add the new hours entry to the user's time array
    allUsers[userIndex].hours.push(timeEntry);

    // Save it back to localStorage
    localStorage.setItem('users', JSON.stringify(allUsers));
    
    // Test print 
    console.log(`Time in for ${currentUser.username} is ${currentUser.time_in_hour} :${currentUser.time_in_minute}`);

    // Redirect to Time Confirmation page
    window.location.href = '../../html/calendar/employee_day_confirm.html'
});



// Register users in local storage
// This is a simple implementation for a database
// We also retrieve the user data from the local storage
// We connect to the registration page and save the user data

function registerUser(username, pin) { 
    // Get the users from the local storage or initialize an empty array
    var users = JSON.parse(localStorage.getItem('users')) || [];

    // Create new user object
    const newUser = {
        id: Date.now(), // Simple unique id
        username: username,
        pin: pin
    };

    // Add the new user to the users array
    users.push(newUser);

    // Save the users array to the local storage
    localStorage.setItem('users', JSON.stringify(users));

    // Return the new user object
    return newUser;
}


// Submit the Name to Registration
// Get the info from the confirmation page
// Save the user data to the local storage
function submitRegistration() {
    // Get the username account type and pin from the confirmation page
    var username = document.getElementById('confirmed_name').innerHTML;
    // If ABOVE doesn't work, try this:
    // var username = document.getElementById('confirmed_name').textContent;
    var accountType = document.getElementById('confirmed_acct_type').innerHTML;
    var pin = document.getElementById('confirmed_pin').innerHTML;

    console.log(`User ${username} is in the database as a ${accountType}.  Their pin# is: ${pin}`);

    // Conditionals for the account type
    if (accountType === 'Manager') {
        // Redirect to the manager page
        window.location.href = '../../html/manager/manager.html';
    } else {
        // Redirect to the customer page
        window.location.href = '../../html/calendar/calendar.html';
    }
    
    return registerUser(username, accountType, pin);
}


// Call the submitRegistration function upon submit button click
// Query the submit button from the confirmation page
const submitButton = document.getElementById('confirmation_advance');

// Add an event listener to the submit button
submitButton.addEventListener('click', (e) => {
    // Prevent the default action of the submit button
    e.preventDefault();

    // Call the submitRegistration function
    submitRegistration();
});




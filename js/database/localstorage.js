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
    var username = document.getElementById('confirmed_name').value;
    var accountType = document.getElementById('confirmed_acct_type').value;
    var pin = document.getElementById('confirmed_pin').value;

    // Register the user
    var user = registerUser(username, accountType, pin);

    // Conditionals for the account type
    if (accountType === 'manager') {
        // Redirect to the manager page
        window.location = 'manager.html';
    } else {
        // Redirect to the customer page
        window.location = 'calendar.html';
    }
}

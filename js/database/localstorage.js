// Register users in local storage
// This is a simple implementation for a database
// We also retrieve the user data from the local storage
// We connect to the registration page and save the user data

function registerUser(username, accountType, pin) { 
    // Get the users from the local storage or initialize an empty array
    var users = JSON.parse(localStorage.getItem('users')) || [];

    // Create new user object
    const newUser = {
        // id: Date.now(), // Simple unique id
        id: generateUserId(),
        username: username,
        accountType: accountType,
        pin: pin,
        createdAt: new Date().toISOString()
    };

    // Add the new user to the users array
    users.push(newUser);

    // Save back to localStorage as 'users' key
    localStorage.setItem('users', JSON.stringify(users));

    // Return newUser object
    return { success: true, message: 'User registered Successfully', userId: newUser.id};

    // Helper function to generate a simple unique ID
    function generateUserId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};

 // Login function
 function loginUser(username, pin) {
    // Get item from local storage
    var users = JSON.parse(localStorage.getItem('users')) || [];

    // Find user by name
    const user = users.find( u => u.username === username);

    // Test print finding the user name
    console.log(`The user found is: ${user}`);

    if(!user) {
        return { success: false, message: 'User not found'};
    }

    // Verify PIN
    if (user.pin !== pin) {
        return { success: false, message: 'Invalid PIN'};
    }

    // Store current user info in session
    sessionStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        username: user.username,
        accountType: user.accountType,
        loginTime: new Date().toISOString()
    }));

    // Test print the current user
    var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log(`The current user is: ${currentUser.username}`);

    // Redirect to the dashboard page based on account type
    if (user.accountType === 'Manager') {
        // Redirect to the manager page
        const repoName = "/viking_arena_time_card"
        window.location.href = `${repoName}/html/dashboards/manager.html?username=${username}&acct_type=${user.accountType}`;
    } else {
        // Redirect to the customer page
        const repoName = "/viking_arena_time_card"
        window.location.href = `${repoName}/html/dashboards/employee.html?username=${username}&acct_type=${user.accountType}`;
    }
    // If ABOVE doesn't work, try this:
    // window.location.href = `../../html/dashboards/employee.html?username=${username}&acct_type=${user.accountType}`;

    return {
        success: true,
        message: 'Login successful',
        user: {
            username: user.username,
            accountType: user.accountType,
        }
        
    };
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

    // Encode the username and pin and account type
    username = encodeURIComponent(username);
    accountType = encodeURIComponent(accountType);
    pin = encodeURIComponent(pin);

    // Conditionals for the account type
    if (accountType === 'Manager') {
        // Redirect to the manager page
        // Try this:
        const repoName = "/viking_arena_time_card"
        window.location.href = `${repoName}/html/dashboards/manager.html?username=${username}&acct_type=${accountType}&encodedPinConfirm=${pin}`;
        // window.location.href = `../../html/dashboards/manager.html?username=${username}&acct_type=${accountType}&encodedPinConfirm=${pin}`;
    } else {
        // Redirect to the customer page
        const repoName = "/viking_arena_time_card"
        window.location.href = `${repoName}/html/dashboards/employee.html?username=${username}&acct_type=${accountType}&encodedPinConfirm=${pin}`;
        // window.location.href = `../../html/dashboards/employee.html?username=${username}&acct_type=${accountType}&encodedPinConfirm=${pin}`;
    }
    
    return registerUser(username, accountType, pin);
}


// Call the submitRegistration function upon submit button click

// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {

    // Query the same submit button from the confirmation page
    const submitButton = document.getElementById('confirmation_advance');

    console.log(`The Submit Button test: ${submitButton}`);
    // Add an event listener to the submit button
    submitButton.addEventListener('click', (e) => {
        // Test Print
        console.log("Registration Submitted");
        // Prevent the default action of the submit button
        e.preventDefault();

        // Register the User
        // by calling the submitRegistration function
        submitRegistration();

        // Login the User
        // by calling the loginUser function
        loginUser(username, pin);

        // Test Print the current user
        // First get the current user from the session storage
        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

        // Then print the current user
        console.log(`The current user is: ${currentUser.username}`);
    });
});


// Log out function
function logoutUser() {
    // Clear session storage
    sessionStorage.removeItem('currentUser');

    // Redirect to login page
    window.location.href = '../../html/login.html';
}

// Add event listener to the logout button
document.addEventListener('DOMContentLoaded', function() {
    // Query the logout button from the dashboard page
    const logoutButton = document.getElementById('logout_account');

    // Add an event listener to the logout button
    logoutButton.addEventListener('click', (e) => {
        // Test Print
        console.log("Logout Button Clicked");

        // Prevent the default action of the logout button
        e.preventDefault();

        // Logout the user by calling the logoutUser function
        logoutUser();
    });
});






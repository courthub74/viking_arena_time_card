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

    // Save back to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Return newUser object
    return { success: true, message: 'User registered Successfully', userId: newUser.id};

    // Helper function to generate a simple unique ID
    function generateUserId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Login function
    function loginUser(username, pin) {
        // Get item from local storage
        var users = JSON.parse(localStorage.getItem('users')) || [];

        // Find user by name
        const user = users.find( u => u.username === username);

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

        return {
            success: true,
            message: 'Login successful',
            user: {
                username: user.username,
                accountType: user.accountType
            }
        };
    }

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

    // Register the User
    // registerUser();

    // Call the submitRegistration function
    submitRegistration();
});




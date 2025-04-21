// Test Print Page
console.log("Delete User Page");

// Query the ELEMENTS

// Query the pin inputs
const pinField = document.querySelectorAll('.pin_put');

// Clear button
const clearPinsButton = document.getElementById('reset_button');

// Forgot Pin button
const forgotPinButton = document.getElementById('forgot_button');

// Delete Account button
const delete_acct_button = document.querySelector('#delete_acct');

// Test Print ELEMENTS
console.log(pinField);
console.log(clearPinsButton);
console.log(forgotPinButton);

// Match pin number to the one in LocalStorage and enable the Delete Account Button
pinField.forEach((input, key) => {
    input.addEventListener('keyup', (e) => {
        if (input.value) {
            // Move to next input if there is a next input
            if (key < pinField.length - 1) {
                pinField[key + 1].focus();
            }
            // If the last input is filled, move focus to the delete account button
            if (key === pinField.length - 1) {
                delete_acct_button.focus();
            }
            // Test Print the pin fields filled
            console.log("Pin field filled");
            // If there is all 4 digits entered
            if (key === 3) {
                // Let's read the pins for matching to the LocalStorage or Database
                const delete_acct_pins = [...pinField].map(each_pinField => each_pinField.value).join('');
                // Print the value of the pin field
                console.log(`Pin value: ${delete_acct_pins}`);
                // NOW check if the pin is correct

                // FIRST get LOGGED IN USER
                const loggedUser = JSON.parse(sessionStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('session'));
                // Error Handling (in this case if user gets logged out)
                if (!loggedUser) {
                    alert("User got logged out");
                    // return;
                }
                // Test Print Logged User
                console.log("Full loggedUser object:", loggedUser);
                console.log(`${loggedUser.username} is now logged in`);
                // THEN get all users info and parse it from localStorage or Database
                const allUsers = JSON.parse(localStorage.getItem('users')) || [];
                // Test print the sessionIDs
                console.log("All users:", allUsers.map(user => user.id));
                // Get Logged User Index (session ID because the session storage labels it that way)
                const loggedUserIndex = allUsers.findIndex(user => user.username === loggedUser.username);
                // Test Print Index
                console.log(loggedUserIndex);
                // Current user sessionID
                console.log(`Current user id#: ${allUsers[loggedUserIndex].id}`);
                // Current user Name
                console.log(`Current user name ${allUsers[loggedUserIndex].username}`);
                // Enable the delete account button
            }
        }
    })
})
// Match pin number to the one in the Database and enable the Delete Account Button

// Create Delete accoung function
function deleteAccount() {

    // Get logged in user from session storage
    const logOutUser = JSON.parse(sessionStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('session'));

    // Error Handling (in this case if user gets logged out)
    if (!logOutUser) {
        alert("User got logged out");
        // return;
    }

    // Get all users from local storage
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Test print the JSON array of objects
    // console.log(users);
    console.log(`AllUsers: ${allUsers}`);

    // Test print
    console.log("All users:", allUsers.map(user => user.username));
    console.log("All users:", allUsers.map(user => user.id));
    // current user
    console.log(`Current user is ${logOutUser.username}`);
    console.log(`The users id # is: ${logOutUser.sessionId}`);
    console.log(`The users account type is: ${logOutUser.accountType}`);

    // Helped debug the id # confusion
    console.log("Full logOutUser object:", logOutUser);

    // Lets use ID's to delete acct by as names can be redundant

    // Match the logged in user in all users to retrieve the id of current user
    const logOutUserIndex = allUsers.findIndex(user => user.sessionId === logOutUser.sessionId);
    // const logOutUserIndex = allUsers.findIndex(user => user.username === logOutUser.username);

    // Test the index
    console.log(logOutUserIndex);

    // Error handling (Mute this comment after the function actually works)
        // Because it will show after the user has been deleted
    // if (logOutUserIndex === -1) {
    //     alert(`User ${logOutUserIndex} found in database`);
    // }

    // Remove the user from the array (the 1 tells the function to remove only the one user 
        //at that index position)
    allUsers.splice(logOutUserIndex, 1);

    // Save the new array to localStorage
    localStorage.setItem('users', JSON.stringify(allUsers));

    // Redirect to the index page
    window.location.href = '../../index.html';
}


// Add Event Listener
delete_acct_button.addEventListener('click', (e) => {
    e.preventDefault();

    // call the delete account functions
    deleteAccount();
});
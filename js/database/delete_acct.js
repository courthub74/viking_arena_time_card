// Test Print Page
console.log("Delete User Page");

// Create Delete accoung function
function deleteAccount(userId) {

    // Get logged in user from session storage
    const logOutUser = JSON.parse(sessionStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('session'));

    // Error Handling (in this case if user gets logged out)
    if (!logOutUser) {
        alert("User got logged out");
        // return;
    }

    // Get all users from local storage
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];

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
    const logOutUserIndex = allUsers.findIndex(user => user.username === logOutUser.username);

    // Test the index
    console.log(logOutUserIndex);

    // Error handling
    if (logOutUserIndex === -1) {
        alert(`User ${logOutUser} found in database`);
    }

    // Remove the user from the array
    logOutUser.splice(logOutUserIndex, 1);

}

// Query the Delete Account Button
const delete_acct_button = document.querySelector('#delete_account');

// Add Event Listener
delete_acct_button.addEventListener('click', (e) => {
    e.preventDefault();

    // call the delete account functions
    deleteAccount();
});
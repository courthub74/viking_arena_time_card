// Test Print Page
console.log("Delete User Page");

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

// Query the Delete Account Button
const delete_acct_button = document.querySelector('#delete_account');

// Add Event Listener
delete_acct_button.addEventListener('click', (e) => {
    e.preventDefault();

    // call the delete account functions
    deleteAccount();
});
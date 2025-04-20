// Test Print Page
console.log("Delete User Page");

// Create Delete accoung function
function deleteAccount(userId) {

    // Get all users from local storage
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];


    // Test print
    console.log("All users:", allUsers.map(user => user.username));
    console.log("All users:", allUsers.map(user => user.id));

    // Lets use ID's to delete acct by as names can be redundant

    
    // Match the current user with the account in localStorage

}



// Query the Delete Account Button
const delete_acct_button = document.querySelector('#delete_account');

// Add Event Listener
delete_acct_button.addEventListener('click', (e) => {
    e.preventDefault();

    // call the delete account functions
    deleteAccount();
});
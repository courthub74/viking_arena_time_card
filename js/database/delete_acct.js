// Delete User function
function deleteUser(userId) {
    // Get the users from the local storage or initialize an empty array
    var users = JSON.parse(localStorage.getItem('users')) || [];

    // Define the userId to be deleted
    var userId = sessionStorage.getItem(user.id); // Get the userId from the session storage
    
    // Test print the userId to be deleted
    console.log(`The userId to be deleted is: ${userId}`);

    // Filter out the user to be deleted
        // a Callback function to match the user ids in the local storage array to the current user id
        // all users where user.id is not equal to userId will be kept
    users = users.filter(user => user.id !== userId);

    // Save back to localStorage as 'users' key
    localStorage.setItem('users', JSON.stringify(users));

    return { success: true, message: 'User deleted successfully' };
}

// Test Print the users in the local storage
function printUsers() {
    // Get the users from the local storage or initialize an empty array
    var users = JSON.parse(localStorage.getItem('users')) || [];

    // Print the users to the console
    console.log(users);
}

// add event listener to the delete button
document.addEventListener('DOMContentLoaded', function() {
    // Query the delete button from the confirmation page
    const deleteButton = document.getElementById('delete_account');

    // Add an event listener to the delete button
    deleteButton.addEventListener('click', (e) => {
        // Test Print
        console.log("Delete User Button Clicked");

        // Prevent the default action of the delete button
        e.preventDefault();

        // Delete the user by calling the deleteUser function
        deleteUser(userId);

        // Print the users in the local storage
        printUsers();
    });
});

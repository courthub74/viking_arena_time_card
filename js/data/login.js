// JS to read the names from the DB
// (for now its in LocalStorage)
document.addEventListener('DOMContentLoaded', (e) => {
    // Get the dropdown element
    const usersDropdown = document.getElementById('users_dropdown');
    // Get the users array from the local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Clear all existing options in the dropdown
    usersDropdown.innerHTML = '';

    // Add the default empty option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.classList.add('drop_label');
    defaultOption.selected = true;
    defaultOption.textContent = ''
    usersDropdown.appendChild(defaultOption);

    // Populate the dropdown with the users from localStorage
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id; // Use user ID as the value
        option.textContent = user.username; // Display the username
        // Append to the users dropdown
        usersDropdown.appendChild(option);
    });

    // If no users found, display a message
    if (users.length === 0) {
        const noUsersOption = document.createElement('option');
        noUsersOption.disabled = true;
        noUsersOption.textContent = 'No users found';
        usersDropdown.appendChild(noUsersOption);
    }
});

// JS to map through pin focus

// JS to clear the pin fields

// JS to match the name to the pin entered in DB

// JS to enable the Login button
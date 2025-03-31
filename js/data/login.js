// JS to read the names from the DB
// (for now its in LocalStorage)
document.addEventListener('DOMContentLoaded', (e) => {
    // Get the dropdown element to populate it with names
    const usersDropdown = document.getElementById('users_dropdown');
    // Get the users array from the local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Clear all existing options in the dropdown
    usersDropdown.innerHTML = '';

    // Add the default empty option
    const defaultOption = document.createElement('option');
    defaultOption.value = ''; // Set the value as empty
    // Set the default option as selected
    defaultOption.selected = true;
    defaultOption.textContent = ''
    usersDropdown.appendChild(defaultOption);

    // Populate the dropdown with the users from localStorage
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id; // Use user ID as the value
        option.textContent = user.username; // Display the username
        // Remove the %20 from the username (by decoding it)
        option.textContent = decodeURIComponent(user.username);
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

    // Query the pin inputs by whole div

    // Query the login pin field
    const login_pins = document.querySelectorAll('pin_put');

    // NUMERIC INPUT BEHAVIOR (for mobile devices)
    // For every input in login_pins 
    login_pins.forEach((input, index) => {
        // Add input type="number" or pattern attribute to HTML elements
        input.setAttribute('inputmode', 'numeric'); // Shows number keyboard on mobile

        // Prevent non-numeric input
        input.addEventListener('keypress', function(event) {
            // Allow only digits (0-9)
            if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
            }
        });

         // Clean any non-numeric characters that might get pasted
         input.addEventListener('input', function() {
            // set the value of the input to only allow numerals with reg ex
            this.value = this.value.replace(/[^0-9]/g, '');

            // JS to map through pin focus
            // Move to next input when a digit is entered
            if (this.value.length === 1 && index < login_pins.length - 1) {
                login_pins[index - 1].focus();
            }
         });

        // BACKSPACE HANDLING
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Backspace' && this.value.length === 0 && index > 0) {
                login_pins[index - 1].focus();
            }
        });
    }); 

   

    // Login function
    function loginUser(username, pin) {
        // Get item from local storage
        var users = JSON.parse(localStorage.getItem('users')) || [];

        // Find user by name
       const user = users.find( u => u.username === username);

        // Grab and parse the info from LocalStorage
    
        // validate inputs (For Login)
        if (!username || username.trim() === '') {
            return { success: false, message: 'Name is required'};
        }

        if (!pin || pin.length < 4 || isNaN(pin)) {
            return { success: false, message: 'PIN must be at least 4 digits' };
        }
        
        if (!accountType || !['admin', 'user', 'guest'].includes(accountType)) {
        return { success: false, message: 'Valid account type required' };
        }

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

    // JS to clear the pin fields

    // Query the login button
    const submit_login = document.getElementById("submit_login");
    // JS to enable the Login button
    submit_login.addEventListener('click', function() {
        // Get the values from the input fields
        const username = document.getElementById('username').value;
        const pin = Array.from(login_pins).map(input => input.value).join('');
        const accountType = document.getElementById('account_type').value;

        // Call the login function
        loginUser(username, pin);

        if (result.success) {
            // Depending on account type Redirect to the employee page or show success message
            if (result.user.accountType === 'Manager') {
                // Redirect to the employee page
                window.location.href = '../../html/dashboards/manager.html';
            } else if (result.user.accountType === 'Employee') {
                // Redirect to the employee page
                window.location.href = '../../html/dashboards/employee.html';
            } 
        } else {
            // Show error message
            alert(result.message);
        }
    });
});


// Test print
console.log('Employee hours list JS loaded');

// Get employee names from the URL
const urlParams = new URLSearchParams(window.location.search);
const employeeName = urlParams.get('username');
// const cleanEmployeeName = employeeName ? employeeName.trim() : '';
const cleanEmployeeName = decodeURIComponent(employeeName).trim();
console.log('cleanEmployeeName:', cleanEmployeeName);

// store it in variable 
const employeeNameFromUrl = employeeName;
console.log('employeeFromURL',employeeNameFromUrl);

// Log the employee name for debugging
console.log(`Employee name from URL: ${employeeName}`);
// Check if employeeName is not null or undefined
if (employeeName) {
    // Log the employee name for debugging
    console.log(`Employee name from URL: ${employeeName}`);
}

// If employeeName is null or undefined, you can handle it accordingly
else {
    console.error('Employee name not found in URL parameters.');
}

// Query the employee name element from the DOM
const employeeNameHours = document.getElementById('emp_name_box');
// Check if the employeeNameHours element exists
if (employeeNameHours) {
    // Set the text content of the employee name element
    employeeNameHours.textContent = employeeName;
}

///////////////////////////////////////////////////////////
// Function to fetch employee hours data
// First get selected user's employee hours from session storage


// Initialize userIndex
let userIndex = -1;

// Get all users from localStorage
const allUsers = JSON.parse(localStorage.getItem('users')) || [];

// Debug: Log all users and cleanEmployeeName
console.log('allUsers:', allUsers);
console.log('cleanEmployeeName:', cleanEmployeeName);

// Find the user
allUsers.forEach((user, index) => {
    // Decode the username to handle any URL encoding
    const decodedUsername = decodeURIComponent(user.username).trim();
    if (decodedUsername === employeeNameFromUrl) {
        console.log(`Found user at index ${index}:`, user);
        console.log(employeeNameFromUrl)
        userIndex = index;
        // print the user hours
        // console.log('User hours:', user.hours);
        // NOW we can fetch the hours for this user
        const userHours = user.hours || [];
        console.log('User hours:', userHours);
        // for each user hour, display to the emp_hours 
        const empHoursList = document.getElementById('emp_hours');
        if (empHoursList) {
            empHoursList.innerHTML = ''; // Clear existing content
            userHours.forEach((hour) => {
                const li = document.createElement('li');
                li.style.listStyleType = 'none'; // Remove bullet points from list items
                // Style the list item (styling can be done via CSS)
                // li.className = 'emp_hours_list_item';
                // set the total hours
                // hour.totalHours = hour.outTime - hour.inTime;
                // Format the date and times for display
                const formattedDate = new Date(hour.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                });
                hour.date = formattedDate; // Update the date format
               
                // Set the text content of the list item

                // li.textContent = `Date: ${hour.date}, Hours: ${hour.inTime} - ${hour.outTime}`;

                // empHoursList.appendChild(li);

                // Create the hour entry list 
                li.innerHTML = `
                    <div class="emp_hours_list">
                        <div class="emp_hours_list_item">${hour.date}</div>
                        <div class="emp_hours_list_item">${hour.inTime}</div>
                        <div class="emp_hours_list_item">${hour.outTime}</div>
                    </div>
                `;
                empHoursList.appendChild(li);
            });
        } else {
            console.error('emp_hours element not found in the DOM.');
        }
    } 
});

// Debug: Log final userIndex
console.log('Final userIndex:', userIndex);

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// JS for the side bar
// Get Current User Name
const nowUser = sessionStorage.getItem('currentUser') || sessionStorage.getItem('session');
// Parse the current user from session storage
const nowUserParsed = nowUser ? JSON.parse(nowUser) : null;
// Test print
console.log('nowUserParsed:', nowUserParsed);
// Decode the username to handle any URL encoding
if (nowUserParsed) {
    nowUserParsed.username = decodeURIComponent(nowUserParsed.username).trim();
}
// Render the userName object
const currentUserName = nowUserParsed.username;
// Test Print
console.log(`Current User is: ${currentUserName}`);

// // Check if the empName element exists
if (currentUserName) {
    // Query the sidebar profile elements
    const profileName = document.getElementById('profile_scheduler_name');
    // Set the text content of the employee name element
    profileName.textContent = currentUserName;
    // Place the Account Type in the manager name element
    const acctType = document.getElementById('profile_scheduler_account');
    // Set the text content of the account type element
    acctType.textContent = nowUserParsed.accountType || 'Manager'; // Default to 'Manager' if not set
    // Place the user name in the manager name element (Page Header)
    const managerName = document.getElementById('manager_name');
    // Set the text content of the manager name element
    managerName.textContent = currentUserName;
} else {
    console.log(`${currentUserName} NOT found`);
};

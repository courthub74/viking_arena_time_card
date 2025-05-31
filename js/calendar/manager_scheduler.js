console.log("manager_scheduler.js loaded");

// Retrieve the current user from session storage
var currentUser = sessionStorage.getItem('currentUser') || sessionStorage.getItem('session');

// Parse the current user from JSON string to object
var currentUser = JSON.parse(currentUser);

// Test Print
console.log(`(manager_schedulerJS)The Current User is: ${currentUser.username}`);

// Display the current users's name in the header
const managerNameSidebar = document.getElementById('profile_scheduler_name');

// Decode the username from the session storage
const loggedName = currentUser.username ? decodeURIComponent(currentUser.username) : 'Not Logged In';

// Test Print the logged user
console.log(`(manager_schedulerJS)The logged in name is: ${loggedName}`);

// Query the header for name
const nameHeader = document.getElementById('manager_name');

// Set the name header to logged in user
nameHeader.innerHTML = loggedName;

// Set the sidebar name to logged in account
managerNameSidebar.innerHTML = loggedName;

// Query the sidebar for the current user
const managerAccountSidebar = document.getElementById('profile_scheduler_account');

// Decode the account type from the session storage
const loggedAccountType = currentUser.accountType ? decodeURIComponent(currentUser.accountType) : 'Not Logged In';

// Test Print the account type
console.log(`(manager_schedulerJS)The logged in account type is: ${loggedAccountType}`);

// change the innerHTML of sidebar account type header to the current user's account type
managerAccountSidebar.innerHTML = loggedAccountType;


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
// THIS IS WHERE YOU LOOP THROUGH THE EMPLOYEES FOR EMPLOYEE HOURS BUTTONS

// FIRST RETRIEVE THE USERS FROM THE LOCAL STORAGE BASE
const users = JSON.parse(localStorage.getItem('users')) || [];

// Test print
console.log(users);

// NOW make the button below for each user

/**
 * <button class="employee_hours_btn">
        <p class="employee_name">Employee Name</p>
        <img src="../../img/dashboard_logos/blue_hours.png" class="emp_clock" alt="emp_clock">
    </button>
 */

// FIRST Query the 'employee_hours_buttons' section for the 
    // buttons to be generated there
const employee_hours_button_div = document.getElementById('employee_hours_buttons');

// For every user create a button with the user name

// FIRST iterate through the users (using forEach since you don't need to modify any array elements)
users.forEach(user => {

    // Filter the managers out (only display employees) 
    // Conditional
    if (user.accountType === "Manager") {
        // make it not display return nothing
        console.log(`(manager_schedulerJS)Skipping user: ${user.username} as they are a Manager.`);
        return;
    } 
    // Create the button
    const button = document.createElement('button');
    // Make the button a child of the 'employee hours button div'
    employee_hours_button_div.appendChild(button);
    // Style the button
        // in this case (already styled just give it the css class)
    button.className = 'employee_hours_btn';
    // Query the employee_hours_btn
    // const employee_hours_btn = document.querySelectorAll('employee_hours_btn');

    // Give the button an id
    button.id = `employee_hours_btn`;

    // Create the p tag 
    const employee_tag = document.createElement('p');

    // Create the id for the employee name element (employee name)
    employee_tag.id = 'employee_name';

    // Append the p tag to the button
    button.appendChild(employee_tag);

    // Decode the user.username
    employee_tag.innerHTML = decodeURIComponent(user.username);

    // Give the tag its css class
    employee_tag.className = 'employee_name';

    // Place the clock on the button
    // create the image
    const clock_img = document.createElement('img');
    // Source the image
    clock_img.src = '../../img/dashboard_logos/blue_hours.png';
    // Append to the button
    button.appendChild(clock_img);
    // give clock the css class assigned
    clock_img.className = 'emp_clock'; 
});

const employee_hours_btn = document.getElementById('employee_hours_btn');
// Add an event listener to the employee hours buttons
// When clicked, it should redirect to the employee hours page with the username as a query parameter
// Add an event listener to the employee hours buttons
employee_hours_btn.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default action if necessary
    console.log("Employee hours button clicked");
    // Check if the clicked element is a button with the class 'employee_hours_btn'
    if (e.target.classList.contains('employee_hours_btn')) {
        // Get the employee name from the button
        const employeeName = event.target.querySelector('.employee_name').innerText;
        // sort through the users to find the employee with the matching username
        // const employee = users.find(user => user.username === employeeName);
        // // If the employee is not found, log an error and return
        // if (!employee) {
        //     console.error(`Employee with username ${employeeName} not found.`);
        //     return;
        // }
        // Log the employee name for debugging
        console.log(`Employee hours button clicked for: ${employeeName}`);
        // Optionally, you can store the employee name in session storage
        
        // Redirect to the employee hours page with the username as a query parameter
        // window.location.href = `../employee/employee_hours.html?username=${encodeURIComponent(employeeName)}`;
        // window.location.href = `../../html/manager/emp_hours_list.html?username=${encodeURIComponent(employeeName)}`;
        // Log the redirection for debugging
        window.location.href = `../../html/manager/emp_hours_list.html`;
        console.log(`Redirecting to employee hours page for: ${employeeName}`);
    }
});


// FIRST RETRIEVE THE USERS FROM THE MONGO DB 

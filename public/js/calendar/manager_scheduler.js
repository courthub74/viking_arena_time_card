console.log("manager_scheduler.js loaded");

document.addEventListener('DOMContentLoaded', async function () {
    // Retrieve the current user from session storage
    let currentUser = sessionStorage.getItem('currentUser') || sessionStorage.getItem('session');
    currentUser = JSON.parse(currentUser);

    // Display current user's info
    const managerNameSidebar = document.getElementById('profile_scheduler_name');
    const nameHeader = document.getElementById('manager_name');
    const managerAccountSidebar = document.getElementById('profile_scheduler_account');

    const loggedName = currentUser.username || `${currentUser.firstname} ${currentUser.lastname}`;
    const loggedAccountType = currentUser.accountType || currentUser.role;

    console.log(`(manager_schedulerJS)The logged in name is: ${loggedName}`);
    console.log(`(manager_schedulerJS)The logged in account type is: ${loggedAccountType}`);

    nameHeader.innerHTML = loggedName;
    managerNameSidebar.innerHTML = loggedName;
    managerAccountSidebar.innerHTML = loggedAccountType;

    //////////////////////////////////////////////////////////////////////////
    // Retrieve users from MongoDB
    //////////////////////////////////////////////////////////////////////////

    try {
        const res = await fetch('http://localhost:3000/api/employees/all');
        const users = await res.json();

        const employee_hours_button_div = document.getElementById('employee_hours_buttons');
        console.log("(manager_schedulerJS) Loaded users from MongoDB:", users);

        users.forEach(user => {
            if (user.role === 'Manager') {
                console.log(`Skipping manager user: ${user.firstname} ${user.lastname}`);
                return;
            }

            const button = document.createElement('button');
            button.className = 'employee_hours_btn';
            button.id = `employee_hours_btn_${user._id}`;

            const employee_tag = document.createElement('p');
            employee_tag.id = 'employee_name';
            employee_tag.className = 'employee_name';
            employee_tag.innerHTML = `${user.firstname} ${user.lastname}`;
            button.appendChild(employee_tag);

            const clock_img = document.createElement('img');
            clock_img.src = '../../img/dashboard_logos/blue_hours.png';
            clock_img.className = 'emp_clock';
            button.appendChild(clock_img);

            employee_hours_button_div.appendChild(button);
        });

        // Add click event to all dynamically created buttons
        document.querySelectorAll('.employee_hours_btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const employeeName = btn.querySelector('.employee_name').innerText;
                console.log(`Redirecting to employee hours page for: ${employeeName}`);
                window.location.href = `../../html/manager/emp_hours_list.html?username=${encodeURIComponent(employeeName)}`;
            });
        });
    } catch (err) {
        console.error("Failed to load employees from MongoDB:", err);
        alert("Could not load employee list.");
    }
});


// console.log("manager_scheduler.js loaded");

// // Retrieve the current user from session storage
// var currentUser = sessionStorage.getItem('currentUser') || sessionStorage.getItem('session');

// // Parse the current user from JSON string to object
// var currentUser = JSON.parse(currentUser);

// // Test Print
// console.log(`(manager_schedulerJS)The Current User is: ${currentUser.username}`);

// // Display the current users's name in the header
// const managerNameSidebar = document.getElementById('profile_scheduler_name');

// // Decode the username from the session storage
// const loggedName = currentUser.username ? decodeURIComponent(currentUser.username) : 'Not Logged In';

// // Test Print the logged user
// console.log(`(manager_schedulerJS)The logged in name is: ${loggedName}`);

// // Query the header for name
// const nameHeader = document.getElementById('manager_name');

// // Set the name header to logged in user
// nameHeader.innerHTML = loggedName;

// // Set the sidebar name to logged in account
// managerNameSidebar.innerHTML = loggedName;

// // Query the sidebar for the current user
// const managerAccountSidebar = document.getElementById('profile_scheduler_account');

// // Decode the account type from the session storage
// const loggedAccountType = currentUser.accountType ? decodeURIComponent(currentUser.accountType) : 'Not Logged In';

// // Test Print the account type
// console.log(`(manager_schedulerJS)The logged in account type is: ${loggedAccountType}`);

// // change the innerHTML of sidebar account type header to the current user's account type
// managerAccountSidebar.innerHTML = loggedAccountType;


// // Load the DOM content before executing the script
// document.addEventListener('DOMContentLoaded', function() {
//     // BUTTON LOGIC  
//     //////////////////////////////////////////////////////////////////////////
//     //////////////////////////////////////////////////////////////////////////
//     //////////////////////////////////////////////////////////////////////////
//     // THIS IS WHERE YOU LOOP THROUGH THE EMPLOYEES FOR EMPLOYEE HOURS BUTTONS

//     // FIRST RETRIEVE THE USERS FROM THE LOCAL STORAGE BASE
//     const users = JSON.parse(localStorage.getItem('users')) || [];

//     // Test print
//     console.log(users);

//     // NOW make the button below for each user

//     /**
//      * <button class="employee_hours_btn">
//             <p class="employee_name">Employee Name</p>
//             <img src="../../img/dashboard_logos/blue_hours.png" class="emp_clock" alt="emp_clock">
//         </button>
//     */

//     // FIRST Query the 'employee_hours_buttons' section for the 
//         // buttons to be generated there
//     const employee_hours_button_div = document.getElementById('employee_hours_buttons');
//     // Test Print
//     console.log(`(manager_schedulerJS)Employee hours button div: ${employee_hours_button_div}`);

//     // BUTTON GENERATION
//     // For every user create a button with the user name
//     // FIRST iterate through the users (using forEach since you don't need to modify any array elements)
//     users.forEach(user => {

//         // Filter the managers out (only display employees) 
//         // Conditional
//         if (user.accountType === "Manager") {
//             // make it not display return nothing
//             console.log(`(manager_schedulerJS)Skipping user: ${user.username} as they are a Manager.`);
//             return;
//         } 
//         // Create the button
//         const button = document.createElement('button');
//         // Make the button a child of the 'employee hours button div'
//         employee_hours_button_div.appendChild(button);

//         // Style the button
//             // in this case (already styled just give it the css class)
//         button.className = 'employee_hours_btn';
//         // Query the employee_hours_btn
//         // const employee_hours_btn = document.querySelectorAll('employee_hours_btn');

//         // Give the button an id
//         button.id = `employee_hours_btn`;

//         // Create the p tag 
//         const employee_tag = document.createElement('p');

//         // Create the id for the employee name element (employee name)
//         employee_tag.id = 'employee_name';

//         // Append the p tag to the button
//         button.appendChild(employee_tag);

//         // Decode the user.username
//         employee_tag.innerHTML = decodeURIComponent(user.username);

//         // Give the tag its css class
//         employee_tag.className = 'employee_name';

//         // Place the clock on the button
//         // create the image
//         const clock_img = document.createElement('img');
//         // Source the image
//         clock_img.src = '../../img/dashboard_logos/blue_hours.png';
//         // Append to the button
//         button.appendChild(clock_img);
//         // give clock the css class assigned
//         clock_img.className = 'emp_clock'; 
//     });

//     // EMPLOYEE HOURS BUTTONS
//     // Query the employee hours button by its id
//     // This is the button that will be clicked to redirect to the employee hours page
//     // Query the employee buttons by their class
//     const employee_hours_btn = document.querySelectorAll('.employee_hours_btn');
//     // Get the employees by their class
//     // const employee_hours_btn = document.getElementById('employee_hours_btn');
//     // Add an event listener to the employee hours buttons
//     // When clicked, it should redirect to the employee hours page with the username as a query parameter
//     // Add an event listener to the employee hours buttons
//     // Loop through each employee hours button
//     employee_hours_btn.forEach(btn => {
//         // Add a click event listener to each button
//         btn.addEventListener('click', function(e) {
//             e.preventDefault(); // Prevent default action if necessary
//             console.log("Employee hours button clicked");
//             // Store the user name in a variable to read for later rendering
//             //  const employeeName = user.username;
//             // Get the employee name from the button that was clicked (BY CLASS)
//             const employeeName = this.querySelector('.employee_name').innerText;
//             console.log(`Employee name from button: ${employeeName}`);
//             // Check if the clicked element is a button with the class 'employee_hours_btn'
//             if (employeeName) {
//                 // Get the employee name from the button
//                 // if innerText name matches the name from local storage
//                 // Get the users from local storage
//                 // AND PARSE through the users to find the employee with the matching username
//                 console.log(users);
//                 if (employeeName === loggedName) {
//                     // Log a message indicating that the logged in user is the one clicked
//                     console.log(`Employee hours button clicked for logged in user: ${loggedName}`);
//                     // Redirect to the employee hours page with the username as a query parameter
//                     window.location.href = `../../html/manager/emp_hours_list.html?username=${encodeURIComponent(loggedName)}`;
//                     return; // Exit the function after redirecting
//                 }
                
//                 // Log the employee name for debugging
//                 console.log(`Employee hours button clicked for: ${employeeName}`);
//                 // Optionally, you can store the employee name in session storage
                
//                 // Redirect to the employee hours page with the username as a query parameter
//                 window.location.href = `../../html/manager/emp_hours_list.html?username=${encodeURIComponent(employeeName)}`;
//                 // Log the redirection for debugging
//                 console.log(`Redirecting to employee hours page for: ${employeeName}`);
//             }
//         });
//     });
// });





// // FIRST RETRIEVE THE USERS FROM THE MONGO DB 

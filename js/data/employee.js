// THE ALGRORITHM FOR GETTING FROM THE URL PARAMETERS

// Page One

// Query the input 
// Get the input.value
// store it in a variable
// Encode the variable
// Redirect to the next page with URL parameters

// Page Two
// retrieve the URL parameters


//////////////////////////////////////////////////////////////////////
// THE ALGORITHM FOR GETTING FROM THE URL PARAMETERS
//////////////////////////////////////////////////////////////////////

// For the Header and slide ins on the dashboard page

// At the top of your JS file or in a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {

    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    // REGISTRATION PART (I assume you don't have the session storage yet)
    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    // Query the slide in profile name
    const slide_in_profile_name = document.getElementById('profile_name');
    // Query the slide in account type
    const slide_in_account_type = document.getElementById('profile_account');
    // Get logged in user from session storage
    // Get the name from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const logged_name = urlParams.get('username') ? decodeURIComponent(urlParams.get('username')) : 'Not Logged In';
    const logged_acct_type = urlParams.get('acct_type') ? decodeURIComponent(urlParams.get('acct_type')) : 'N/A';
    // Set the sidebar elements to the logged in user
    slide_in_profile_name.innerHTML = logged_name;
    slide_in_account_type.innerHTML = logged_acct_type;
   
    // Query the name header
    const name_header = document.querySelector("#employee_name");

    // Set the name header to the logged in user
    name_header.innerHTML = logged_name;


    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    // LOGGED IN USER PART (Retrieve the session storage)
    // Retrieve the current user from session storage
    var currentUser = sessionStorage.getItem('currentUser');
    // Retrieve the current user from session storage
    var currentUser = sessionStorage.getItem('session');
    // Check if the current user is null or undefined
    if (currentUser === null || currentUser === undefined) {
        console.log("(employee.js)No current user found in session storage. Please log in.");
        return; // Exit the function if no user is found
    }
    // Parse the current user from JSON string to object
    var currentUser = JSON.parse(currentUser);
    // Test print the current user
    console.log(`(employee.js)The current user is: ${currentUser.username} and their role is: ${currentUser.accountType} session: ${currentUser.sessionId}`);
    // Display the current user's name in the header
    const employeeNameHeader = document.getElementById('employee_name');
    // Decode the username from the session storage
    const loggedName = currentUser.username ? decodeURIComponent(currentUser.username) : 'Not Logged In';
    console.log(`(employee.js)The logged in name is: ${loggedName}`);
    // Set the name header to the logged in user
    employeeNameHeader.innerHTML = loggedName;
    // Query the sidebar for the current user
    const sidebarNameHeader = document.getElementById('profile_name');
    // Change the inner HTML of the sidebar name header to the current user's name
    sidebarNameHeader.innerHTML = loggedName;
    // Decode the account type from the session storage
    const loggedAccountType = currentUser.accountType ? decodeURIComponent(currentUser.accountType) : 'Not Logged In';
    console.log(`(employee.js)The logged in account type is: ${loggedAccountType}`);
    // Set the account type header to the logged in user
    const sidebarAccountTypeHeader = document.getElementById('profile_account');
    // Change the inner HTML of the sidebar account type header to the current user's account type
    sidebarAccountTypeHeader.innerHTML = loggedAccountType;

    /////////////////////////////////////////////////////////////////////////////
});
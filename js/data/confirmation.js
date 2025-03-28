// Get URL Parameters (it's a search)
const urlParams = new URLSearchParams(window.location.search);

console.log(urlParams);    
// First Name | Last Name | Account Type | Pin Number are all retrieved by ID

// Get the First Name from the URL Parameters and decode it
const encodedFirstName = urlParams.get('first_name') ? decodeURIComponent(urlParams.get('first_name')) : 'No First Name';
console.log(`The encoded First name: ${encodedFirstName}`);

// Get the Last Name from the URL Parameters and decode it
const encodedLastName = urlParams.get('last_name') ? decodeURIComponent(urlParams.get('last_name')) : 'No Last Name';
console.log(`The encoded Last name: ${encodedLastName}`);

// Get the Account Type from the URL Parameters
const acct_type = urlParams.get('acct_type') ? decodeURIComponent(urlParams.get('acct_type')) : 'No Account Type';
console.log(`The encoded Account type: ${acct_type}`);

// Get the Pin Number from the URL Parameters
const pin_number = urlParams.get('encodedPinConfirm') ? decodeURIComponent(urlParams.get('encodedPinConfirm')) : 'No Pin Number';
// console.log(pin_number);

// Query the First Name, Last Name, Account Type, and Pin Number (to change the innerHTML)
const confirmed_name = document.getElementById('confirmed_name');
const confirmed_acct_type = document.getElementById('confirmed_acct_type');
const confirmed_pin = document.getElementById('confirmed_pin');

// Query the sidebar elements
const sidebar_first_name = document.getElementById('profile_name');
const sidebar_account_type = document.getElementById('profile_account');

// Test Print Names
console.log(`${encodedFirstName} ${encodedLastName}`);
// inner HTML Elements changed

// Setting the Name div innerHTML with proper encoded parameters
confirmed_name.innerHTML = `${encodedFirstName} ${encodedLastName}`;
console.log(`The Name is: ${encodedFirstName} ${encodedLastName}`);

// The Account Type div
confirmed_acct_type.innerHTML = acct_type;
console.log(`The Account Type is: ${acct_type}`);

// The Pin Number div
confirmed_pin.innerHTML = pin_number;

// NOW, we need to set the sidebar elements
sidebar_first_name.innerHTML = `${encodedFirstName} ${encodedLastName}`;
sidebar_account_type.innerHTML = acct_type;

/////////////////////////////////////////////////////////////////

// Variables to encode to send to the next page
const logged_name = sidebar_first_name.innerHTML.split(' ')[0];
// const logged_name = sidebar_first_name.innerHTML;
const logged_acct_type = sidebar_account_type.innerHTML;
console.log(`The logged name is: ${logged_name}`);
console.log(`The logged account type is: ${logged_acct_type}`);
/////////////////////////////////////////////////////////////////

// Query the Submit Button
const submit_acct_type = document.getElementById('confirmation_advance');

// Change the inner HTML of the Submit Button upon account type selection
if (acct_type === 'Manager') {
    submit_acct_type.innerHTML = 'Complete registration';
} else {
    submit_acct_type.innerHTML = 'Complete registration';
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// ENCODE THE VARIABLES TO SEND TO THE NEXT PAGE

const encoded_logged_name = encodeURIComponent(logged_name);
const encoded_logged_acct_type = encodeURIComponent(logged_acct_type);

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Query the form
const form = document.querySelector('form');

// Add Event Listener to Submit Button
form.addEventListener('submit', (e) => {
    // Prevent default form submission
    e.preventDefault();
    
    console.log("Submit Button Pressed");

    // Encode each parameter to send to employee page
    // const encodedFirst = encodeURIComponent(encodedFirstName);
    
    // Redirect URL params based on account type
    if (acct_type === 'Manager') {
        console.log("Redirecting to Manager Page");
        window.location.href = `manager.html?first_name=${encoded_logged_name}&acct_type=${encoded_logged_acct_type}`;
        // window.location.href = `manager.html?first_name=${encodedFirstName}&last_name=${encodedLastName}&acct_type=${acct_type}&encodedPinConfirm=${pin_number}`;
    } else {
        console.log("Redirecting to Employee Page");
        window.location.href = `employee.html?first_name=${encoded_logged_name}&acct_type=${encoded_logged_acct_type}`;
        // window.location.href = `/html/dashboards/employee.html?first_name=${encodedFirstName}&last_name=${encodedLastName}&acct_type=${acct_type}&encodedPinConfirm=${pin_number}`;
    }
});


// CHECKING IF THE USERNAME IS AVAILABLE

// Query username
const username = document.getElementById("confirmed_name").innerHTML;

// Next check if that user exists in the local storage
function isUsernameAvailable(username) {
    // parse the json (which is what is stored in local storage)
    var users = JSON.parse(localStorage.getItem('users')) || [];
    // check if a username is already taken in your users array
    return !users.some(user => user.username === username);
}

// // Check if the username is available
function checkUsername() {
    // Get the username from the input field
    var username = document.getElementById('username').value;

    // Check if the username is available
    if (isUsernameAvailable(username)) {
        // If the username is available, show a success message
        // document.getElementById('username_message').innerHTML = 'Username is available';
        // document.getElementById('username_message').style.color = 'green';
        console.log("Username is available");
    } else {
        // If the username is not available, show an error message
        // document.getElementById('username_message').innerHTML = 'Username is not available';
        // document.getElementById('username_message').style.color = 'red';
        console.log("Username is Not available");
    }
}
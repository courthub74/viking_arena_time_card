// Get URL Parameters (it's a search)
const urlParams = new URLSearchParams(window.location.search);

    
// First Name | Last Name | Account Type | Pin Number are all retrieved by ID

// Get the First Name from the URL Parameters and decode it
const encodedFirstName = urlParams.get('first_name') ? decodeURIComponent(urlParams.get('first_name')) : 'No First Name';
// console.log(encodedFirstName);

// Get the Last Name from the URL Parameters and decode it
const encodedLastName = urlParams.get('last_name') ? decodeURIComponent(urlParams.get('last_name')) : 'No Last Name';
// console.log(encodedLastName);

// Get the Account Type from the URL Parameters
const acct_type = urlParams.get('acct_type') ? decodeURIComponent(urlParams.get('acct_type')) : 'No Account Type';
// console.log(acct_type);

// Get the Pin Number from the URL Parameters
const pin_number = urlParams.get('encodedPinConfirm') ? decodeURIComponent(urlParams.get('encodedPinConfirm')) : 'No Pin Number';
// console.log(pin_number);

// Query the First Name, Last Name, Account Type, and Pin Number (to change the innerHTML)
const confirmed_name = document.getElementById('confirmed_name');
const confirmed_acct_type = document.getElementById('confirmed_acct_type');
const confirmed_pin = document.getElementById('confirmed_pin');


// inner HTML Elements changed

// Setting the Name div innerHTML with proper encoded parameters
confirmed_name.innerHTML = `${encodedFirstName} ${encodedLastName}`;
console.log(`The Name is: ${encodedFirstName} ${encodedLastName}`);

// The Account Type div
confirmed_acct_type.innerHTML = acct_type;
console.log(`The Account Type is: ${acct_type}`);

// The Pin Number div
confirmed_pin.innerHTML = pin_number;

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
// INCLUDE LOCAL STORAGE/DATABASE SCRIPTING WHICH UTILIZES THE SAME SUBMIT BUTTON




////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Add Event Listener to Submit Button
submit_acct_type.addEventListener('click', (e) => {
    // so submit doesn't refresh the page
    e.preventDefault();

    // Test print button function
    console.log("Submit Button Pressed");

    // Redirect to the Manager or Calendar page based on account type
    if (acct_type === 'Manager') {
        // Test Print
        console.log("Redirecting to Manager Page");
        // Send encoded data to the database
        // Redirect to Manager Page
        window.location.href = `../../html/dashboards/manager.html?first_name=${encodedFirstName}&last_name=${encodedLastName}&acct_type=${acct_type}&encodedPinConfirm=${pin_number}`;
    } else {
        // Test Print
        console.log("Redirecting to Employee Page");
        // Send encoded data to the database
        window.location.href = `../../html/dashboards/employee.html?first_name=${encodedFirstName}&last_name=${encodedLastName}&acct_type=${acct_type}&encodedPinConfirm=${pin_number}`;
    }
    // window.location.href = `acct_type.html?first_name=${encodedFirstName}&last_name=${encodedLastName}&acct_type=${acct_type}&encodedPinConfirm=${pin_number}`;

    // This is where you send info to database    
    // const url = 'https://jsonplaceholder.typicode.com/posts';
    // const data = {
    //     name: 'John Doe',
    //     account: 'Manager'
    //     pin: '1234'
    // };
    // fetch(url, {});
});

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
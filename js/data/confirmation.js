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

// Query the First Name, Last Name, Account Type, and Pin Number
const confirmed_name = document.getElementById('confirmed_name');
const confirmed_acct_type = document.getElementById('confirmed_acct_type');
const confirmed_pin = document.getElementById('confirmed_pin');


// inner HTML Elements to change

// The Name div
confirmed_name.innerHTML = `${encodedFirstName} ${encodedLastName}`;

// The Account Type div
confirmed_acct_type.innerHTML = acct_type;
console.log(acct_type);

// The Pin Number div
confirmed_pin.innerHTML = pin_number;

// Query the Submit Button
const submit_acct_type = document.getElementById('confirmation_advance');

// Change the inner HTML of the Submit Button upon account type selection
if (acct_type === 'Manager') {
    submit_acct_type.innerHTML = 'Go to Manager Page';
} else {
    submit_acct_type.innerHTML = 'Go to Your Calendar';
};

// Add Event Listener to Submit Button
submit_acct_type.addEventListener('click', (e) => {
    // so submit doesn't refresh the page
    e.preventDefault();

    // Test print button function
    console.log("Submit Button Pressed");

    // Redirect to the next page (acct_type) with URL parameters
    // window.location.href = `acct_type.html?first_name=${encodedFirstName}&last_name=${encodedLastName}&acct_type=${acct_type}&encodedPinConfirm=${pin_number}`;

    // This is where you send info to database    
    // const url = 'https://jsonplaceholder.typicode.com/posts';
    // const data = {}
});
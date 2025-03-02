// Query the Form
const form = document.querySelector('form');

// Query the Buttons

/////////// Employer ///////////

// Manager
const manager = document.getElementById('manager');

/////////// Employees ///////////

// Zamboni
const zamboni = document.getElementById('zamboni_driver');

// Skate Instructor
const skateInstructor = document.getElementById('skate_instructor');

// Skate Guard
const skateGuard = document.getElementById('skate_guard');


// Query the Submit Button
const submit_acct_type = document.getElementById('submit_acct_type');

// Enable the Submit Button after a Radio Button is Clicked
form.addEventListener('click', function() {
    if (manager.checked || zamboni.checked || skateInstructor.checked || skateGuard.checked) {
        submit_acct_type.disabled = false;
        console.log('Submit Button Enabled');
    }
});



// Retrieve the URL Parameters
const urlParams = new URLSearchParams(window.location.search);

// Get the Encoded First Name from the URL Parameters and decode it
const encodedFirstName = urlParams.get('first_name') ? decodeURIComponent(urlParams.get('first_name')) : 'No First Name';
console.log(encodedFirstName);

// Get the Encoded Last Name from the URL Parameters and decode it
const encodedLastName = urlParams.get('last_name') ? decodeURIComponent(urlParams.get('last_name')) : 'No Last Name';
console.log(encodedLastName);

// Get the Encoded Pin Confirm from the URL Parameters and decode it
const encodedPinConfirm = urlParams.get('pin_confirm') ? decodeURIComponent(urlParams.get('pin_confirm')) : 'No Pin Number';
console.log(encodedPinConfirm);



// Add Event Listener to Submit Button
form.addEventListener('submit', (e) => {
    // so submit doesn't refresh the page
    e.preventDefault();

    // Test print button function
    console.log("Submit Button Pressed");

    // Redirect to the next page (pin number) with URL parameters 
    if (manager.checked) {
        window.location.href = `confirmation.html?acct_type=manager&encodedFirstName=${encodedFirstName}&encodedLastName=${encodedLastName}&encodedPinConfirm=${encodedPinConfirm}`;
    } else if (zamboni.checked) {
        window.location.href = `confirmation.html?acct_type=zamboni&encodedFirstName=${encodedFirstName}&encodedLastName=${encodedLastName}&encodedPinConfirm=${encodedPinConfirm}`;
    } else if (skateInstructor.checked) {
        window.location.href = `confirmation.html?acct_type=skate_instructor&encodedFirstName=${encodedFirstName}&encodedLastName=${encodedLastName}&encodedPinConfirm=${encodedPinConfirm}`;
    } else if (skateGuard.checked) {
        window.location.href = `confirmation.html?acct_type=skate_guard&encodedFirstName=${encodedFirstName}&encodedLastName=${encodedLastName}&encodedPinConfirm=${encodedPinConfirm}`;
    }
});


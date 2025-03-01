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
    }
});


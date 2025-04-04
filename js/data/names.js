// REGISTER THE USER

// Query the names form
const names_form = document.getElementById('names_form');

// Query the submit button
const submit_names = document.getElementById('submit_login');

// Query the names notify
const names_alert = document.getElementById('name_notify');

// Query the first name
const firstname = document.getElementById('firstname');

// Query the last name
const lastname = document.getElementById('lastname');

// Add event listener to the last name input to check if the first and last names are filled
// Then enable submit button (by typing, pasting or speech)
lastname.addEventListener('input', (e) => {
    e.preventDefault();
    if (firstname.value && lastname.value) {
        console.log("Both inputs are filled");
        submit_names.disabled = false;
    } else {
        submit_names.disabled = true;
    }
});

// // Function to check if the inputs are filled and enable the submit button regardless of the event type
// function checkInputs() {
//     if (firstname.value && lastname.value) {
//         submit_names.disabled = false;
//     } else {
//         submit_names.disabled = true;
//     }
// }

// // Enable submit button when both inputs are filled by typing 

// // First Name
// firstname.addEventListener('keyup', (e) => {
//     e.preventDefault();
//     checkInputs();
// });

// // Last Name
// lastname.addEventListener('keyup', (e) => {
//     e.preventDefault();
//     checkInputs();
// });

// // Listen for the event input (captures all input methods including speech)
// firstname.addEventListener('input', checkInputs);
// lastname.addEventListener('input', checkInputs);

// Add event listener to submit button to register the user
names_form.addEventListener('submit', (e) => {
    // so submit doesn't refresh the page
    e.preventDefault();

    // Test print button function
    console.log("Submit Button Pressed");

    // Query the firstname
    const firstname = document.getElementById('firstname');

    // Query the lastname
    const lastname = document.getElementById('lastname');

    //Retrieve user first name text, store it in variable
    let first = firstname.value;
    // Test print for now
    console.log(first);

    // Retrieve user last name text, store it in variable
    let last = lastname.value;
    // Test print for now
    console.log(last);


    // Encode parameters
    const encodedFirst = encodeURIComponent(first);
    const encodedLast = encodeURIComponent(last);
    
    // Redirect to the next page (pin number) with URL parameters 
    window.location.href = `pin_number.html?first_name=${encodedFirst}&last_name=${encodedLast}`;
});
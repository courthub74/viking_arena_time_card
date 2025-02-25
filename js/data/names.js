// REGISTER THE USER

// Query the names form
const names_form = document.getElementById('names_form');

// Query the firstname
const firstname = document.getElementById('firstname');

// Query the lastname
const lastname = document.getElementById('lastname');

// Add event listener to submit button to register the user
names_form.addEventListener('submit', (e) => {
    // so submit doesn't refresh the page
    e.preventDefault();

    // Test print button function
    console.log("Submit Button Pressed");

    //Retrieve user first name text, store it in variable
    let first = firstname.value;
    // Test print for now
    console.log(first);

    // Retrieve user last name text, store it in variable
    let last = lastname.value;
    // Test print for now
    console.log(last);
});
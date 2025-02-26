// REGISTER THE USER

// Query the names form
const names_form = document.getElementById('names_form');

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
    window.location.href = `pin_number.html?first_init=${encodedFirst}&last_name=${encodedLast}`;
});
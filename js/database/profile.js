// When page is loaded
document.addEventListener('DOMContentLoaded', (e) => {
    // Query the divs for display

    // NAME
    const name_circle = document.getElementById("name_circle");

    // ACCOUNT
    const profile_acct_type = document.getElementById("profile_acct_type");

    // PIN NUMBER
    const profile_pin_type = document.getElementById("profile_pin_type");


    // Get the users array from the local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Map Through the users and match the one registered
    // OR take the JS from the confirmation Page

});

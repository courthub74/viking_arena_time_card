// For the Header and the slide ins on the employee calendar page
// // At the top of your JS file or in a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
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
});
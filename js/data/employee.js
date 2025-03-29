// THE ALGRORITHM FOR GETTING FROM THE URL PARAMETERS

// Page One

// Query the input 
// Get the input.value
// store it in a variable
// Encode the variable
// Redirect to the next page with URL parameters

// Page Two
// retrieve the URL parameters

// ALGORITHM FOR GETTING DATA FROM LOCAL STORAGE DATABASE

// Need to determine if the user is logged in or not
// If logged in, show the profile name and account type
// If not logged in, show "Not Logged In" and "N/A"

// Receiving page

// localStorage.getItem('the_item') || 'You Don't have the item'

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//I REALIZE THAT I NEED TO CREATE THE LOGIN PAGE FIRST AND THEN 
// THE EMPLOYEE PAGE
//////////////////////////////////////////////////////////////////////

// At the top of your JS file or in a DOMContentLoaded event listener
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
    // Check if the user is logged in or not
    // Get the current user from session storage
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  
    // Check if the user is logged in
    if (currentUser) {
        // If the user is logged in, show their profile name and account type
        slide_in_profile_name.innerHTML = currentUser.username;
        slide_in_account_type.textContent = currentUser.accountType;
    }
});
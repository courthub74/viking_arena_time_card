// THE ALGRORITHM

// Page One

// Query the input 
// Get the input.value
// store it in a variable
// Encode the variable
// Redirect to the next page with URL parameters

// Page Two
// retrieve the URL parameters

// At the top of your JS file or in a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Retrieve individual parameters
    const firstName = urlParams.get('first_name') ? decodeURIComponent(urlParams.get('first_name')) : 'No First Name';
    const lastName = urlParams.get('last_name') ? decodeURIComponent(urlParams.get('last_name')) : 'No Last Name';
    const acctType = urlParams.get('acct_type') ? decodeURIComponent(urlParams.get('acct_type')) : 'No Account Type';
    const pinNumber = urlParams.get('encodedPinConfirm') ? decodeURIComponent(urlParams.get('encodedPinConfirm')) : 'No Pin Number';
    
    // Log the retrieved values (optional)
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Account Type:', acctType);
    console.log('PIN:', pinNumber);
});
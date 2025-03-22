// Get URL Parameters (it's a search)
const urlParams = new URLSearchParams(window.location.search);

console.log(urlParams);    
// First Name | Last Name | Account Type | Pin Number are all retrieved by ID

// Get the First Name from the URL Parameters and decode it
const encodedFirstName = urlParams.get('first_name') ? decodeURIComponent(urlParams.get('first_name')) : 'No First Name';
console.log(`The encoded First name: ${encodedFirstName}`);

// Get the Last Name from the URL Parameters and decode it
const encodedLastName = urlParams.get('last_name') ? decodeURIComponent(urlParams.get('last_name')) : 'No Last Name';
// console.log(encodedLastName);

// Get the Account Type from the URL Parameters
const acct_type = urlParams.get('acct_type') ? decodeURIComponent(urlParams.get('acct_type')) : 'No Account Type';
// console.log(acct_type);

// Get the Pin Number from the URL Parameters
const pin_number = urlParams.get('encodedPinConfirm') ? decodeURIComponent(urlParams.get('encodedPinConfirm')) : 'No Pin Number';
// console.log(pin_number);

// document.addEventListener('DOMContentLoaded', (e) => {
//     // Test Print
//     console.log("Employee JS");
//     // Get the URL parameters
//     const urlParamsEmployee = new URLSearchParams(window.location.search);

//     console.log("Full URL:", window.location.href);
//     console.log("Search part:", window.location.search);
    
//     // Retrieve individual parameters
//     const firstName = urlParamsEmployee.get('first_name');
//     const lastName = urlParamsEmployee.get('last_name');
//     const acctType = urlParamsEmployee.get('acct_type');
//     const pinNumber = urlParamsEmployee.get('encodedPinConfirm');
    
//     // Decode the parameters if they were encoded
//     const decodedFirstName = firstName ? decodeURIComponent(firstName) : 'Didnt Get Firstname';
//     const decodedLastName = lastName ? decodeURIComponent(lastName) : 'Didnt Get Lastname';
    
//     // Log the retrieved values (for debugging)
//     console.log('First Name:', decodedFirstName);
//     console.log('Last Name:', decodedLastName);
//     console.log('Account Type:', acctType);
//     console.log('PIN:', pinNumber);
    
//     // Then change the inner HTML to the value

//     //  Query the ID
//     const employee_id = document.getElementById('employee_name');

//     // Create whole name (concatenate)
//     let whole_name = `${firstName} ${lastName}`;

//     console.log(whole_name);

//     // Change HTML
//     employee_id.innerHTML = whole_name;
// });

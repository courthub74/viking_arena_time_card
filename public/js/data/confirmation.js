// Get URL Parameters (it's a search)
const urlParams = new URLSearchParams(window.location.search);

console.log(urlParams);    
// First Name | Last Name | Account Type | Pin Number are all retrieved by ID

// Get the First Name from the URL Parameters and decode it
const encodedFirstName = urlParams.get('first_name') ? decodeURIComponent(urlParams.get('first_name')) : 'No First Name';
console.log(`The encoded First name: ${encodedFirstName}`);

// Get the Last Name from the URL Parameters and decode it
const encodedLastName = urlParams.get('last_name') ? decodeURIComponent(urlParams.get('last_name')) : 'No Last Name';
console.log(`The encoded Last name: ${encodedLastName}`);

// Get the Account Type from the URL Parameters
const acct_type = urlParams.get('acct_type') ? decodeURIComponent(urlParams.get('acct_type')) : 'No Account Type';
console.log(`The encoded Account type: ${acct_type}`);

// Get the Pin Number from the URL Parameters
const pin_number = urlParams.get('encodedPinConfirm') ? decodeURIComponent(urlParams.get('encodedPinConfirm')) : 'No Pin Number';
// console.log(pin_number);

// Query the First Name, Last Name, Account Type, and Pin Number (to change the innerHTML)
const confirmed_name = document.getElementById('confirmed_name');
const confirmed_acct_type = document.getElementById('confirmed_acct_type');
const confirmed_pin = document.getElementById('confirmed_pin');

// Query the sidebar elements
const sidebar_first_name = document.getElementById('profile_name');
const sidebar_account_type = document.getElementById('profile_account');

// Test Print Names
console.log(`${encodedFirstName} ${encodedLastName}`);
// inner HTML Elements changed

// Setting the Name div innerHTML with proper encoded parameters
confirmed_name.innerHTML = `${encodedFirstName} ${encodedLastName}`;
console.log(`The Name is: ${encodedFirstName} ${encodedLastName}`);

// The Account Type div
confirmed_acct_type.innerHTML = acct_type;
console.log(`The Account Type is: ${acct_type}`);

// The Pin Number div
confirmed_pin.innerHTML = pin_number;

// NOW, we need to set the sidebar elements
sidebar_first_name.innerHTML = `${encodedFirstName} ${encodedLastName}`;
sidebar_account_type.innerHTML = acct_type;

/////////////////////////////////////////////////////////////////

// Variables to encode to send to the next page
// const logged_name = sidebar_first_name.innerHTML.split(' ')[0];
// const logged_name = sidebar_first_name.innerHTML;
// const logged_acct_type = sidebar_account_type.innerHTML;
// console.log(`The logged name is: ${logged_name}`);
// console.log(`The logged account type is: ${logged_acct_type}`);
/////////////////////////////////////////////////////////////////

// Query the Submit Button
const submit_acct_type = document.getElementById('confirmation_advance');

// Change the inner HTML of the Submit Button upon account type selection
if (acct_type === 'Manager') {
    submit_acct_type.innerHTML = 'Complete registration';
} else {
    submit_acct_type.innerHTML = 'Complete registration';
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// ENCODE THE VARIABLES TO SEND TO THE NEXT PAGE

// To Mongo DB
submit_acct_type.addEventListener('click', async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3000/api/employees/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: encodedFirstName,
        lastname: encodedLastName,
        pin: pin_number,
        role: acct_type
      })
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ Registration successful');
      // Redirect to login or dashboard, or show a confirmation message
      window.location.href = `/index.html`; // or dashboard if you want
    } else {
      console.error('❌ Registration failed:', data.message);
      alert('Registration failed. Try again.');
    }
  } catch (err) {
    console.error('⚠️ Error registering user:', err);
    alert('Error connecting to server. Try again.');
  }
});





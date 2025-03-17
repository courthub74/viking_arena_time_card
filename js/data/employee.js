 // First Query the name from the URL
 
 const urlParams = new URLSearchParams(window.location.search);

 console.log("Full URL:", window.location.href);
console.log("Search part:", window.location.search);
console.log("URL Parameters:", urlParams);
console.log("first_name param:", urlParams.get('first_name'));
console.log("last_name param:", urlParams.get('last_name'));
console.log("acct_type param:", urlParams.get('acct_type'));
console.log("encodedPinConfirm param:", urlParams.get('encodedPinConfirm'));

 console.log(urlParams);

 // Get the First Name from the URL Parameters and decode it
 const encodedFirstName = urlParams.get('first_name') ? decodeURIComponent(urlParams.get('first_name')) : 'No First Name';
 console.log(encodedFirstName);

 // Get the Last Name from the URL Parameters and decode it
 const encodedLastName = urlParams.get('last_name') ? decodeURIComponent(urlParams.get('last_name')) : 'No Last Name';
 console.log(encodedLastName);

 // Concatenate the two names
 const whole_name = `${encodedFirstName} ${encodedLastName}`;

 // Test Print
 console.log(whole_name);
 
 // Then change the inner HTML to the value

 // Get URL Parameters (it's a search)
 const urlParams = new URLSearchParams(window.location.search);

    
    // First Name | Last Name | Account Type | Pin Number are all retrieved by ID

    // Get the First Name from the URL Parameters and decode it
    const encodedFirstName = urlParams.get('first_name') ? decodeURIComponent(urlParams.get('first_name')) : 'No First Name';
    console.log(encodedFirstName);

    // Get the Last Name from the URL Parameters and decode it
    const encodedLastName = urlParams.get('last_name') ? decodeURIComponent(urlParams.get('last_name')) : 'No Last Name';
    console.log(encodedLastName);

    // Get the Account Type from the URL Parameters
    const acct_type = urlParams.get('acct_type');
    console.log(acct_type);

    // Get the Pin Number from the URL Parameters
    const pin_number = urlParams.get('encodedPinConfirm') ? decodeURIComponent(urlParams.get('encodedPinConfirm')) : 'No Pin Number';
    console.log(pin_number);
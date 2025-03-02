 // Get URL Parameters (it's a search)
 const urlParams = new URLSearchParams(window.location.search);

    // Get the Name from the URL Parameters and decode it
    // The Name | Account Type | Pin Number are all retrieved by ID
    const confirmed_name = urlParams.get('name') ? decodeURIComponent(urlParams.get('name')) : 'No Name';
    console.log(confirmed_name);

    // Get the Account Type from the URL Parameters
    const acct_type = urlParams.get('acct_type');
    console.log(acct_type);

    // Get the Pin Number from the URL Parameters
    const pin_number = urlParams.get('encodedPinConfirm') ? decodeURIComponent(urlParams.get('encodedPinConfirm')) : 'No Pin Number';
    console.log(pin_number);
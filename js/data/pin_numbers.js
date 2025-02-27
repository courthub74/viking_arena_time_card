// Query the pin inputs by whole div

// Query Set Pin field
const pin_set = document.querySelectorAll('.pin_put_set');

// Query Confirm Pin field
const pin_confirm = document.querySelectorAll('.pin_put_confirm');

// Query Submit Button
const submit_pins = document.getElementById('submit_login');

// Query the reset pins button
const reset_pins = document.getElementById('reset_button');


// Map through the Set Pin
const pin_set_value = [...pin_set].map((each_pin_set) => each_pin_set.value.join(""));
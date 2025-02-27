// Query the pin inputs by whole div

// Query Set Pin field
const pin_set = document.querySelectorAll('.pin_put_set');

// Query Confirm Pin field
const pin_confirm = document.querySelectorAll('.pin_put_confirm');

// Query Submit Button
const submit_pins = document.getElementById('submit_login');

// Query the reset pins button
const reset_pins = document.getElementById('reset_button');

// Query Match Confirm

// Match
let match_notify = document.querySelector('.match_');

// No Match
let no_match_notify = document.querySelector('.no_match');


// Map through the Set Pin
// const pin_set_value = [...pin_set].map((each_pin_set) => each_pin_set.value.join(""));

// JS for pin puts for key behavior
pin_set.forEach((input, key) => {
    // Add event listener function to the input argument that iterates thru the inputs
    input.addEventListener("keyup", function() {
        // IF each input has a value:
        if (this.value.length === 1) {
            // Move to the next input
            pin_set[key + 1].focus();
        }
        // if all 4 inputs are entered:
        if (key === 4) {
            // Map through and read the whole row of nums
            const pin_set_value = [...pin_set].map((each_pin_set) => each_pin_set.value.join(""));
            //Print the digits to the console
            console.log(`The First Pin Number is: ${pin_set_value}`);
            // After all 4 entered, jump to confirm
            pin_confirm[0].focus();
        }
    });
});

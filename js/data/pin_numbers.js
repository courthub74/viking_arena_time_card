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
// pin_set.forEach((input, key) => {
//     input.addEventListener('keyup', (e) => {
//         if (e.key === 'Backspace') {
//             if (key > 0) {
//                 pin_set[key - 1].focus();
//             }
//         } else {
//             if (key < pin_set.length - 1) {
//                 pin_set[key + 1].focus();
//             }
//         }
//     });
// });

// JS for pin puts for key behavior
// First Row
pin_set.forEach((input, key) => {
  // Add event listener function to input that iterates through the inputs
  input.addEventListener("keyup", (e) => {
    if (input.value) {
        // If all 4 inputs are filled, focus on the first confirm input
        if (key === 3) {
            // Let's read the Pin Nums for matching to the confirm pin
            const pin_set_value = [...pin_set].map((each_pin_set) => each_pin_set.value).join("");
            // Print digits to console
            console.log(`The First Pin #: ${pin_set_value}`);
            // Focus on the first confirm input
            pin_confirm[0].focus();
        } else {
            // Focus on the next input
            pin_set[key + 1].focus();
        }
    }
  });
});

// Second Row
pin_confirm.forEach((input_2, key_2) => {
  // Add event listener function to input that iterates through the inputs
  input_2.addEventListener("keyup", (e) => {
    if (input_2.value) {
        // If all 4 inputs are filled, focus on the submit button
        if (key_2 === 3) {
            // Let's read the Pin Nums for matching to the confirm pin
            const pin_confirm_value = [...pin_confirm].map((each_pin_confirm) => each_pin_confirm.value).join("");
            // Print digits to console
            console.log(`The Confirm Pin #: ${pin_confirm_value}`);
            // Focus on the submit button
            submit_pins.focus();
        } else {
            // Focus on the next input
            pin_confirm[key_2 + 1].focus();
        }
    }
  });
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// COMPARISON MAPS BELOW
// This is where the notification will be displayed also




//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// Event Listener for Submit Button
submit_pins.addEventListener('click', (e) => {
  // so submit doesn't refresh the page
  e.preventDefault();
  // Test print button function
  console.log("Submit Button Pressed");
  // This is where you encode the pin numbers
  // and Grab the First Name and Last Name from the URL
  // Redirect to the next page (pin number) with URL parameters
  // Query the set pin numbers
});

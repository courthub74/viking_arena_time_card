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

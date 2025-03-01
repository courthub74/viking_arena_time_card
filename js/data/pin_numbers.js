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

// Query the form
const form = document.querySelector('form');


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


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
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

// Pin Set Row
// (always have to map through the inputs)
pin_set.forEach((input_1) => {
  // Record Keys for first pin field comparison
  input_1.addEventListener("keyup", () => {
    // For the values entered in pin set row
    if (input_1.value) {
      // Test print
      console.log("pin set row: compare");
      // Map through the inputs for pin set row
      const pin_set_compare = [...pin_set].map((compare_pin_set) => compare_pin_set.value).join("");
      // Print digits to console
      console.log(`The First Pin #: ${pin_set_compare}`);
    }
  });
});

// Pin Confirm Row
// (always have to map through the inputs)
// (and provide a key for the comparison after all inputs are filled)
pin_confirm.forEach((input_2, key_2) => {
  // Record Keys for confirm pin field comparison
  input_2.addEventListener("keyup", () => {
    // For the values entered in pin confirm row
    if (input_2.value) {
      // You need all 4 inputs to compare
      if (key_2 === 3) {
        // Test print
        console.log("pin confirm row: compare");
        // Map through the inputs for pin confirm row
        const pin_confirm_compare = [...pin_confirm].map((compare_pin_confirm) => compare_pin_confirm.value).join("");
        // Print digits to console
        console.log(`The Confirm Pin #: ${pin_confirm_compare}`);
        // Compare the values
        // first get the values from the pin set row
        pin_set.forEach((input_1) => {
          if (input_1.value) {
            // Map through the inputs for pin set row
            const pin_set_compare = [...pin_set].map((compare_pin_set) => compare_pin_set.value).join("");
            // Print digits to console
            console.log(`The First Pin #: ${pin_set_compare}`);
            // Compare the values
            if (pin_set_compare === pin_confirm_compare) {
              // If the values match
              console.log("Match");
              // Display the Match Notification
              // match_notify.style.display = "block";
              match_notify.classList.add('entered');
              // no_match_notify.style.display = "none";
              // remove pins don't match
              no_match_notify.classList.remove('entered');
              // Enable the Submit Button
              submit_pins.disabled = false;
            } else {
              // If the values don't match
              console.log("No Match");
              // Display the No Match Notification
              // no_match_notify.style.display = "block";
              match_notify.classList.remove('entered');
              // match_notify.style.display = "none";
              no_match_notify.classList.add('entered');
              // Disable the Submit Button
              submit_pins.disabled = true;
            }
          }
        });
      }
    }
  });
});

// CLEAR BUTTON FUNCTIONALITY
////////////////////////////////////////////////////
////////////////////////////////////////////////////
// Call this function in the Clear button
const reset = () => {
  // Reset the form
  form.reset();
  // Delete the Match Notify
  // match_notify.classList.remove('entered');
  no_match_notify.style.display = "none";
  // Delete the No Match
  // no_match_notify.classList.remove('entered');
  match_notify.style.display = "none";
  // Disable the Submit Button
  submit_pins.disabled = true;
};

// Add event listener to the reset button
reset_pins.addEventListener('click', (e) => {
  // so submit doesn't refresh the page
  e.preventDefault();
  // Test print button function
  console.log("Reset Button Pressed");
  // Call the reset function
  reset();
});


//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// Event Listener for Submit Button
submit_pins.addEventListener('click', (e) => {
  // so submit doesn't refresh the page
  e.preventDefault();
  // Test print button function
  console.log("Submit Button Pressed");
  // Encode and send the pin values
  // This is where you encode the pin numbers
  // Map through the confirm Pin
  const pin_confirm_value = [...pin_confirm].map((each_pin_confirm) => each_pin_confirm.value).join("");
  // Encode parameters
  const encodedPinConfirm = encodeURIComponent(pin_confirm_value);
  // Redirect to the next page (pin number) with URL parameters
  window.location.href = `acct_type.html?pin_confirm=${encodedPinConfirm}`;
});


// // search for first name and last name in the URL
// const urlParams = new URLSearchParams(window.location.search);  
// // get the first name from the URL
// const first_name = urlParams.get('first_name') ? decodeURIComponent (urlParams.get('first_name')) : 'No First Name';
// // get the last name from the URL
// const last_name = urlParams.get('last_name') ? decodeURIComponent (urlParams.get('last_name')) : 'No Last Name';
// // get the pin number from the URL
// const encodedPinConfirm = urlParams.get('pin_confirm') ? decodeURIComponent (urlParams.get('pin_confirm')) : 'No Pin Number';
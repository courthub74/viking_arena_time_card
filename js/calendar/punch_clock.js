// Populate hours

console.log('punch_clock.js loaded');

// IN

// hours

// Query for the hour select element
const inHourSelect = document.getElementById('in_hour');
// Populate the hour select element with options from 1 to 12
for (let i = 1; i <= 12; i++) {
    // Create an option element for each hour
    const in_option = document.createElement('option');
    // Set the value and text content of the option element
    // value is set to each iteration
    in_option.value = i;
    // textContent is set to i, but if i is less than 10, it adds a leading zero
    in_option.textContent = i < 10 ? '0' + i : i;
    // Append the option element to the hour select element
    inHourSelect.appendChild(in_option);
    // Log the value of the option element to the console
    // This is for debugging purposes
    // console.log(in_option.value);
}

// set the select output html to the value of the option element


// minutes
const inMinuteSelect = document.getElementById('in_minute');
for (let i = 0; i < 60; i++) {
    const in_option = document.createElement('option');
    in_option.value = i;
    in_option.textContent = i < 10 ? '0' + i : i;
    inMinuteSelect.appendChild(in_option);
}

// Set current time as default
const now = new Date(); // This goes in the top date picker
// Query the DatePicker element
const datePicker = document.getElementById('current_day');
// Set the value of the DatePicker to the current date in YYYY-MM-DD format
datePicker.value = now.toISOString().split('T')[0]; // YYYY-MM-DD
// Set the value of the DatePicker to month name
datePicker.value = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
});

datePicker.placeholder = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
});


// Populate In Hours
let in_hours = now.getHours();
const ampm = in_hours >= 12 ? 'PM' : 'AM';
in_hours = in_hours % 12;
in_hours = in_hours ? in_hours : 12; // Convert 0 to 12
inHourSelect.value = in_hours;

// Populate In Minutes
inMinuteSelect.value = now.getMinutes();
document.getElementById('in_ampm').value = ampm;

// // Populate minutes
// const minuteSelect = document.getElementById('minute');
// for (let i = 0; i < 60; i++) {
//     const option = document.createElement('option');
//     option.value = i;
//     option.textContent = i < 10 ? '0' + i : i;
//     minuteSelect.appendChild(option);
// }

// // Set current time as default
// const now = new Date();
// let hours = now.getHours();
// const ampm = hours >= 12 ? 'PM' : 'AM';
// hours = hours % 12;
// hours = hours ? hours : 12; // Convert 0 to 12
// hourSelect.value = hours;
// minuteSelect.value = now.getMinutes();
// document.getElementById('ampm').value = ampm;
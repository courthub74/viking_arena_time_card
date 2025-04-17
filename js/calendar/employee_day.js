// Test print the page
console.log("Employee Day.js loaded");

// Query the submit button
const submit_button_employee_hours = document.getElementById('submit_employee_hours');

// Submit Button Event
submit_button_employee_hours.addEventListener('click', (e) => {

    // prevent default
    e.preventDefault();

    // Test Print
    console.log("Submit Button pressed");

    // Query the current Date
    const current_date = document.getElementById('current_day');

    // Set the value in a variable
    let the_day = current_date.value 

    // Test Print
    console.log(the_day);

    ///////////////////////////////////////////////////////////

    // Query the TIME IN 

    // Hour
    const time_in_hour = document.getElementById('in_hour');

    // Test Print
    // console.log(time_in_hour.value);

    // Minute 
    const time_in_minute = document.getElementById('in_minute');

    // Test Print
    // console.log(time_in_minute.value);

    // AM / PM
    const time_in_period = document.getElementById('in_ampm');

    // Test Print
    // console.log(time_in_period.value);

    // Concatenate the values
    let time_in_whole = `${time_in_hour.value} ${time_in_minute.value} ${time_in_period.value}`

    console.log(time_in_whole);
    ///////////////////////////////////////////////////////////

    // Query the TIME OUT 

    // Hour
    const time_out_hour = document.getElementById('out_hour');

    // Test Print
    // console.log(time_out_hour.value);

    // Minute 
    const time_out_minute = document.getElementById('out_minute');

    // Test Print
    // console.log(time_out_minute.value);

    // AM / PM
    const time_out_period = document.getElementById('out_ampm');

    // Test Print
    // console.log(time_out_period.value);

    // Concatenate the values
    let time_out_whole = `${time_out_hour.value} ${time_out_minute.value} ${time_out_period.value}`

    console.log(time_out_whole);

    // Create an entry object with the hours information
    

});



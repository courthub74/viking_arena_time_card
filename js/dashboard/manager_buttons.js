// Redirect to the proper page when clicked on after a split second

// Query the Dashboard buttons

// MANAGER //

//GET HOURS
const manager_hours = document.querySelector("#get_hours");

console.log(manager_hours);

//GET SCHEDULE
const manager_schedule = document.querySelector("#weeks_schedule");

//GET MESSAGES
const manager_messaging = document.querySelector("#manager_messaging");

// Now we will add the event listeners to the buttons
// MANAGER //
manager_hours.addEventListener("click", function(e) {
    e.preventDefault(); // Prevent the default action of the button
    manager_hours.classList.add("clicked");
    setTimeout(() => {
        manager_hours.classList.remove("clicked");
    }, 1000);
    setTimeout(() => {
        window.location.href = "../../manager_scheduler.html";
        window.location.href = "../../html/calendar/manager_scheduler.html";
    }, 1000);
});

manager_schedule.addEventListener("click", function(e) {
    e.preventDefault(); // Prevent the default action of the button
    manager_schedule.classList.add("clicked");
    setTimeout(() => {
        manager_schedule.classList.remove("clicked");
    }, 1000);
    setTimeout(() => {
        window.location.href = "../../manager_schedule.html";
    }, 1000);
});

manager_messaging.addEventListener("click", function(e) {
    e.preventDefault(); // Prevent the default action of the button
    manager_messaging.classList.add("clicked");
    setTimeout(() => {
        manager_messaging.classList.remove("clicked");
    }, 1000);
    setTimeout(() => {
        window.location.href = "../../manager_messaging.html";
    }, 1000);
});

// HERE make the delete account button merely redirect to the pin confirm delete page

// Query the delete button at slide in
const delete_btn_slide_in = document.getElementById('delete_acct_slide');

// Create an event listener to redirect to the pin confirm page
delete_btn_slide_in.addEventListener('click', (e) => {
    // Test Print
    console.log("Delete Slide In Clicked");

    // Prevent Default
    e.preventDefault();

    // Redirect to the Delete Account Pin confirm page
    window.location.href = '../../html/delete/delete_acct_pin.html';
});
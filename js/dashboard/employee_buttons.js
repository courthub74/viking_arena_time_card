
// EMPLOYEE // 

//HOURS
const employee_hours = document.querySelector("#employee_hours");

console.log(employee_hours);

//SCHEDULE
const employee_schedule = document.querySelector("#schedule_requests");

//MESSAGING
const employee_messaging = document.querySelector("#employee_messaging");


// Now we will add the event listeners to the buttons

// EMPLOYEE //
employee_hours.addEventListener("click", function(e) {
    e.preventDefault(); // Prevent the default action of the button
    employee_hours.classList.add("clicked");
    setTimeout(() => {
        employee_hours.classList.remove("clicked");
    }, 2000);
    setTimeout(() => {
        window.location.href = "../../employee_day.html";
        window.location.href = "../../html/calendar/employee_day.html";
    }, 500);
});

employee_schedule.addEventListener("click", function(e) {
    e.preventDefault(); // Prevent the default action of the button
    employee_schedule.classList.add("clicked");
    setTimeout(() => {
        employee_schedule.classList.remove("clicked");
    }, 2000);
    setTimeout(() => {
        window.location.href = "./employee_schedule.html";
    }, 500);
});

employee_messaging.addEventListener("click", function(e) {
    e.preventDefault(); // Prevent the default action of the button
    employee_messaging.classList.add("clicked");
    setTimeout(() => {
        employee_messaging.classList.remove("clicked");
    }, 2000);
    setTimeout(() => {
        window.location.href = "./employee_messaging.html";
    }, 500);
});
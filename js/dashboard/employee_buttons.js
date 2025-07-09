
// EMPLOYEE // 

//HOURS
const employee_hours = document.querySelector("#employee_hours");

//CALENDAR
const employee_calendar = document.querySelector("#employee_calendar");

//SCHEDULE
const employee_schedule = document.querySelector("#schedule_requests");



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

// View the Weekly Schedule
employee_schedule.addEventListener("click", function(e) {
    e.preventDefault(); // Prevent the default action of the button
    employee_schedule.classList.add("clicked");
    setTimeout(() => {
        employee_schedule.classList.remove("clicked");
    }, 2000);
    setTimeout(() => {
        window.location.href = "./emp_week_schedule.html";
        window.location.href = "../../html/calendar/emp_week_schedule.html";
    }, 500);
});

// View Month Calendar
employee_calendar.addEventListener("click", function(e) {
    e.preventDefault(); // Prevent the default action of the button
    employee_calendar.classList.add("clicked");
    setTimeout(() => {
        employee_calendar.classList.remove("clicked");
    }, 2000);
    setTimeout(() => {
        window.location.href = "./employee_calendar.html";
         window.location.href = "../../html/calendar/monthly_calendar.html"
    }, 500);
});



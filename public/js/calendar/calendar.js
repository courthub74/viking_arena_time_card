console.log("employee calendar.js loaded");

// Retrieve the current user from session storage
// let currentUser = JSON.parse(sessionStorage.getItem('session') || '{}');

// if (!currentUser || !currentUser.firstname || !currentUser.lastname) {
//     console.warn("⚠️ No valid session found. Redirecting to login.");
//     window.location.href = "/index.html";
//     return;
// }

// Construct full name
const loggedName = `${currentUser.firstname} ${currentUser.lastname}`;
const loggedAccountType = currentUser.role;

// Display user's name and role in header/sidebar
document.getElementById('employee_name').innerText = loggedName;
document.getElementById('profile_calendar_name').innerText = loggedName;
document.getElementById('profile_calendar_account').innerText = loggedAccountType;

console.log(`(calendar.js) Logged in as: ${loggedName} (${loggedAccountType})`);

// ==========================
// Fetch Work History from MongoDB
// ==========================
async function fetchWorkHistory() {
    try {
        const res = await fetch(`http://localhost:3000/api/employees/work-history`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstname: currentUser.firstname,
                lastname: currentUser.lastname
            })
        });

        const data = await res.json();

        if (data.success && data.workHistory) {
            console.log("📆 Work history:", data.workHistory);
            renderCalendarEntries(data.workHistory);
        } else {
            console.warn("⚠️ No work history found.");
        }
    } catch (error) {
        console.error("❌ Error fetching work history:", error);
    }
}

// ==========================
// Render Entries in Calendar View (or Console for now)
// ==========================
function renderCalendarEntries(entries) {
    // Example logic – replace with your actual calendar rendering
    entries.forEach(entry => {
        console.log(`📅 ${entry.date}: In @ ${entry.inTime}, Out @ ${entry.outTime}`);
        // You can inject into DOM here
        // const lastEntry = history[history.length - 1];
    //   console.log(`Date: ${lastEntry.date}, In: ${lastEntry.inTime}, Out: ${lastEntry.outTime}`);

      // Populate DOM
      document.getElementById('whole_date').textContent = entry.date;
      // document.getElementById('whole_date').textContent = "4:30PM";
      document.getElementById('time_in').textContent = entry.inTime;
      document.getElementById('time_out').textContent = entry.outTime;
    });
}

// Fetch data on load
fetchWorkHistory();


// console.log("employee calendar.js loaded");

// // Retrieve the current user from session storage
// var currentUser = sessionStorage.getItem('currentUser') || sessionStorage.getItem('session');


// // Parse the current user from JSON string to object
// var currentUser = JSON.parse(currentUser);
// // Test print the current user
// console.log(`(calendarJS)The current user is: ${currentUser.username} and their role is: ${currentUser.accountType} session: ${currentUser.sessionId}`);

// // Display the current user's name in the header
// const calendarNameHeader = document.getElementById('employee_name');
// // Decode the username from the session storage
// const loggedName = currentUser.username ? decodeURIComponent(currentUser.username) : 'Not Logged In';
// console.log(`(calendarJS)The logged in name is: ${loggedName}`);
// // Set the name header to the logged in user
// calendarNameHeader.innerHTML = loggedName;

// // Query the sidebar for the current user
// const sidebarNameHeader = document.getElementById('profile_calendar_name');
// // Change the inner HTML of the sidebar name header to the current user's name
// sidebarNameHeader.innerHTML = loggedName;
// // Decode the account type from the session storage
// const loggedAccountType = currentUser.accountType ? decodeURIComponent(currentUser.accountType) : 'Not Logged In';
// console.log(`(calendarJS)The logged in account type is: ${loggedAccountType}`);
// // Set the account type header to the logged in user
// const sidebarAccountTypeHeader = document.getElementById('profile_calendar_account');
// // Change the inner HTML of the sidebar account type header to the current user's account type
// sidebarAccountTypeHeader.innerHTML = loggedAccountType;
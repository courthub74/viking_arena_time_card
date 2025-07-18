document.addEventListener('DOMContentLoaded', () => {
  console.log("Employee Day Confirm Page Now");

  const confirmedUser = JSON.parse(sessionStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('session'));
  if (!confirmedUser) {
    alert("User got logged out");
    window.location.href = "/index.html";
  }

  const firstname = decodeURIComponent(confirmedUser.firstname);
  const lastname = decodeURIComponent(confirmedUser.lastname);
  console.log("Current User:", firstname, lastname);

  // ✅ CORRECT fetch to backend
  // fetch(`/api/work-history/${firstname}/${lastname}`)
  fetch(`/api/employees/work-history/${firstname}/${lastname}`)

    .then(response => {
      if (!response.ok) throw new Error("User not found in DB");
      return response.json();
    })
    .then(data => {
      const history = data.workhistory;
      if (!history || history.length === 0) {
        alert("No work history found for this user.");
        return;
      }

      const lastEntry = history[history.length - 1];
      console.log(`Date: ${lastEntry.date}, In: ${lastEntry.inTime}, Out: ${lastEntry.outTime}`);

      // Populate DOM
      document.getElementById('whole_date').textContent = lastEntry.date;
      // document.getElementById('whole_date').textContent = "4:30PM";
      document.getElementById('time_in').textContent = lastEntry.inTime;
      document.getElementById('time_out').textContent = lastEntry.outTime;
    })
    .catch(err => {
      console.error(err);
      alert("Failed to load work history.");
    });

});


// // Test Print Page
// console.log("Employee Day Confirm Page Now");

// // Retrieve the Day entered Information from the localstorage

// // Get logged in user from session storage
// const confirmedUser = JSON.parse(sessionStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('session'));

// // Decode the current username and store it in a variable
// // const currentUsername = currentUser ? currentUser.username : null;
// let confirmedUserName = decodeURIComponent(confirmedUser.username);
// // Test print
// console.log("Current User:", confirmedUserName);

// // Error Handling (in this case if user gets logged out)
// if (!confirmedUser) {
//     alert("User got logged out");
//     // return;
// }

// // Get all users from local storage
// const allUsers = JSON.parse(localStorage.getItem('users')) || [];

// // Testers to the console
// console.log("All users:", allUsers.map(user => user.username));
// console.log("All account types:", allUsers.map(user => user.accountType));
// console.log("All hours entered:", allUsers.map(user => user.hours));
// console.log(`Current user is ${confirmedUserName}`);


// // Find the logged in user in all users to retrieve the
//     // information from the hours array
// const confirmedUserIndex = allUsers.findIndex(user => user.username === confirmedUser.username);

// // Test the index
// console.log(confirmedUserIndex);

// // Test the actual information
// console.log(allUsers[confirmedUserIndex].username);

// // confirmedUserIndex is the current user in the actual database
//     // in this case, localStorage

// // Error handling 
// if (confirmedUserIndex === -1) {
//     alert('User not found in database');
//     // return;
// }

// // Get into the hours array for that particular user
// const confirmedUserAccountTypeIndex = allUsers.findIndex(user => user.accountType === confirmedUser.accountType);

// // Test this Index
// console.log(confirmedUserAccountTypeIndex);

// // Test the actual information
// console.log(allUsers[confirmedUserAccountTypeIndex].accountType);

// // Check if any hours are entered
// if (confirmedUserAccountTypeIndex === -1) {
//     alert("No Account type in the database");
// }

// // NOW lets try the HOURS
// const confirmedUserHours = allUsers.findIndex(user => user.hours === confirmedUser.hours);

// // Test this Index
// console.log(confirmedUserHours);

// // Use the confirmedUserIndex you already found earlier
// const userHours = allUsers[confirmedUserIndex].hours;


// // For Loop for userHours
// for (i = 0; i < userHours.length; i++) {
//     // I just want the last iteration
// }

// // NOW get the latest date entry
// const lastIndex = userHours.length - 1;

// // Set up the last entry as a variable
// const lastTimeEntry = userHours[lastIndex];

// // Test Prints
// console.log(`Date Entered: ${lastTimeEntry.date}`);
// console.log(`Time In Entered: ${lastTimeEntry.inTime}`);
// console.log(`Time Out Entered: ${lastTimeEntry.outTime}`);

// // Set up as variables

// // Date
// let date_ = lastTimeEntry.date;

// // Time In
// let in_ = lastTimeEntry.inTime;

// // Time Out
// let out_ = lastTimeEntry.outTime;



// // NOW populate the entry fields

// // FIRST query all 3

// // Date
// const date_entered = document.getElementById('whole_date');

// // Time In
// const time_in = document.getElementById('time_in');

// // Time Out
// const time_out = document.getElementById('time_out');


// // Change the innerHTMLs
// date_entered.innerHTML = date_;

// time_in.innerHTML = in_;

// time_out.innerHTML = out_;


// // Retrieve the Day entered Information from the DB
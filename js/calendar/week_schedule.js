// Test Print
console.log("Week Schedule JS Loaded");


// Current date tracker
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth(); // 0-11 (January-December)
let currentDay = currentDate.getDay(); // 0-6 (Sunday-Saturday)
let currentDayName = currentDate.toLocaleString('default', { weekday: 'short' });

console.log(currentMonth + 1);
console.log(currentYear);
console.log(currentMonth);
console.log(currentDay);
console.log(currentDayName);

// Function to format date as a readable string
function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

// Function to update the display
function updateDayDisplay() {
    const dayElement = document.getElementById('current-day');
    const today = new Date();
    
    // Check if current date is today
    if (currentDate.toDateString() === today.toDateString()) {
        dayElement.textContent = 'Today';
    } else {
        dayElement.textContent = formatDate(currentDate);
    }
}

// Function to go to previous day
function prevDay() {
    currentDate.setDate(currentDate.getDate() - 1);
    updateDayDisplay();
}

// Function to go to next day
function nextDay() {
    currentDate.setDate(currentDate.getDate() + 1);
    updateDayDisplay();
}

// Initialize the display when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateDayDisplay();
});

// Optional: Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        prevDay();
    } else if (event.key === 'ArrowRight') {
        nextDay();
    }
});

// Retrieve the current user from session storage
var currentUser = sessionStorage.getItem('session');
// Parse the current user from JSON string to object
var currentUser = JSON.parse(currentUser);
// Test print the current user
console.log(`The current user is: ${currentUser.username} and their role is: ${currentUser.accountType} session: ${currentUser.sessionId} from (logout.js)`);
// Check if the current user is null or undefined

// Menu functionality
const menuButton = document.getElementById('menu_burgers');
const burgerIcon = document.getElementById('burger_one');
// const burgerIcon2 = document.getElementById('burger_two');
const sideMenu = document.querySelector('.side-menu');
const overlay = document.querySelector('.menu-overlay');

function toggleMenu() {
    burgerIcon.classList.toggle('active');
    // burgerIcon2.classList.toggle('active');
    sideMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    // Body overflow set to ternery operator hidden or not hidden
    body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
}

menuButton.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sideMenu.classList.contains('active')) {
        toggleMenu();
    }
});

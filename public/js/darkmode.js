// Theme switching functionality
const themeSwitch = document.getElementById('theme_switch');
const body = document.body;

themeSwitch.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    // If the body contains dark mode, store it in a variable
    const isDarkMode = body.classList.contains('dark-mode');
    // store that variable into local storage
    localStorage.setItem('darkMode', isDarkMode);
});

// If the local storage is in dark mode, make the body of the page dark mode
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
}

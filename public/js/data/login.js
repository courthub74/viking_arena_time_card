// Updated login JS using MongoDB backend instead of localStorage
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('submit_login');
    const pinField = document.querySelectorAll('.pin_put');
    const usersDropdown = document.getElementById('users_dropdown');
    const clearPinsButton = document.getElementById('reset_button');
    const forgotPinButton = document.getElementById('forgot_button');
    // const loginSpinner = document.getElementById('login_spinner');

    loadUsers();

    async function loadUsers() {
         try {
        const res = await fetch('http://localhost:3000/api/employees/all');
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const users = await res.json();

        console.log('Fetched users:', users); // 🔍 Check the structure

        usersDropdown.innerHTML = '';
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.selected = true;
        defaultOption.disabled = true;
        // defaultOption.textContent = 'Select a name';
        usersDropdown.appendChild(defaultOption);

        users.forEach(user => {
            const fullName = `${user.firstname} ${user.lastname}`;
            const option = document.createElement('option');
            option.value = fullName;
            option.textContent = fullName;
            usersDropdown.appendChild(option);
        });
        } catch (err) {
            console.error('Failed to load users:', err);
        }

        usersDropdown.addEventListener('change', (e) => {
            setTimeout(() => {
                pinField[0].focus();
                pinField[0].setAttribute('readonly', 'readonly');
                setTimeout(() => pinField[0].removeAttribute('readonly'), 10);
            }, 100);
        });

        pinField.forEach((input, index) => {
            input.setAttribute('inputmode', 'numeric');

            input.addEventListener('keypress', e => {
                if (!/\d/.test(e.key)) e.preventDefault();
            });

            input.addEventListener('input', () => {
                input.value = input.value.replace(/\D/g, '');
                // Auto-advance to next input
                if (input.value.length === 1 && index < pinField.length - 1) {
                    pinField[index + 1].focus();
                }
            });

            input.addEventListener('keydown', e => {
                if (e.key === 'Backspace' && input.value === '' && index > 0) {
                    pinField[index - 1].focus();
                }
            });
        });


        pinField.forEach((input, key) => {
            pinField.forEach((input, key) => {
                input.addEventListener('keyup', async (e) => {
                    // When a number is typed or Enter is pressed
                    if (input.value && (key === 3 || e.key === 'Enter')) {
                        const pin_login_value = [...pinField].map(p => p.value).join('');
                        const selectedName = usersDropdown.value;

                        // Disable the login button and show spinner
                        loginButton.disabled = true;
                        // loginSpinner.style.display = 'block';


                        const response = await fetch('http://localhost:3000/api/employees/login', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: selectedName, pin: pin_login_value })
                        });

                        const data = await response.json();

                        // Hide spinner and enable login button
                        // loginSpinner.style.display = 'none';


                        if (data.success) {
                            loginButton.disabled = false;
                            pinField.forEach(pin => {
                                const isDark = document.body.classList.contains('dark-mode');
                                pin.style.color = isDark ? "#00FF00" : "#16BC00";
                            });

                            forgotPinButton.style.opacity = "0%";
                            clearPinsButton.innerHTML = `Pin is Correct`;
                            clearPinsButton.style.color = document.body.classList.contains('dark-mode') ? "#00FF00" : "#16BC00";

                            setTimeout(() => {
                                clearPinsButton.innerHTML = `Clear Pin fields`;
                                clearPinsButton.style.color = document.body.classList.contains('dark-mode') ? "#ffffff" : "#000000";
                                clearPinsButton.style.opacity = document.body.classList.contains('dark-mode') ? "50%" : "70%";
                                forgotPinButton.style.opacity = "100%";
                                pinField[0].focus();
                            }, 2000);

                            // ✅ Trigger login on Enter key press immediately
                            if (e.key === 'Enter') {
                                loginButton.click();
                            }

                            loginButton.addEventListener('click', (e) => {
                                e.preventDefault();
                                const session = {
                                    sessionId: Date.now(),
                                    firstname: data.employee.firstname,
                                    lastname: data.employee.lastname,
                                    pin: pin_login_value,
                                    role: data.employee.role
                                };
                                sessionStorage.setItem('session', JSON.stringify(session));

                                const encodedUserFullname = encodeURIComponent(`${data.employee.firstname} ${data.employee.lastname}`);
                                const encodedPin = encodeURIComponent(pin_login_value);

                                if (data.employee.role === 'Manager') {
                                    window.location.href = `/html/dashboards/manager.html?username=${encodedUserFullname}&role=Manager&encodedPinConfirm=${encodedPin}`;
                                } else {
                                    window.location.href = `/html/dashboards/employee.html?username=${encodedUserFullname}&role=Employee&encodedPinConfirm=${encodedPin}`;
                                }
                            });
                        } else {
                            forgotPinButton.style.opacity = "0%";
                            clearPinsButton.innerHTML = `Pin is Incorrect`;
                            clearPinsButton.style.color = "#BC0000";
                            clearPinsButton.style.opacity = "100%";

                            setTimeout(() => {
                                clearPinsButton.innerHTML = `Clear Pin fields`;
                                clearPinsButton.style.color = document.body.classList.contains('dark-mode') ? "#ffffff" : "#000000";
                                clearPinsButton.style.opacity = document.body.classList.contains('dark-mode') ? "55%" : "70%";
                                forgotPinButton.style.opacity = "100%";
                                pinField.forEach(pin => {
                                    pin.value = '';
                                    pin.style.color = '';
                                });
                                pinField[0].focus();
                            }, 2000);

                            loginButton.disabled = true;
                            pinField.forEach(pin => pin.style.color = 'red');
                            pinField[key + 1]?.focus();
                        }
                    }
                });
            });
        });
    }

    clearPinsButton.addEventListener('click', () => {
        pinField.forEach(pin => {
            pin.value = '';
            pin.style.color = '';
        });
        loginButton.disabled = true;
        pinField[0].focus();
    });

    forgotPinButton.addEventListener('click', () => {
        window.location.href = '../../html/forgot_pin.html';
    });
});

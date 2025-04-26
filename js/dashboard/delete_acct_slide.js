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
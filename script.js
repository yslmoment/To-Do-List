// Function to simulate login
function login() {
    var username = document.querySelector('.input-field[type="text"]').value;
    var password = document.querySelector('.input-field[type="password"]').value;
    
    // Example validation: check if the fields are not empty
    if (username.trim() === "" || password.trim() === "") {
        alert("Please fill in both username and password.");
        return;
    }
    
    // Simulate a server request/response
    console.log("Logging in with username:", username);
    // Assume success and redirect to another page or just alert success
    alert("Login successful!");
}

// Function to simulate signup
function signup() {
    var name = document.querySelectorAll('.input-field[type="text"]')[0].value;
    var username = document.querySelectorAll('.input-field[type="text"]')[1].value;
    var password = document.querySelectorAll('.input-field[type="password"]')[0].value;
    var confirmPassword = document.querySelectorAll('.input-field[type="password"]')[1].value;

    // Example validation: check if any field is empty
    if (name.trim() === "" || username.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Simulate a server request/response
    console.log("Signing up with username:", username);
    // Assume success and redirect or just alert success
    alert("Signup successful!");
}


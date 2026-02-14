// 1. Handle the "Signup" Button
document.getElementById('signupBtn').addEventListener('click', function(event) {
    
    // Get all values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value;

    // Clear previous errors
    document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
    
    let isValid = true;

    // --- CHECK 1: Username ---
    if (username.length < 5 || username.length > 15) {
        showError('usernameError', 'Username must be between 5 and 15 characters');
        isValid = false;
    }

    // --- CHECK 2: Email (New!) ---
    // This regex checks for text + @ + text + . + text
    const emailRules = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRules.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }

    // --- CHECK 3: Password Complexity ---
    const passwordRules = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
    if (!passwordRules.test(password)) {
        showError('passwordError', 'Password must be at least 8 characters, include a number and an uppercase letter');
        isValid = false;
    }

    // --- CHECK 4: Confirm Password ---
    if (password !== confirmPassword) {
        showError('confirmPasswordError', "Passwords do not match.");
        isValid = false;
    }

    // --- CHECK 5: Phone Number ---
    const phoneRules = /^\d{10}$/;
    if (!phoneRules.test(phone)) {
        showError('phoneError', 'Phone number must be exactly 10 digits');
        isValid = false;
    }

    // --- SUCCESS ---
    if (isValid) {
        alert("Account created successfully!");
        window.location.href = "login.html";
    }
});

// 2. Handle the "Back to Login" Button (New!)
document.getElementById('backBtn').addEventListener('click', function() {
    window.location.href = "login.html";
});

// 3. Helper Function to Show Errors
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.innerText = message;
        errorElement.style.display = 'block';
    } else {
        console.error("Error element not found: " + elementId);
    }
}
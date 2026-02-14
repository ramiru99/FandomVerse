/* --- 1. LOGIN LOGIC (Kept from before) --- */
const loginBtn = document.getElementById('loginBtn');
const createBtn = document.getElementById('createBtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

if(loginBtn) {
    loginBtn.addEventListener('click', handleLogin);
}
if(createBtn) {
    createBtn.addEventListener('click', function() {
        window.location.href = "signup.html";
    });
}

function handleLogin() {
    const user = usernameInput.value.trim();
    const pass = passwordInput.value.trim();

    if (user === "" || pass === "") {
        alert("Please fill in both Username and Password fields.");
        return;
    }

    // --- CHECK ADMIN ---
    if (user === "admin") {
        if (pass === "admin123") {
            localStorage.setItem("adminName", "Drifter");
            window.location.href = "admin_dashboard.html";
            return;
        } 
        else if (pass === "admin456") {
            localStorage.setItem("adminName", "Ryzlo");
            window.location.href = "admin_dashboard.html";
            return;
        }
        alert("Invalid Admin Credentials.");
        return; 
    }

    // --- REGULAR USER ---
    window.location.href = "index.html";
}

/* --- HIT ENTER FUNCTIONALITY --- */
if(usernameInput && passwordInput) {
    usernameInput.addEventListener('keydown', function(event) {
        if (event.key === "Enter") { event.preventDefault(); passwordInput.focus(); }
    });
    passwordInput.addEventListener('keydown', function(event) {
        if (event.key === "Enter") { event.preventDefault(); loginBtn.click(); }
    });
}


/* --- 2. SIDE SLIDESHOW LOGIC (Updated) --- */
document.addEventListener("DOMContentLoaded", () => {
    // Target the new class name: .side-slide
    const slides = document.querySelectorAll(".side-slide");
    
    // Only run if slides exist
    if(slides.length > 0) {
        let currentSlide = 0;

        // Change slide every 4 seconds
        setInterval(() => {
            // 1. Remove 'active' from current
            slides[currentSlide].classList.remove("active");

            // 2. Calculate next index
            currentSlide = (currentSlide + 1) % slides.length;

            // 3. Add 'active' to next
            slides[currentSlide].classList.add("active");
        }, 4000);
    }
});
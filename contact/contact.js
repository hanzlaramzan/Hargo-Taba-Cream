function validateForm(formType) {
    let username = document.getElementById(formType + "-username").value.trim();
    let email = document.getElementById(formType + "-email").value.trim();
    let message = document.getElementById(formType + "-textarea").value.trim();

    let userError = document.getElementById(formType + "-userError");
    let emailError = document.getElementById(formType + "-emailError");

    let isValid = true;

    // Clear previous errors
    userError.innerHTML = "";
    emailError.innerHTML = "";

    // Username validation
    if (username === "") {
        userError.innerHTML = "Name is required";
        isValid = false;
    } else if (username.length < 3) {
        userError.innerHTML = "Name must be at least 3 characters";
        isValid = false;
    }

    // Email validation
    if (email === "") {
        emailError.innerHTML = "Email is required";
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.innerHTML = "Enter a valid email";
        isValid = false;
    }

    return isValid;
}



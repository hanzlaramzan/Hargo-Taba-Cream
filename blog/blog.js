

// Form Validation
let userName = document.getElementById("username");
let userEmail = document.getElementById("email");
let flag = 1;

function validateForm() {
    if (userName.value == "") {
        document.getElementById("userError").innerHTML = "Username is Empty";
        flag = 0;
    } else if (userName.value.length < 3) {
        document.getElementById("userError").innerHTML = "Username is require min 3 char";
        flag = 0;
    } else {
        document.getElementById("userError").innerHTML = "";
        flag = 1;
    }
    if (userEmail.value == "") {
        document.getElementById("emailError").innerHTML = "Email is Empty";
        flag = 0;
    } else {
        document.getElementById("emailError").innerHTML = "";
        flag = 1;
    } if (flag) {
        return true;
    } else {
        return false;
    }
}
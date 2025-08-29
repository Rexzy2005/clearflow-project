
// hints
const fnameHint = document.getElementById('fname-hint'),
  lnameHint = document.getElementById('lname-hint'),
  signUpEmailHint = document.getElementById('signUpEmail-hint'),
  signUpPasswordHint = document.getElementById('signUpPassword-hint'),
  acceptHint = document.getElementById('accept-hint'),
  otpHint = document.getElementById('otp-hint'),
  femailHint = document.getElementById('femail-hint'),
  npassHint = document.getElementById('npass-hint'),
  cnpassHint = document.getElementById('cnpass-hint'),
  loginHint = document.getElementById('login-hint'),
  signupConfirmPasswordHint = document.getElementById('signupConfirmPassword-hint');

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  // at least 8 chars, 1 uppercase, 1 number, 1 special char
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);
}

// otp generator
let currentOTP = "";
let otpTimer = null;
let otpInterval = 59;
const countdown = document.getElementById('otp-countdown');
const resendBtn = document.getElementById('resend-otp');

function generateOTP(length = 4) {
  let digits = '0123456789';
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;

}
function startOTPGeneration() {
  currentOTP = generateOTP(4);
  console.log("Your OTP is: ", currentOTP);

  // send to email
  const userEmail = document.getElementById("signupEmail").value;
  sendOTP(userEmail, currentOTP);

  let timeLeft = otpInterval;

  // show countdown ()
  if (countdown) countdown.textContent = `${timeLeft}s`;
  resendBtn.disabled = true;

  if (otpTimer) clearInterval(otpTimer);

  otpTimer = setInterval(() => {
    timeLeft--;

    if (countdown) countdown.textContent = `${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(otpTimer);
      currentOTP = "";

      if (countdown) countdown.textContent = "Expired";
      resendBtn.disabled = false;
    }
  }, 1000);
}

// resend otp 
resendBtn.addEventListener('click', () => {
  startOTPGeneration();
});

// email setup start
function sendOTP(userEmail, otp) {
  emailjs.send("service_4028v7s", "template_8jjcuos", {
    to_email: userEmail,
    otp: otp
  })
    .then(() => {
      console.log("✅ OTP sent to " + userEmail);
      alert("OTP has been sent to your email!");
    })
    .catch((err) => {
      console.error("❌ Error sending email:", err);
      alert("Failed to send OTP. Try again!");
    });
}

// email setup end


// ===== SIGN UP VALIDATION =====
const signupForm = document.getElementById("signup");
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let valid = true;

  const fname = document.getElementById("fname");
  const lname = document.getElementById("lname");
  const email = document.getElementById("signupEmail");
  const password = document.getElementById("signupPassword");
  const cpassword = document.getElementById("signupConfirmPassword");
  const accept = document.getElementById("accept");


  // First name
  if (fname.value.trim() === "") {
    fname.style.border = '2px solid #e74c3c';
    valid = false;
  } else {
    fname.style.border = '2px solid #2ecc71';
  }

  // Last name
  if (lname.value.trim() === "") {
    lname.style.border = '2px solid #e74c3c';
    valid = false;
  } else {
    lname.style.border = '2px solid #2ecc71';
  }

  // Email
  if (email.value.trim() === "") {
    email.style.border = '2px solid #e74c3c';
    valid = false;
  } else if (!isValidEmail(email.value.trim())) {
    signUpEmailHint.style.color = '#e74c3c';
    signUpEmailHint.innerText = 'Enter a valid email';
    valid = false;
  } else {
    email.style.border = '2px solid #2ecc71';
  }

  // Password
  if (password.value.trim() === "") {
    password.parentElement.style.border = '2px solid #e74c3c';
    valid = false;
  } else if (!isValidPassword(password.value.trim())) {
    signUpPasswordHint.style.display = 'block';
    password.parentElement.style.border = '2px solid #e74c3c';
    signUpPasswordHint.style.color = '#e74c3c';
    signUpPasswordHint.innerText = 'Min 8 chars, 1 uppercase, 1 number, 1 special char';
    valid = false;
  } else {
    signUpPasswordHint.style.display = 'none';
    password.parentElement.style.border = '2px solid #2ecc71';
  }

  // Confirm Password
  if (cpassword.value.trim() === "") {
    cpassword.parentElement.style.border = '2px solid #e74c3c';
    valid = false;
  } else if (cpassword.value.trim() !== password.value.trim()) {
    signupConfirmPasswordHint.style.display = 'block';
    cpassword.parentElement.style.border = '2px solid #e74c3c';
    signupConfirmPasswordHint.innerText = 'Password is does not match';
    valid = false;
  } else {
    // signupConfirmPasswordHint.style.display = 'none';
    cpassword.parentElement.style.border = '2px solid #2ecc71';
  }

  // Terms
  const acceptSmall = accept.parentElement.querySelector("small");
  if (!accept.checked) {
    acceptHint.style.display = "block"
    acceptHint.textContent = "You must agree to continue";
    acceptHint.style.textAlign = "left";
    acceptHint.style.color = "#e74c3c";
    valid = false;
  } else {
    acceptHint.style.display = "none"
    acceptHint.textContent = "";
  }

  if (valid) {
    alert("Signup successful! Proceeding to OTP...");
    startOTPGeneration();
    signupForm.reset();
    showSection("otp");
  }
});

// ===== PASSWORD TOGGLE =====
document.querySelectorAll(".toggle-password").forEach((icon) => {
  icon.addEventListener("click", function () {
    const input = this.previousElementSibling; // the password input before the icon
    if (input.type === "password") {
      input.type = "text";
      this.classList.remove("fa-eye");
      this.classList.add("fa-eye-slash");
    } else {
      input.type = "password";
      this.classList.remove("fa-eye-slash");
      this.classList.add("fa-eye");
    }
  });
});


// ===== OTP Auto Move & Paste =====
const otpInputs = document.querySelectorAll(".opt-code-group .code");

otpInputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    const value = e.target.value;

    // Only allow digits
    if (!/^[0-9]$/.test(value)) {
      e.target.value = "";
      return;
    }

    // Move to next input if value entered
    if (value && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    // Move back on backspace
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpInputs[index - 1].focus();
    }
  });

  // Handle paste event
  input.addEventListener("paste", (e) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData("text");
    if (/^\d{4}$/.test(paste)) {
      otpInputs.forEach((inp, i) => {
        inp.value = paste[i] || "";
      });
      otpInputs[otpInputs.length - 1].focus(); // move cursor to last
    }
  });
});

// ===== OTP Submit Validation =====
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("otp1").focus();
});
document.getElementById("otp").addEventListener("submit", function (e) {
  e.preventDefault();
  const codes = document.querySelectorAll(".opt-code-group .code");

  let enteredOTP = "";

  codes.forEach((input) => {
    if (input.value.trim() === "") {
      input.style.borderColor = "red";
      valid = false;
    } else {
      input.style.borderColor = "green";
      enteredOTP += input.value.trim(); // build OTP string
    }
  });

  if (enteredOTP === currentOTP) {
    alert("OTP Verified Successfully!");
    showSection("login");

    // stop otp generation
    clearInterval(otpTimer);
    otpTimer = null;
    currentOTP = "";

    resendBtn.disabled = true;
    if (countdown) countdown.textContent = 'Verified';
  } else {
    otpHint.style.color = "#e74c3c"
    otpHint.textContent = "Invalid OTP. Try again!"
    otpHint.style.display = "block"
  }
});


// ===== LOGIN VALIDATION =====
document.getElementById("login").addEventListener("submit", function (e) {
  e.preventDefault();
  let valid = true;

  const email = document.getElementById("lemail");
  const password = document.getElementById("lpassword");

  if (!isValidEmail(email.value.trim())) {
    loginHint.style.color = "#e74c3c"
    loginHint.textContent = "All fields must be filled"
    loginHint.style.display = "block"
    email.style.border = "2px solid #e74c3c";
    valid = false;
  } else {
    loginHint.style.display = "none";
    email.style.border = "2px solid #2ecc71";
  }

  if (password.value.trim() === "") {
    loginHint.style.color = "#e74c3c"
    loginHint.textContent = "All fields must be filled"
    loginHint.style.display = "block"
    password.parentElement.style.border = "2px solid #e74c3c";
    valid = false;
  } else {
    loginHint.style.display = "none";
    email.style.border = "2px solid #2ecc71";
  }

  if (valid) {
    alert("Login successful!");
    window.location.href = "dashboard.html"; 
  }
});

// ===== FORGOTTEN PASSWORD =====
document.getElementById("fogottenpassword").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("femail");
  if (!isValidEmail(email.value.trim())) {
    femailHint.style.display = 'block';
    femailHint.style.color = '#e74c3c';
    femailHint.textContent = "Enter a valid email";
    email.style.border = "2px solid #e74c3c";
  } else {
    femailHint.style.display = 'none';
    femailHint.textContent = "Enter a valid email";
    email.style.border = "2px solid #2ecc71";
    alert("Reset link sent to your email!");
    showSection("resetpassword");
  }
});

// ===== RESET PASSWORD =====
document.getElementById("resetpassword").addEventListener("submit", function (e) {
  e.preventDefault();
  let valid = true;

  const npassword = document.getElementById("npassword");
  const cnpassword = document.getElementById("cnpassword");

  if (!isValidPassword(npassword.value.trim())) {
    npassHint.style.display = "block";
    npassHint.style.color = "#e74c3c";
    npassword.parentElement.style.border = "2px solid #e74c3c"
    npassHint.textContent = "Min 8 chars, 1 uppercase, 1 number, 1 special char";
    valid = false;
  } else {
    npassHint.style.display = "none";
    npassword.parentElement.style.border = "2px solid #2ecc71"
  }

  if (cnpassword.value.trim() !== npassword.value.trim() || cnpassword.value.trim() === "") {
    npassHint.style.display = "block";
    npassHint.style.color = "#e74c3c";
    cnpassword.parentElement.style.border = "2px solid #e74c3c"
    npassHint.textContent = "Passwords do not match";
    valid = false;
  } else {
    npassHint.style.display = "none";
    cnpassword.parentElement.style.border = "2px solid #2ecc71"

  }

  if (valid) {
    npassHint.style.display = "none";
    npassHint.style.color = "#2ecc71";
    npassHint.textContent = "Password reset successful!";
    showSection("login");
  }
});

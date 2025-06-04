const form = document.getElementById('signup-form');
const downloadBtn = document.getElementById('download-btn');
const adminLoginBtn = document.getElementById('admin-login-btn');
const adminEmailInput = document.getElementById('admin-email');
const adminPasswordInput = document.getElementById('admin-password');

// Admin credentials
const adminUsername = "admin123";
const adminPassword = "admin123";

// Google Apps Script Web App URL
const scriptURL = "https://script.google.com/macros/s/AKfycbyKLYAifCTkDILh0tM9lQWQ3mWcq0Dwm_DRGcvgOrHd52IRMq7z4iqUEg22Qqavdp2faQ/exec";

// Google Sheet direct view URL (for admin access)
const googleSheetURL = "https://docs.google.com/spreadsheets/d/14WD76Im1aGrk8cvj7Iq2H8Nqa1jdmCYRZRCN22qkr6s";

// Handle form submission
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();

  if (!firstName || !lastName || !email) {
    alert("Please fill in all required fields.");
    return;
  }

  const formData = new FormData();
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('email', email);
  formData.append('phone', phone);

  fetch(scriptURL, {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (response.ok) {
        alert(`Thanks, ${firstName}! Your spot is secured.`);
        form.reset();
      } else {
        alert("Submission failed. Please try again later.");
      }
    })
    .catch(error => {
      console.error("Submission error:", error);
      alert("An error occurred while submitting your form.");
    });
});

// Handle admin login
adminLoginBtn.addEventListener('click', function () {
  const inputUsername = adminEmailInput.value.trim();
  const inputPassword = adminPasswordInput.value;

  if (inputUsername === adminUsername && inputPassword === adminPassword) {
    alert("Admin access granted.");
    downloadBtn.style.display = 'block';
  } else {
    alert("Access denied. Incorrect credentials.");
  }
});

// Admin download opens live Google Sheet
downloadBtn.addEventListener('click', function () {
  window.open(googleSheetURL, "_blank");
});

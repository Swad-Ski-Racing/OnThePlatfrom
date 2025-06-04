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

  const payload = {
    firstName,
    lastName,
    email,
    phone
  };

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      alert(`Thanks, ${firstName}! Your spot is secured.`);
      form.reset();
    })
    .catch(err => {
      console.error("Submission failed", err);
      alert("There was an error submitting the form. Please try again.");
    });
});

// Handle admin login
adminLoginBtn.addEventListener('click', function () {
  const inputUsername = adminEmailInput.value.trim();
  const inputPassword = adminPasswordInput.value;

  if (inputUsername === adminUsername && inputPassword === adminPassword) {
    alert("Admin access granted");
    downloadBtn.style.display = 'block';
  } else {
    alert("Access denied");
  }
});

// CSV download button (manual for now)
downloadBtn.addEventListener('click', function () {
  alert("To download all signups, open the Google Sheet and go to File → Download → CSV.");
  window.open("https://docs.google.com/spreadsheets/d/14WD76Im1aGrk8cvj7Iq2H8Nqa1jdmCYRZRCN22qkr6s
", "_blank");
});

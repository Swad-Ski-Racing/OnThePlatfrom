const form = document.getElementById('signup-form');
const downloadBtn = document.getElementById('download-btn');
const adminLoginBtn = document.getElementById('admin-login-btn');
const adminEmailInput = document.getElementById('admin-email');
const adminPasswordInput = document.getElementById('admin-password');

// Admin credentials
const adminUsername = "admin123";
const adminPassword = "admin123";

// Google Apps Script Web App URL to submit data
const scriptURL = "https://script.google.com/macros/s/AKfycbyKLYAifCTkDILh0tM9lQWQ3mWcq0Dwm_DRGcvgOrHd52IRMq7z4iqUEg22Qqavdp2faQ/exec";

// Google Sheet URL for admin to download full data
const googleSheetURL = "https://docs.google.com/spreadsheets/d/14WD76Im1aGrk8cvj7Iq2H8Nqa1jdmCYRZRCN22qkr6s";

// Local data storage for form submissions
let csvData = JSON.parse(localStorage.getItem('signupData')) || [
  ['First Name', 'Last Name', 'Email', 'Phone Number']
];

// Save local data
function saveData() {
  localStorage.setItem('signupData', JSON.stringify(csvData));
}

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

  // Save locally for admin CSV download (optional)
  csvData.push([firstName, lastName, email, phone]);
  saveData();

  // Submit data to Google Sheets backend
  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, email, phone }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .catch(err => {
    console.error("Google Sheets submission failed:", err);
  });

  form.reset();
  alert(`Thanks, ${firstName}! Your spot is secured.`);
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

// When admin clicks download, open live Google Sheet (not localStorage)
downloadBtn.addEventListener('click', function () {
  window.open(googleSheetURL, "_blank");
});

const form = document.getElementById('signup-form');
const downloadBtn = document.getElementById('download-btn');
const adminLoginBtn = document.getElementById('admin-login-btn');
const adminEmailInput = document.getElementById('admin-email');
const adminPasswordInput = document.getElementById('admin-password');

// Admin credentials
const adminUsername = "admin123";
const adminPassword = "admin123";

// Load existing data or initialize new
let csvData = JSON.parse(localStorage.getItem('signupData')) || [
  ['First Name', 'Last Name', 'Email', 'Phone Number']
];

// Save csvData to localStorage
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

  csvData.push([firstName, lastName, email, phone]);
  saveData();
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

// Handle CSV download
downloadBtn.addEventListener('click', function () {
  const csvContent = 'data:text/csv;charset=utf-8,'
    + csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'signups.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

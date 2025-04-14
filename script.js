// Add this at the beginning of your script.js file

// Loading screen functionality
document.addEventListener("DOMContentLoaded", function() {
  // Add loading class to body
  document.body.classList.add("loading");
  
  // Hide the loading screen after animations complete
  setTimeout(function() {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.opacity = "0";
    
    // Remove the loading screen from DOM after fade out
    setTimeout(function() {
      loadingScreen.style.display = "none";
      document.body.classList.remove("loading");
    }, 500);
  }, 3000); // Show loading screen for 3 seconds (adjust as needed)
});


// Hamburger menu toggle function
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Certificate modal functions
function openCertificateModal(imgSrc, title) {
  const modal = document.getElementById("certificateModal");
  const modalImg = document.getElementById("modalCertificateImg");
  const modalTitle = document.getElementById("modalCertificateTitle");
  
  modal.style.display = "block";
  modalImg.src = imgSrc;
  modalTitle.innerText = title;
  
  // Disable body scroll when modal is open
  document.body.style.overflow = "hidden";
}

function closeCertificateModal() {
  const modal = document.getElementById("certificateModal");
  modal.style.display = "none";
  
  // Re-enable body scroll when modal is closed
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside the image
window.addEventListener("click", function(event) {
  const modal = document.getElementById("certificateModal");
  if (event.target === modal) {
    closeCertificateModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeCertificateModal();
  }
});

// Google Apps Script for form handling
function doPost(e) {
  try {
    // Log incoming data to see if it's being received correctly
    Logger.log("Received data: " + e.postData.contents);
    
    var sheet = SpreadsheetApp.openById("1oGOwgvhxWI8eFK4yemwlzhThSV2JPUKGeHVgny5JoBo").getSheetByName("Sheet1");
    
    // Check if the sheet is found
    if (!sheet) {
      Logger.log("Sheet not found. Please check the sheet name.");
      return ContentService.createTextOutput("Error: Sheet not found.")
                            .setMimeType(ContentService.MimeType.TEXT);
    }

    var data = JSON.parse(e.postData.contents);  // Parse the incoming data

    var timestamp = data.timestamp;
    var name = data.name;
    var email = data.email;
    var message = data.message;

    // Log the extracted values
    Logger.log('Timestamp: ' + timestamp);
    Logger.log('Name: ' + name);
    Logger.log('Email: ' + email);
    Logger.log('Message: ' + message);

    // Append the data to the sheet
    sheet.appendRow([timestamp, name, email, message]);

    Logger.log("Data appended successfully.");

    // Return a success response
    return ContentService.createTextOutput(JSON.stringify({"result": "success"}))
                          .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log the error for debugging
    Logger.log("Error: " + error.message);
    return ContentService.createTextOutput("Error: " + error.message)
                          .setMimeType(ContentService.MimeType.TEXT);
  }
}
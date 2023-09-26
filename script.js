const fileInput = document.getElementById("file");
const phoneMockup = document.querySelector(".phone-mockup");
let isDragging = false;
let offsetX, offsetY;
let selectedFile; // Declare selectedFile as a global variable
let imageUrl;

// Function to disable or hide the file input
function disableFileInput() {
    fileInput.disabled = true; // Disable the input
    fileInput.style.display = "none"; // Hide the input (optional)
}

// Add an event listener to the file input for change events
fileInput.addEventListener("change", function () {
    // Check if a file was selected
    if (fileInput.files && fileInput.files[0]) {
        // Get the selected file
        selectedFile = fileInput.files[0]; // Assign the selected file to the global variable

        // Create a URL for the selected file and set it as the background image
        imageUrl = URL.createObjectURL(selectedFile);
        phoneMockup.style.backgroundImage = `url(${imageUrl})`;

        // Hide the file icon
        const fileIcon = document.querySelector(".fa-file-circle-plus");
        fileIcon.style.display = "none";

        // Display the phone mockup with the background image
        phoneMockup.style.display = "block";

        // Enable drag-and-drop
        phoneMockup.style.cursor = "grab";
        phoneMockup.addEventListener("mousedown", startDrag);
        phoneMockup.addEventListener("mouseup", endDrag);

        // Disable or hide the file input
        disableFileInput();
    }
});

function startDrag(e) {
    isDragging = true;
    offsetX = e.clientX - phoneMockup.getBoundingClientRect().left;
    offsetY = e.clientY - phoneMockup.getBoundingClientRect().top;
    phoneMockup.style.cursor = "grabbing";
}

function endDrag() {
    isDragging = false;
    phoneMockup.style.cursor = "grab";
}

phoneMockup.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const x = e.clientX - offsetX - phoneMockup.getBoundingClientRect().left;
    const y = e.clientY - offsetY - phoneMockup.getBoundingClientRect().top;
    phoneMockup.style.backgroundPosition = x + "px " + y + "px";
});

// PRINTING
// Function to print the uploaded image using print.js
function printImage() {
    if (selectedFile) {
        // Create an image element to hold the uploaded image
        var img = new Image();
        img.src = imageUrl;

        // Print the image using print.js
        printJS({ printable: img.src, type: 'image', imageStyle: 'max-width:100%;' });
    } else {
        console.log("No file selected to print.");
    }
}

// Add a click event listener to the "Print" button
document.getElementById("print-button").addEventListener("click", function () {
    printImage();
});

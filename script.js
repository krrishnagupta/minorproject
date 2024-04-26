// Selecting all required elements
const dropArea = document.querySelector(".drag-area"),
  dragText = dropArea.querySelector("header"),
  button = dropArea.querySelector("button"),
  input = dropArea.querySelector("input");
let file; // This is a global variable and we'll use it inside multiple functions

button.onclick = () => {
  input.click(); // If user clicks on the button then the input also clicked
}

input.addEventListener("change", function() {
  // Getting user selected file and [0] this means if user selects multiple files then we'll select only the first one
  file = this.files[0];
  console.log("Selected file:", file);
  dropArea.classList.add("active");
  showFile(); // Calling function
});

// If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault(); // Preventing default behavior
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

// If user leaves dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

// If user drops File on DropArea
dropArea.addEventListener("drop", (event) => {
  event.preventDefault(); // Preventing default behavior
  // Getting user selected file and [0] this means if user selects multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  console.log("Dropped file:", file);
  showFile(); // Calling function
});

function showFile() {
  let fileType = file.type; // Getting selected file type
  console.log("File type:", fileType);
  // Adding some valid image and video extensions in array
  let validExtensions = ["image/jpeg", "image/jpg", "image/png", "video/mp4", "video/webm", "video/ogg", "video/mpeg", "video/quicktime"];
  if (validExtensions.includes(fileType)) { // If user selected file is an image or video file
    let fileReader = new FileReader(); // Creating new FileReader object
    fileReader.onload = () => {
      let fileURL = fileReader.result; // Passing user file source in fileURL variable
      let tag; // Variable to hold the tag based on file type
      if (fileType.includes("image")) {
        tag = `<img src="${fileURL}" alt="">`; // Creating an img tag for images
      } else if (fileType.includes("video")) {
        tag = `<video controls><source src="${fileURL}"></video>`; // Creating a video tag for videos
      }
      dropArea.innerHTML = tag; // Adding the created tag inside dropArea container
    }
    fileReader.readAsDataURL(file);
  }
}

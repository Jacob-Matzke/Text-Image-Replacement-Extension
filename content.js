console.log("Content script loaded!");

// Global variables
var isActivated = true;
var toReplace = "";
var replacement = "";
var imgURL = "";
var imgTitle = "";

replaceIMG();

// Function to replace matches in all paragraphs
function replaceP() {
  if ((toReplace == "") | (replacement == "")) {
    console.log("Invalid terms");
    return;
  }
  console.log("replacing...");
  const paragraphs = document.querySelectorAll("p");
  paragraphs.forEach((paragraph) => {
    var text = paragraph.innerHTML;
    paragraph.innerHTML = replaceText(text);
  });
  console.log("replacement complete!");
}

// Replaces instances of toReplace with replacement
function replaceText(text) {
  var index = text.indexOf(toReplace);
  const replaceLength = replacement.length;

  while (index != -1) {
    text =
      text.substring(0, index) +
      text.substring(index).replace(toReplace, replacement);
    index = text.indexOf(toReplace, index + replaceLength);
  }
  return text;
}

// Replaces all images with provided url
function replaceIMG() {
  if (imgURL == "") return;
  console.log("replacing...");
  const images = document.querySelectorAll("img");
  images.forEach((image) => {
    image.src = imgURL;
    image.srcset = imgURL;
    image.title = imgTitle;
  });
  console.log("replacement complete!");
}

// Process input from popup.html
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.toReplace) {
    toReplace = request.toReplace;
    console.log("Received data in content.js - toReplace:", toReplace);
  }

  if (request.replacement) {
    replacement = request.replacement;
    console.log("Received data in content.js - replacement:", replacement);
    replaceP();
  }

  if (request.imgURL) {
    imgURL = request.imgURL;
    console.log("Received data in content.js - imgURL: ", imgURL);
    replaceIMG();
  }

  if (request.imgTitle) {
    imgTitle = request.imgTitle;
    console.log("Received data in content.js - imgTitle: ", imgTitle);
    replaceIMG();
  }
});

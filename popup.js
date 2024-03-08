document.addEventListener("DOMContentLoaded", function () {
  const sendDataButton = document.getElementById("save");
  sendDataButton.addEventListener("click", sendData);
});

function sendData() {
  const toReplace = document.getElementById("toReplace").value;
  const replacement = document.getElementById("replacement").value;
  const imgURL = document.getElementById("imgURL").value;
  const imgTitle = document.getElementById("imgTitle").value;

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      toReplace,
      replacement,
      imgURL,
      imgTitle,
    });
  });
}

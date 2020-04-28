const preview = document.querySelector('audio');
var title = "Mr. Bell-Ding";

document.addEventListener("DOMContentLoaded", function() {

    if (localStorage.getItem("customSoundName") !== null){
        preview.src = localStorage.getItem("customSound");
    } else {
        console.log('no local storage')
        preview.src = "school-bell.mp3";
    }
    checkTime();
});

// Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange; 
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}
 
var videoElement = document.getElementById("video");

// If the page is hidden, pause the video;
// if the page is shown, play the video
function handleVisibilityChange() {
  if (document[hidden]) {
    videoElement.pause();
  } else {
    videoElement.play();
  }
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || hidden === undefined) {
  console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
  // Handle page visibility change   
  document.addEventListener(visibilityChange, handleVisibilityChange, false);
}


function previewFile() {
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
        localStorage.setItem("customSound", reader.result)
        localStorage.setItem("customSoundName", file.name);
        preview.src = localStorage.getItem("customSound");
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

function checkTime() {
    var d = new Date();
    if (d.getMinutes() == 00 && d.getSeconds() == 00 ) {
        console.log("ding");
        console.log(d.getHours());
        preview.play();
        document.title = title + "&nbsp;";
    } else if (d.getSeconds() == 01) {
        document.title = title;
    }
    setTimeout(checkTime, 501);
}

function ding() {
    preview.play();
}
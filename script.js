const preview = document.querySelector('audio');
var title = "Mr. Bell-Ding";

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function(){document.querySelector('.mdl-layout__drawer-button').click()}, 1000);

    if (localStorage.getItem("customSoundName") !== null){
        preview.src = localStorage.getItem("customSound");
    } else {
        preview.src = "school-bell.mp3";
    }    
    
    if (localStorage.getItem("top-of-hour") === null){
        localStorage.setItem("top-of-hour", "true");

    } else {
        if (localStorage.getItem("top-of-hour") == "true"){
            document.querySelector('.mdl-js-switch[name="top-of-hour"]').click()
        }
    }

    if (localStorage.getItem("bottom-of-hour") === null){
        localStorage.setItem("bottom-of-hour", "false");
    } else {
        if (localStorage.getItem("bottom-of-hour") == "true"){
            document.querySelector('.mdl-js-switch[name="bottom-of-hour"]').click()
        }
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
    console.log("pausing video background");
  } else {
    videoElement.play();
    console.log("resuming video background");
  }
}

if (typeof document.addEventListener === "undefined" || hidden === undefined) {
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
        
        gtag('event', 'setting', {
            'event_category': 'sound',
            'event_label': 'added custom sound',
            'value': customSoundName
        });

    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

function checkTime() {
    var d = new Date();
    if ( localStorage.getItem("top-of-hour") == "true" ){
        if ( d.getMinutes() == 00 && d.getSeconds() == 00 ) {
            ding("bottom");
        }
    }
    if ( localStorage.getItem("bottom-of-hour") == "true") {
        if ( d.getMinutes() == 30 && d.getSeconds() == 00 ) {
            ding("top");
            document.title = title + "&nbsp;";
        }
    }
    setTimeout(checkTime, 501);
}

function settingChange(setting) {
    field = document.getElementsByName(setting)[0];
        
    if (field.classList.contains("is-checked")) {
        localStorage.setItem(setting, "true");
    } else {
        localStorage.setItem(setting, "false");
    }

    return true;
}

function ding(slot) {
    document.title = title + " 🔔";
    preview.play();
    setTimeout(function(){document.title = title;}, 3000);

    gtag('event', 'ding', {
        'event_category': slot,
        'event_label': slot + ' ding',
        'value': Math.round((new Date()).getTime() / 1000)
    });
}
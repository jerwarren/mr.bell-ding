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
    
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');
    }
});


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
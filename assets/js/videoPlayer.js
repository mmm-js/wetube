const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumnBtn");
const fullScrnBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

function handlePlayClick(){
    if(videoPlayer.paused){
        videoPlayer.play();
        playBtn.innerHTML = "<i class='fas fa-pause'></i>";
    }else{
        videoPlayer.pause();
        playBtn.innerHTML = "<i class='fas fa-play'></i>";
    }
}

function handleVolumeClick(){
    if(videoPlayer.muted){
        videoPlayer.muted = false;
        volumeBtn.innerHTML = "<i class='fas fa-volume-up'></i>";
    }else{
        videoPlayer.muted = true;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}
// fullscreen 여부에 관한건 존재하지 않기 떄문에 이벤트를 제어해 줘야함
function goFullScreen(){
    if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
    } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
    } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
    }
    //videoContainer.requestFullscreen();
    fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
    fullScrnBtn.removeEventListener("click", goFullScreen);
    fullScrnBtn.addEventListener("click", exitFullScreen)
}

function exitFullScreen(){
    if (document.exitFullscreen) {
    document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
    }
    //document.exitFullscreen();

    fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>';
    // fullScrnBtn.removeEventListener("click", exitFullScreen);
    fullScrnBtn.addEventListener("click", goFullScreen);
}

const formatDate = seconds => {
    const secondsNumber = parseInt(seconds, 10);
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (totalSeconds < 10) {
        totalSeconds = `0${totalSeconds}`;
    }
    return `${hours}:${minutes}:${totalSeconds}`;
  };


function setTotalTime(){
    const totalTimeString = formatDate(videoPlayer.duration);
    totalTime.innerHTML = totalTimeString;
    setInterval(getCurrentTime, 1000);
}

function getCurrentTime(){
    currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

init = () => {
    playBtn.addEventListener("click", handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick);
    fullScrnBtn.addEventListener("click", goFullScreen);
    // video가 로드되지 않았기 때문에 videoPlayer.duration의 값을 가져오지 못함
    //setTotalTime();
    // 아래와 같이 metadata가 로드된 후 setTotalTime함수 호출
    videoPlayer.addEventListener("loadedmetadata",setTotalTime);
}

if(videoContainer){
    init();
}
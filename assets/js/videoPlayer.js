const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumnBtn");
const fullScrnBtn = document.getElementById("jsFullScreen");

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
    videoContainer.requestFullscreen();
    fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
    fullScrnBtn.removeEventListener("click", goFullScreen);
    fullScrnBtn.addEventListener("click", exitFullScreen)
}

function exitFullScreen(){
    document.exitFullscreen();
    fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>';
    // fullScrnBtn.removeEventListener("click", exitFullScreen);
    fullScrnBtn.addEventListener("click", goFullScreen);
}

init = () => {
    playBtn.addEventListener("click", handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick);
    fullScrnBtn.addEventListener("click", goFullScreen);
}

if(videoContainer){
    init();
}
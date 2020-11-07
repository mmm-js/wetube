const recordContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

// video 데이터 다운로드
const handleVideoData = (event) =>{
    console.log(event);
    //event.data를 videoFile명으로 선언
    const {data: videoFile } = event;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "test.webm";
    document.body.appendChild(link);
    link.click();
}

// 비디오 녹화중지
const stopRecording = () =>{
    videoRecorder.stop();
    recordBtn.removeEventListener("click", stopRecording);
    recordBtn.addEventListener("click", getVideo);
    recordBtn.innerHTML = "Start recording";
}

// 비디오를 녹화시작
const startRecording = () =>{
    // console.log(videoPreview.srcObject, streamObject);// 두가지가 같은지 확인
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    // dataavailable이벤트는 record가 다 끝나야 발생하는 이벤트
    videoRecorder.addEventListener("dataavailable", handleVideoData);
    recordBtn.addEventListener("click", stopRecording);
}

// 사용자 미디어디바이스를 통해 비디오를 얻는다.
const getVideo = async () => {
    try{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 }
        })
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        recordBtn.innerHTML = "Stop recording";

        streamObject = stream;
        startRecording();
    }catch(error){
        recordBtn.innerHTML = "😒 Cant record";
    }finally{
        recordBtn.removeEventListener("click",getVideo);
    }
}

function init(){
    recordBtn.addEventListener("click", getVideo);
}

if (recordContainer){
    init();
}
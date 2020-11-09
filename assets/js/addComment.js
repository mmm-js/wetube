import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");


const sendComment = async comment =>{
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: "post",
        data: {
            comment
        }
    });
    console.log(response);
}

const handleSubmit = (event) =>{
    event.preventDefault();// 새로고침이 되지 않게 하기위해
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = "";
}

function init(){
    addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
    init();
}
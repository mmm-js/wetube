import multer from "multer";
import routes from "./routes";

//파일 저장 destination 설정
const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = req.user || null; //req.user가 없다면 비어있는 object
  console.log(req.user);
  next();
};

//single : 하나의 파일만
//arg input name
export const uploadVideo = multerVideo.single("videoFile");

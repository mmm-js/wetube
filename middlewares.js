import multer from "multer";
import routes from "./routes";

//파일 저장 destination 설정
const multerVideo = multer({ dest: "videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};

//single : 하나의 파일만
//arg input name
export const uploadVideo = multerVideo.single("videoFile");

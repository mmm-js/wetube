import multer from "multer";
import routes from "./routes";

//파일 저장 destination 설정
const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null; //req.user가 없다면 비어있는 object
  console.log(req.user);
  next();
};

// 비로그인 상태일때만 허용하는 middleware
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

// 로그인 상태일때만
export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

//single : 하나의 파일만
//arg input name
export const uploadVideo = multerVideo.single("videoFile");

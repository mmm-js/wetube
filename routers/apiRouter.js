import express from "express";
import router from "../routes";
import {postRegisterView, postRegisterComment} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(router.registerView, postRegisterView);
apiRouter.post(router.registerComment, postRegisterComment);

export default apiRouter;
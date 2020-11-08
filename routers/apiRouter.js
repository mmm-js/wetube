import express from "express";
import router from "../routes";
import {postRegisterView} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(router.registerView, postRegisterView);

export default apiRouter;
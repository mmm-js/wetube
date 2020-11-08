import express from "express";
import router from "../routes";
import {registerView} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.get(router.registerView, registerView);

export default apiRouter;
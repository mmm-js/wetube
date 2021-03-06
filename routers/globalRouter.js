import express from "express";
import routes from "../routes";
import passport from "passport";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  logout,
  postJoin,
  getLogin,
  postLogin,
  githubLogin,
  postGithubLogin,
  getMe,
  facebookLogin,
  postFacebookLogin
} from "../controllers/userController";
import { onlyPrivate, onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

// 깃헙 로그인 요청
globalRouter.get(routes.github, githubLogin);
// 로그인 처리
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogin
);
// 로그인 사용자 프로필
globalRouter.get(routes.me, onlyPrivate, getMe);

// 페이스북 로그인 요청
globalRouter.get(routes.facebook, facebookLogin);
// 로그인 처리
globalRouter.get(routes.facebookCallback, passport.authenticate("facebook", { failureRedirect: "/login" }),
postFacebookLogin
)


export default globalRouter;

import passport from "passport";
import User from "./models/User";
import GithubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/userController";

// local strategy사용 = passport.use()(로그인 하는 방식)
passport.use(User.createStrategy());

// github strategy사용 = 참고: http://www.passportjs.org/packages/passport-github/
passport.use(
  new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: "http://localhost:4000/auth/github/callback",
  }),
  githubLoginCallback
);

// 쿠키에 user.id값을 담는다
passport.serializeUser(User.serializeUser());
// 쿠키에 있는 값으로 사용자 식별
passport.deserializeUser(User.deserializeUser());

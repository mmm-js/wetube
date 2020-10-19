import passport from "passport";
import routes from "./routes";
import User from "./models/User";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import { facebookLoginCallback, githubLoginCallback } from "./controllers/userController";

// local strategy사용 = passport.use()(로그인 하는 방식)
passport.use(User.createStrategy());

// github strategy사용 = 참고: http://www.passportjs.org/packages/passport-github/
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

// Facebook strategy사용 
passport.use(
  new FacebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    // callbackURL: `http://localhost:4000${routes.facebookCallback}`
    callbackURL: `https://56e468d8a5ad.ngrok.io${routes.facebookCallback}`,
    profileFields: ['id', 'displayName', 'photos', 'email'],
    scope: ['public_profile', 'email']
  }, facebookLoginCallback)
)

// 쿠키에 user.id값을 담는다
passport.serializeUser(User.serializeUser());
// 쿠키에 있는 값으로 사용자 식별
passport.deserializeUser(User.deserializeUser());

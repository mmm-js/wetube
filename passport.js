import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

// 쿠키에 user.id값을 담는다
passport.serializeUser(User.serializeUser());
// 쿠키에 있는 값으로 사용자 식별
passport.deserializeUser(User.deserializeUser());

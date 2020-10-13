import passport from "passport";
import User from "./models/User";

//strategy사용 = passport.use()(로그인 하는 방식)
passport.use(User.createStrategy());

// 쿠키에 user.id값을 담는다
passport.serializeUser(User.serializeUser());
// 쿠키에 있는 값으로 사용자 식별
passport.deserializeUser(User.deserializeUser());

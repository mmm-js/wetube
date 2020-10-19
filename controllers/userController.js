import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

// 사용자를 깃헙으로 보내는 함수
export const githubLogin = passport.authenticate("github");
// 사용자가 깃헙으로 갔다가 돌아오면서 사용자 정보를 가져오면 실행되는 함수
export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    // 깃헙에 넘어온 이메일이 이미 존재하는 이메일일 경우
    // 기존 user가 존재할 경우 avatarUrl은 변경하지 않음
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }

    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
// github 로그인
export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

// 사용자를 facebook으로 보내는 함수
export const facebookLogin = passport.authenticate('facebook'); 
// 사용자가 facebook으로 갔다가 돌아오면서 사용자 정보를 가져오면 실행되는 함수
export const facebookLoginCallback = async (accessToken, refreshToken, profile, cb) => {
  const { _json : {id, name, email}} = profile;
  try{
    const user = await User.findById({email});
    // 기존 user가 존재할 경우 avatarUrl은 변경하지 않음
    if(user){
      user.facebookId = id;
      user.save();
      return cb(null, user);
    }

    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl : `https://graph.facebook.com/${id}/picture?type=large`
    });
    return cb(null, newUser);
  }catch(error){
    return cb(error);
  }
}
// facebook 로그인
export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
}

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

// 로그인 사용자 프로필
export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
}

// 사용자 프로필
export const userDetail = async (req, res) => {
  const { params : { id }} = req;
  try{
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "User Detail", user });
  }catch(error){
    res.redirect(routes.home);
  }
}

// get 프로필 수정
export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
// post 프로필 수정
export const postEditProfile = async (req, res) => {
  const {
    body: {name , email},
    file
  } = req;

  try{
    await User.findByIdAndUpdate(req.user.id, {
      name, 
      email, 
      avatarUrl: file ? file.path : req.user.avatarUrl
    });
    res.redirect(routes.me);
  }catch(error){
    res.redirect(routes.editProfile);
  }
}

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });


export const postChangePassword = async(req, res) => {
  const {
    body : { oldPassword, newPassword, newPassword1}
  } = req;
  try{
    if(newPassword !== newPassword1){
      res.stauts(400).send('No');
      res.redircet(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  }catch(error){
    res.stauts(400);
    res.redirect(`/users${routes.changePassword}`);
  }
}
import User from "../models/User";


export const getJoin = (req, res) => {
    return res.render("user/join", { pageTitle: "Join Webster"});
}
export const postJoin = async (req, res) => {
    const pageTitle = "Join Webster!";
    const { email, password, password2, username } = req.body;

    const exists = await User.exists({ $or: [{ email }, { username }] });
    if (exists) {
        console.log("exists");
        return res.status(400).render("user/join", {            
            pageTitle,
            errorMessage: "! This email/username is already taken.",
        });
    }
    if (password !== password2) {
        return res.status(400).render("user/join", {
            pageTitle,
            errorMessage: "! Password confirmation does not match.",
        });
    }

    try {
      await User.create({
        email,
        password,
        username,
      });
      return res.redirect("/user/login");
    } catch (error) {
      console.log(error);
    }
};


export const account = (req, res) => {

};

export const getLogin = (req, res) => {
    return res.render("user/login", { pageTitle: "Login" }); 
};
export const postLogin = (req, res) => {
    return res.render("user/login", { pageTitle: "Login" }); 
};
export const logout = (req, res) => {

};

export const getEdit = (req, res) => {

};

export const postEdit = (req, res) => {

};

export const getChangePassword = (req, res) => {

};
export const postChangePassword = (req, res) => {

};
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
      return res.status(400).render("join", {
        pageTitle, errorMessage: error._message,
      });
    }
};


export const getLogin = (req, res) => {
    return res.render("user/login", { pageTitle: "Login" }); 
};
export const postLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne( { email });
    if (!user) {
        return res.status(400).render("login", {
            pageTitle: "Login",
            errorMessage: "An account with this e-mail does not exists."
        });        
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", {
            pageTitle: "Login",
            errorMessage: "Wrong Password" 
        });
    }    
    return res.redirect("/");
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

export const account = (req, res) => {

};
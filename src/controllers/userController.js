import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";


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
      console.log("user created");

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
        return res.status(400).render("user/login", {
            pageTitle: "Login",
            errorMessage: "An account with this e-mail does not exists."
        });        
    }

    const ok = bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", {
            pageTitle: "Login",
            errorMessage: "Wrong Password" 
        });
    }    
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};


export const startGithubLogin = (req, res) => {
    const baseURL = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: 'read:user user:email',
    }; 
    const params = new URLSearchParams(config).toString();
    const finalURL = `${baseURL}?${params}`;
    return res.redirect(finalURL);
};

export const finishGithubLogin = async (req, res) => {
    const baseURL = "https://github.com/login/oauth/access_token";    
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    }; 
    const params = new URLSearchParams(config).toString();
    const finalURL = `${baseURL}?${params}`;
    const apiURL = "https://api.github.com";

    const tokenRequest = await (
        await fetch(finalURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
            }
        })
    ).json();

    if ("access_token" in tokenRequest) {
        console.log("got access_token");
        const { access_token } = tokenRequest;
        const userData = await (
            await fetch(`${apiURL}/user`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();
        const emailData = await (
            await fetch(`${apiURL}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();        
        const emailObj = await emailData.find(
            (email) => email.primary === true && email.verified === true
        );

        if(!emailObj) {
            return res.redirect("/login");
        }

        let user = await User.findOne({ email: emailObj.email });
        if (!user) { 
            console.log("not user");
            user = await User.create({
                email: emailObj.email,
                password: "",
                username: userData.login,
                socialOnly: true,
                avatarPath: userData.avatar_url, 
                location: userData.location,
            });
            console.log("created");
        }
        req.session.loggedIn = true;
        req.session.user = user;
        console.log(user);
        return res.redirect("/");
        } else {
            return res.redirect("/login");
        }
    };




export const getEdit = async (req, res) => {
    return res.render("user/edit", { pageTitle: "Edit Profile" });    
};
export const postEdit = async (req, res) => {    
    const { session : { user : { _id, avatarPath } }, body: { email, username }, file } = req;
    const userBeforeUpdate = req.session.user;
    const pageTitle = "Edit Profile";
    const existingEmail = await User.exists( { email } );
    const existingUsername = await User.exists( { username } );
    const hasEmailNotChanged = Boolean(email === userBeforeUpdate.email);
    const hasUsernameNotChanged = Boolean(username === userBeforeUpdate.username);

    let hasAvatarNotChanged = true;
    let newAvatarPath = avatarPath;
    if (file) {    
        hasAvatarNotChanged = false;
        newAvatarPath = "/" + file.path;
    } else if (avatarPath === null) {
        newAvatarPath = `${WEBSTER_MARK}`;
    }

    let errorMessageArray = [];
    if ( email !== userBeforeUpdate.email && existingEmail ) {
        errorMessageArray.push("This e-mail has already taken by someone.");
    }
    if ( username !== userBeforeUpdate.username && existingUsername ) {
        errorMessageArray.push("This username has already taken by someone.");
    }    
    if ( errorMessageArray.length > 0 ) {
        return res.status(400).render("users/edit_profile", { pageTitle, errorMessage: errorMessageArray });
    } else if (
        errorMessageArray.length === 0 
        && hasEmailNotChanged === true 
        && hasUsernameNotChanged === true
        && hasAvatarNotChanged === true
        ) {
        return res.status(400).render("users/edit_profile", { pageTitle, errorMessage: "Nothing has changed."})
    }

    const updatedUser = await User.findByIdAndUpdate(
        _id, {
        avatarPath : newAvatarPath,
        email,
        username
    }, {new: true});
    req.session.user = updatedUser;
    return res.redirect(`/user/${_id}`);
};

export const getChangePassword = (req, res) => {

};
export const postChangePassword = (req, res) => {

};

export const account = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    console.log(user);

    if ( !user ) {
        return res.status(404).render("404", { pageTitle: "User not found."});
    }
    res.render("user/account", { pageTitle: "Account", user });
};
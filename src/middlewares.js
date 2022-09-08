import morgan from "morgan";
import multer from "multer";


export const localsMiddleware = (req, res, next) => {
    res.locals.siteTitle = "Webster";
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user;
    next();
};

export const logger = morgan("dev");

export const loggedInOnlyMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        req.flash("error", "Please Login first.");
        return res.redirect("/user/login")
    }
};

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        next();
    } else {
        req.flash("error", "Not authorized");
        return res.redirect("/");
    }
};

export const profilePicUpload = multer ({
    dest: "uploads/profile_pic/",
    limits: {
        fileSize:  3 * 1024 * 1024,
    },
});
export const videoUpload = multer({
    dest: "uploads/videos/",
});

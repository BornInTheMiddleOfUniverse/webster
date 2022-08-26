import morgan from "morgan";

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
        return res.redirect("/user/login")
    }
};

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        next();
    } else {
        return res.redirect("/");
    }
};
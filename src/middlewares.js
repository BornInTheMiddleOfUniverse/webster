import morgan from "morgan";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteTitle = "Webster";
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user;
    next();
};

export const logger = morgan("dev");

export const privateMiddleware = (req, res, next) => {
    const URL = req.url;
    if(URL == "/protected") {
        return res.render("pages/protected", { pageTitle: "Not Allowed"})
    }
    next();
}
import morgan from "morgan";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteTitle = "Webster";
    next();
};

export const logger = morgan("dev");

export const privateMiddleware = (req, res, next) => {
    const URL = req.url;
    if(URL == "/protected") {
        return res.render("protected", { pageTitle: "Not Allowed"})
    }
    next();
}
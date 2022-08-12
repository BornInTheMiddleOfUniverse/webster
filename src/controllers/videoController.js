import Video from "../models/Video";
    
export const videos = async (req, res) => {    
        const videos = await Video.find({}).sort({ createdAt: "desc" });
        return res.render("videos", { pageTitle: "Videos", videos });    
};

export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    console.log(video);
    if (!video) {
        return res.status(404).render("404", {pageTitle: "Video not found."})
    }
    return res.render("watch", {pageTitle: video.title, videos})
};
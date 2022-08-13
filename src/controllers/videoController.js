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


export const getUpload = (req, res) => {
    return res.render("video_upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        const video = await Video.create({
            title,
            description,
            createdAt: Date.now(),
            hashtags: hashtags.split(",").map((word) => `#${word.trim()}`),
            meta: {
                views: 0,
                ratings: 0,
            },
            });
        const dbVideo = await video.save();
        
        console.log(dbVideo);
        return res.redirect("/videos"); 

    } catch(error) {
        console.log(error);
        return res.status(400).render("video_upload", {
        pageTitle: "Upload Video",
        errorMessage: error._message,
        });
    }
};
import Video from "../models/Video";

const fakeVideos = [
    {
        title : "this is title",
        description : "descriptions!",
        hashtags: "HASHTAG",
        views: "5",
        rating: "1000"
    },
    {
        title : "this is title2",
        description : "descriptions!2",
        hashtags: "HASHTAG2",
        views: "52",
        rating: "10002"
    }
];

    
export const videos = (req, res) => {
    // const videos = Video.find({}).sort({ createdAt: "desc" });
    return res.render("videos", { pageTitle: "Videos", fakeVideos });
}

export const watch = async (req, res) => {
    const { id } = req.params;
//     const video = await Video.findById(id);
//     console.log(video);
//     if (!video) {
//         return res.status(404).render("404", {pageTitle: "Video not found."})
//     }
//     return res.render("watch", {pageTitle: video.title, fakeVideos})
};
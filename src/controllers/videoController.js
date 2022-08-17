import Video, { formatHashtags } from "../models/Video";
    

export const videos = async (req, res) => {    
        const videos = await Video.find({}).sort({ createdAt: "desc" });
        return res.render("video/videos_main", { pageTitle: "Videos", videos });    
};


export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", {pageTitle: "Video not found."})
    }
    return res.render("video/watch", {pageTitle: video.title, video})
};


export const getUpload = (req, res) => {
    return res.render("video/video_upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        const video = await Video.create({
            title,
            description,
            createdAt: Date.now(),
            hashtags: Video.formatHashtags(hashtags),
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

export const getEdit = async (req, res) => {  
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).render("404", { pageTitle: "Video not found."});
    }
    return res.render("video/video_edit", { pageTitle: `Edit: ${video.title}`, video });  
  };
  
  export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({ _id: id });
    if(!video) {
      return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    await Video.findByIdAndUpdate(id, {
      title, 
      description,
      hashtags: Video.formatHashtags(hashtags),
    })
    return res.redirect(`/videos/${id}`);
  };


export const deleteVideo = async (req, res) => {  
  const { id } = req.params;  
  await Video.findByIdAndDelete(id);
  return res.redirect("/videos");  
};


export const search = async (req, res) => {
  const keyword = req.query.search;
  let videos = [];
  
  try {
    if ( keyword === "" ) {
      return res.render("search", { pageTitle: `Please type any keyword for search`, keyword });      
    } else if (keyword) {
      videos = await Video.find({
        title: {
          $regex: new RegExp(keyword, "i")
        }
      });       
      return res.render("search", { pageTitle: `Search: ${req.query.search}`, videos }); 
    }
  } catch (e) {    
    console.log(e);
    return res.status(404).render("404", { pageTitle: `Something went wrong.` });
  }
};
const express = require('express');
const PostRouter = express.Router();
PostRouter.get("/posts", (req, res) => {
    PostModel.find({}, (err, post) => {
        if (err) {
            res.status(500).json({ success: 0, message: err })
        } else console.log(post);
    })
})
//TODO:CRUD for Post
PostRouter.get("/", (req, res) => {
    res.send("post")
})

//get one
PostRouter.get("/posts/:ID", (req, res) => {
    const postid = req.params.ID;
    PostModel.findById(postid, (err, postFound) => {
        if (err) {
            res.status(500).json({ success: 0, message: err })
        } else res.json(postFound);
    })
})
//create-post
PostRouter.post("/api/post", (req, res) => {
    const newpost = req.body || {};
    PostModel.create(newpost, (err, postModel) => {
        if (err) {
            res.status(500).json({ success: 0, message: err })
        } else res.status(201).json({ success: 1, message: "Create success" });
    })
})
//update-put
PostRouter.put("/api/posts/:ID", (req, res) => {
    const postchange = req.body || {};
    const postid = req.params.ID
    PostModel.findById(postid, (err, postFound) => {
        if (err) res.status(500).json({ success: 0, message: err })
        else
            if (!userFound) res.send({ message: 'post not found!', success: 0 })
            else {
                postFound = postchange;
                postFound.save((err) => {
                    if (err) res.status(500).json({ success: 0, message: err })
                    else
                        res.json(postFound);
                })
            }
    })
})
//delete
//del
PostRouter.delete("/api/posts/:ID",(req,res)=>{
    const postid = req.params.ID
    PostModel.findByIdAndDelete(postid, (err, postFound) => {
        if (err) res.status(500).json({ success: 0, message: err })
        else
            if (!postFound) res.send({ message: 'post not found!', success: 0 })
            else {
                res.json(postFound);
            }
    })
})

module.exports = PostRouter;
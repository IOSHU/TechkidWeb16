const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    author: { type: String, required: true },
    contents: { type: String, required: true }
})
const PostSchema = new Schema({
    view: { type: Number, default: 0 },
    image: { type: String, required: true },
    like: { type: String, required: true },
    author: { type: String, required: true },
    comments: [CommentSchema],
    title: { type: String, required: true },
    description: { type: String, required: true }
}, {
        timestamps: true//created at && updateat
    });
module.exports=mongoose.model("Post",PostSchema);
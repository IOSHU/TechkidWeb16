const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: { type: String, required: true,unique:true },
    password: { type: String, required: true,unique:true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    fullname: { type: String, required: true }
}, {
        timestamps: true//created at && updateat
    });
module.exports=mongoose.model("User",UserSchema);
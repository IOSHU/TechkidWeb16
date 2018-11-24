const mongose = require("mongoose");
const Schema = mongose.Schema;


const QuestionSchema = new Schema({
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    content: { type: String, required: true, unique: true }
}, {
        timestamps: true,
});
module.exports = mongose.model("Question", QuestionSchema)
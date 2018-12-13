const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongose = require("mongoose");
const RootRouter = require("./routers")


mongose.connect("mongodb://localhost/QuyetDeapp", { useNewUrlParser: true }, (err) => {
    if (err) console.log(err);
    else console.log("DB is conected");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('view'))
app.use("/",RootRouter);

app.get("/", (req, res) => {
    res.send("tech kid hotgirl");
})

// ative tai cong 6969
const port=process.env.PORT ||6969
app.listen(port, (err) => {
    if (err) {
        console.log("err")
    } else {
        console.log("conected");
    }
})

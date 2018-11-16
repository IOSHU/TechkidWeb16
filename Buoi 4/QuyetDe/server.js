const express = require('express');
const app = express();
const fs = require('fs')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('view'))

function getRndInteger( min, max) {
    return (Math.floor(Math.random() * (max - min + 1) ) + min);
}
// router /ask gui 1 cau hoi len server
// gui du lieu html toi client
app.get("/ask", (req, res) => {
    res.sendFile(__dirname + "/view/ask.html");
})
// server nhan du lieu va cap nhat tai nguyen
app.post("/ask", (req, res) => {
    console.log("post data");
    console.log(req.body);
    const questions = JSON.parse(fs.readFileSync('./question.json', 'utf-8'))
    console.log(typeof questions, questions.length);

    // tao doi tuong question
    let newQuestion = {
        id: questions.length,
        yes: 0,
        no: 0,
        content: req.body.question
    }

    questions.push(newQuestion);
    fs.writeFileSync('./question.json', JSON.stringify(questions));
    res.redirect("/")

})


// router /randomquestion tra ve thong tin cua 1 cau hoi ngau nhien trong list cau hoi
app.get("/randomquestion", (req, res) => {
   // res.sendFile(__dirname + "/view/randomquestion.html");
    const questions = JSON.parse(fs.readFileSync('./question.json', 'utf-8'))
    res.send(questions[getRndInteger(0,questions.length-1)].content)
})


//router //question/:questionId tra ve thong tin cua 1 cau hoi co id tuong ung trong list cau hoi
app.get("/:questionId", (req, res) => {
    // res.sendFile(__dirname + "/view/randomquestion.html");
     const questions = JSON.parse(fs.readFileSync('./question.json', 'utf-8'))
     questions.forEach(question=>{
         if(question.id == req.params.questionId){
            res.send(question.content);
         }
     })
 })
 


// ative tai cong 6969
app.listen(6969, (err) => {
    if (err) {
        console.log("err")
    } else {
        console.log("conected");
    }
})

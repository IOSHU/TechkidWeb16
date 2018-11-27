const express = require('express');
const app = express();
const fs = require('fs')
const bodyParser = require('body-parser');
const mongose = require("mongoose");
const questionModel = require("./models/questionModel")
mongose.connect("mongodb://localhost/QuyetDeapp", { useNewUrlParser: true }, (err) => {

    if (err) console.log(err);
    else console.log("DB is conected");
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('view'))


questionModel.find({}, (err, questions) => {
    if (err) console.log(err)
    else console.log("listen question: ", questions);
})
// sinh 1 so tu nhien
function getRndInteger(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/view/home.html");
})
// router /ask gui 1 cau hoi len server
// gui du lieu html toi client
app.get("/ask", (req, res) => {
    res.sendFile(__dirname + "/view/ask.html");
})

// server nhan du lieu va cap nhat tai nguyen
app.post("/ask", (req, res) => {
    console.log("post data");
    // console.log(req.body);
    // const questions = JSON.parse(fs.readFileSync('./question.json', 'utf-8'))
    // console.log(typeof questions, questions.length);

    // // tao doi tuong question
    // let newQuestion = {
    //     id: questions.length,
    //     yes: 0,
    //     no: 0,
    //     content: req.body.question
    // }

    // questions.push(newQuestion);
    // fs.writeFileSync('./question.json', JSON.stringify(questions));
    // res.redirect("/")

    questionModel.create({ content: req.body.question }, (err, questionCreated) => {
        if (err) console.log(err)
        else {
            console.log(questionCreated);
        }
    })
    questionModel.count({}, (err, count) => {
        if (err) console.log(err);
        else {
            const id = count;
            res.redirect("/" + id);
        }
    })

})


// router /randomquestion tra ve thong tin cua 1 cau hoi ngau nhien trong list cau hoi
app.get("/randomquestion", (req, res) => {
    // dung co so du lieu
    //cach 1
    // questionModel.find({},(err,questions)=>{
    //     if(err) console.log(err);
    //     else res.send(questions[getRndInteger(0,questions.length-1)].content);
    // })

    // cach 2
    questionModel.count({}, (err, count) => {
        if (err) console.log(err);
        else {
            const randomNum = Math.floor(Math.random() * count);
            questionModel.findOne({}, null, { skip: randomNum }, (err, questionFound) => {
                if (err) console.log(err)
                else res.json({ question: questionFound });
            })
        }
    })


    // dung file
    // res.sendFile(__dirname + "/view/randomquestion.html");
    // const questions = JSON.parse(fs.readFileSync('./question.json', 'utf-8'));
    // res.json({question: questions[getRndInteger(0,questions.length-1)]});

})


//router /:questionId tra ve thong tin cua 1 cau hoi co id tuong ung trong list cau hoi
app.post("/:questionId", (req, res) => {
     //cach 1 dung file
        // res.sendFile(__dirname + "/view/randomquestion.html");
        //  const questions = JSON.parse(fs.readFileSync('./question.json', 'utf-8'))
        //  questions.forEach(question=>{
        //      if(question.id == req.params.questionId){
        //         res.json(question);
        //      }
        //  })

        // cach 2 dung csdl mongo
    const id = req.params.questionId;
    console.log(id);
    questionModel.find({}, (err, questions) => {
        if (err) console.log(err)
        else {
            res.json({ question: questions[id] });
        }
    })
})
app.get("/question/:questionId", (req, res) => {
    res.sendFile(__dirname + "/view/showans.html");
})

app.post("/answer", (req, res) => {
    const questionId = req.body.questionId;
    const vote = req.body.vote;
    // cach 1 dung file
    // const questions = JSON.parse(fs.readFileSync('./question.json', 'utf-8'));
    // if (vote == "yes") questions[questionId].yes += 1;
    // else questions[questionId].no += 1;
    // fs.writeFileSync('./question.json', JSON.stringify(questions))
    // res.redirect("http://localhost:6969/" + questionId);

    // cach 2 dung csdl findByIdAndUpdate

    questionModel.findByIdAndUpdate( questionId,{ $inc : { [vote] : 1 }},{new: true},(err,questionFound) => {
            if (err) console.log(err)
            else {
                console.log("updated");
             res.json({question: questionFound});

            }
        });

    // questionModel.findById(questionId, (err, questionFound) => {
    //     if(err) console.log(err)
    //     //c1
    //     // if (vote == "yes") questionFound.yes += 1;
    //     // else questionFound.no += 1;

    //     //c2

    //     if (!questionFound) res.send({ message: 'Question not found!', question: null })
    //     else {
    //         questionFound[vote] += 1;
    //         questionFound.save((err,questionUpdated) => {
    //             if (err) console.log(err)
    //             else
    //                 res.send({ question: questionUpdated});
    //         })
    //     }
    // })
})

// ative tai cong 6969
app.listen(6969, (err) => {
    if (err) {
        console.log("err")
    } else {
        console.log("conected");
    }
})

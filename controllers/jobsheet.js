const db = require("../models")
const Quiz = db.quizzez;

exports.submitOne = async (req, ress) => {
    const jobsheet = {
        quizId: req.body.quizId,
        answer: req.body.answer
    }

    try {
        var quiz = await Quiz.findOne({
            where:{
                id: req.body.quizId
            }
        });

        if(req.body.answer == quiz.key){
            ress.status(200).json({
                "message": "Jawaban Benar"
            })
        } else {
            ress.status(200).json({
                "message": `Jawaban yang benar adalah ${quiz.key}`
            })
        }
    }

    catch (e){
        ress.status(500).json({message : e.message})
    }

}

exports.submitMany = async (req, ress) => {
    const jobsheet = {
        quizId: req.body.quizId,
        answer: req.body.answer
    }

    try {
        let benar = 0
        let totalSoal = jobsheet.quizId.length
        for (let i = 0; i < totalSoal ; i++){
            const quiz = await Quiz.findOne({
                limit: 1,
                where: {
                    id: jobsheet.quizId[i]
                },
                order: [['id', 'DESC']],
            })
            if(quiz.key == jobsheet.answer[i]){
                benar = benar + 1
            }
        }

        ress.status(200).json({
            message: `Benar ${benar} dari ${totalSoal} soal`
        })
    }

    catch (e){
        ress.status(500).json({message : e.message})
    }

}
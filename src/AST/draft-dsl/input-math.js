{
    pages: [
        {
            id: "addition-pg",
            header: "Addition",
            instructions: "Please solve the following addition problems",
            displayQuestions: 5,
            questions: [
                {
                    id: "addition-q-" + loopIndex,
                    type: textInput,
                    label: getAdditionQuestionLabel(num1, num2),
                    isRequired: true,
                    correctAnswer: ans,
                    loop: 5,
                    vars: {
                        num1: Form.getRandomInt(1, 100),
                        num2: Form.getRandomInt(1, 100),
                        ans: num1 + num2
                    }
                }
            ]
        },

        {
            id: "multiplication-pg",
            header: "Multiplication",
            instructions: "Please solve the following multiplication problems",
            displayQuestions: 5,
            questions: [
                {
                    id: "multiplication-q-" + loopIndex,
                    type: textInput,
                    label: "" + num1 + " * " + num2 + " = ",
                    isRequired: true,
                    correctAnswer: ans,
                    loop: 5,
                    vars: {
                        num1: Form.getRandomInt(1, 100),
                        num2: Form.getRandomInt(1, 100),
                        ans: multQuestionAns(num1, num2)
                    }
                }
            ]
        },

        {
            id: "algebra-pg",
            header: "Algebra",
            instructions: "Please solve the following algebra problems. Round to two decimal places.",
            displayQuestions: 5,
            questions: [
                {
                    id: "algebra-q-" + loopIndex,
                    type: textInput,
                    label: "" + num1 + " * " + num2 + " + " + num3 + " = " + num4,
                    isRequired: true,
                    correctAnswer: ans,
                    loop: 5,
                    vars: {
                        num1: Form.getRandomInt(1, 100),
                        num2: Form.getRandomInt(1, 100),
                        num3: Form.getRandomInt(1, 100),
                        num4: Form.getRandomInt(1, 100),
                        ans: algebraQuestionAns(num1, num2, num3, num4)
                    }
                }
            ]
        }
    ],

    functions: [
        multQuestionAns(num1, num2) {
            return num1 * num2
        },

        algebraQuestionAns(num1, num2, num3, num4) {
            return Form.round( (((num4 - num3) / (num1 * num2) * 100) / 100) )
        },

        getAdditionQuestionLabel(num1, num2) {
            return "" + num1 + " + " + num2 + " = "
        }
    ]
}
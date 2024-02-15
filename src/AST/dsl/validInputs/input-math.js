{
    pages: [
        {
            id: "addition-pg",
            header: "Addition",
            instructions: "Please solve the following addition problems",
            displayQuestions: 5,
            questions: [
                {
                    id: stringConcat("addition-q-", loopIndex),
                    type: textInput,
                    label: getAdditionQuestionLabel(num1, num2),
                    isRequired: true,
                    correctAnswer: ans,
                    loop: 5,
                    vars: {
                        num1: getRandomInt(1, 100),
                        num2: getRandomInt(1, 100),
                        ans: addNums(num1, num2)
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
                    id: stringConcat("multiplication-q-", loopIndex),
                    type: textInput,
                    label: stringConcat(num1, " * ", num2, " = "),
                    isRequired: true,
                    correctAnswer: ans,
                    loop: 5,
                    vars: {
                        num1: getRandomInt(1, 100),
                        num2: getRandomInt(1, 100),
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
                    id: stringConcat("algebra-q-", loopIndex),
                    type: textInput,
                    label: stringConcat(num1, " * ", num2, " + ", num3, " = ", num4),
                    isRequired: true,
                    correctAnswer: ans,
                    loop: 5,
                    vars: {
                        num1: getRandomInt(1, 100),
                        num2: getRandomInt(1, 100),
                        num3: getRandomInt(1, 100),
                        num4: getRandomInt(1, 100),
                        ans: algebraQuestionAns(num1, num2, num3, num4)
                    }
                }
            ]
        }
    ],

    functions: [
        addNums(num1, num2) {
            additionAns = (num1 + num2)
            return additionAns
        },

        multQuestionAns(num1, num2) {
            return (num1 * num2)
        },

        algebraQuestionAns(num1, num2, num3, num4) {
            algResult = (((num4 - num3) / (num1 * num2) * 100) / 100)
            return roundToInt(algResult)
        },

        getAdditionQuestionLabel(num1, num2) {
            return stringConcat("", num1, " + ", num2, " = ")
        }
    ],

    vars: {
        additionAns: 0,
        algResult: 0
    }
}
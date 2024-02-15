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
        }
    ],
    functions: [
        addNums(num1, num2) {
            return (num1 + num2)
        }
    ]
}
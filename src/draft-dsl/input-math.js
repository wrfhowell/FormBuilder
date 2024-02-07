{
    pages: [
        {
            id: "addition-pg",
            header: "Addition",
            instructions: "Please solve the following addition problems",
            displayQuestions: 5,
            questions: [
                {
                    // The loopIndex is inserted into the question id to make it unique
                    id: "addition-q-" + loopIndex,



                    type: "textInput",
                    label: getAdditionQuestionLabel(num1, num2), 
                    isRequired: 1,
                    correctAnswer: ans,
                    // This question is repeated 5 times with different inputs
                    loop: 5,
                    vars: {
                    num1: Form.getRandomInt(1, 100),
                    num2: Form.getRandomInt(1, 100),
                    ans: num1 + num2, 
                    },
                },
            ],
        },

        {
            id: "multiplication-pg",
            header: "Multiplication",
            instructions: "Please solve the following multiplication problems",
            displayQuestions: 5,
            questions: [
              {
                id: "multiplication-q-" + loopIndex,
                type: "textInput",
                label: "" + num1 + " * " + num2 + " = ", 
                isRequired: 1,
                correctAnswer: ans,
                loop: 5,
                vars: {
                  num1: Form.getRandomInt(1, 100),
                  num2: Form.getRandomInt(1, 100),
                  ans: multQuestionAns(num1, num2), 
                },
              },
            ],
        },

        {
            id: "algebra-pg",
            header: "Albebra",
            instructions: "Please solve the following algebra problems. Round to two decimal places.",
            displayQuestions: 5,
            questions: [
              {
                id: "algebra-q-" + loopIndex,
                type: "textInput",
                label: "" + num1 + "x * " + num2 + " + " num3 + " = " + num4,  //"({{num1}}x * {{num2}}) + {{num3}} = {{num4}}", 
                isRequired: 1,
                correctAnswer: ans,
                loop: 5,
                vars: {
                  num1: Form.getRandomInt(1, 100),
                  num2: Form.getRandomInt(1, 100),
                  num3: Form.getRandomInt(1, 100),
                  num4: Form.getRandomInt(1, 100),
                  ans: algebraQuestionAns(num1, num2, num3, num4), 
                },
              },
            ],
        },
    ];

    functions: [
        multQuestionAns(num1, num2) {
            return num1 * num2;
        },

        algebraQuestionAns(num1, num2) {
            // Round to 2 decimal places
            return Form.roundNum((num4 - num3)/(num1 * num2) * 100)/100;
        },

        getAdditionQuestionLabel(num1, num2) {
            return "" + num1 + " + " + num2 + " = ";
        },

    ];
  }
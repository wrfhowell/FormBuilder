{
    pages: [
        {
            id: "addition-pg",
            header: "Addition",
            instructions: "Please solve the following addition problems",
            displayQuestions: 5,
	    goTo: additionPgGoto(FormState["addition-pg"]["addition-q-0"], FormState["addition-pg"]["addition-q-0-correctAnswer"]),
            questions: [
                {
                    id: "addition-q-",
                    type: textInput,
                    label: getAdditionQuestionLabel(num1, num2),
                    isRequired: true,
                    correctAnswer: ans,
                    loop: 1,
                    vars: {
                        num1: getRandomInt(1,9),
                        num2: getRandomInt(1,9),
                        ans: addNums(num1, num2)
                    }
                }
            ]
        },
	{
		id: "correct-ans-pg",
		header: "Correct Answer!",
		questions: [
			{
				id: "correct-ans-q",
				label: getCorrectAnswerPageHeader(prevAns),
				isRequired: false,
				type: textInput,
				vars: {
					prevAns: FormState["addition-pg"]["addition-q-0"]
				}
			}			
		]
	},
	{
		id: "you-suck-pg",
		header: "It's been 5 tries. Just give up."
	}
    ],
    functions: [
        addNums(num1, num2) {
		addNumsReturnVal = (num1 + num2)
		return addNumsReturnVal
        },
        getAdditionQuestionLabel(num1, num2) {
            return stringConcat("What is ", num1, " + ", num2, "?")
        },
	additionPgGoto(val1, val2) {
		if (isEqual(val1, val2)) {
		   return "correct-ans-pg"
		} else {
			attempts = (attempts + 1)
		}

		if (isGreater(attempts, 5)) {
			return "you-suck-pg"
		}
		return "addition-pg"
	},
	getCorrectAnswerPageHeader(answer) {
		return stringConcat("You got the right answer: ", answer)
	}
    ],
	vars: {
		attempts: 1,
		addNumsReturnVal: 0
	}
}
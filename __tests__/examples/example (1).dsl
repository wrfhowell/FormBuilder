{
    pages: [
        {
            id: "addition-pg",
            header: "Addition",
            instructions: "Please solve the following addition problems",
            displayQuestions: 1,
	    goTo: additionPgGoto(FormState["addition-pg"]["addition-q"], FormState["addition-pg"]["addition-q-correctAnswer"]),
            questions: [
                {
                    id: "addition-q",
                    type: textInput,
                    label: getAdditionQuestionLabel(num1, num2),
                    isRequired: true,
                    correctAnswer: ans,
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
		goTo: "done-pg",
		questions: [
			{
				id: "correct-ans-q",
				label: getCorrectAnswerPageHeader(FormState["addition-pg"]["addition-q"]),
				isRequired: false,
				type: dropdown,
				options: getCorrectAnswerOptions(FormState["addition-pg"]["addition-q"])
			},
			{
				id: "correct-ans-q-2",
				label: test,
				isRequired: false,
				type: dropdown,
				dependsOn: "correct-ans-q",
				displayIf: "yes",
				vars: {
					test: getRandomInt(1,10)
				}
			}			
		]
	},
	{
		id: "give-up-pg",
		header: "It's been 5 tries. Just give up."
	},
	{
		id: "done-pg",
		header: "Thank you"
	}
    ],
    functions: [
        addNums(number1, number2) {
		return (number1 + number2)
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
			return "give-up-pg"
		}
		return "addition-pg"
	},
	getCorrectAnswerPageHeader(answer) {
		return stringConcat("You got the right answer: ", answer)
	},
	getCorrectAnswerOptions(ans) {
		return ["yes", ans]
	},
	getQuestionLabel() {
		return stringConcat("number: ",getRandomInt(1))
	}
    ],
	vars: {
		attempts: 1,
		ans: 0
	}
}
{
    pages: [
        {
            id: "intro-pg",
            header: "What is your Alignment",
            instructions: "Answer the following questions on a scale of 1-10",
	    	goTo: introGoTo(FormState["intro-pg"]["Question1"]),
            questions: [
                {
                    id: "Question1",
                    type: textInput,
                    label: getQuestionLabel1(),
                    isRequired: true
                }
            ]
        },
        {
            id: "second-pg",
            header: "What is your Alignment",
            instructions: "Answer the following questions on a scale of 1-10",
	    	goTo: secondGoTo(FormState["second-pg"]["Question1"]),
            questions: [
                {
                    id: "Question1",
                    type: textInput,
                    label: "Do you often times find yourself lying",
                    isRequired: true
                }
            ]
        },
        {
            id: "third-pg",
            header: "What is your Alignment",
            instructions: "Answer the following questions on a scale of 1-10",
	    	goTo: thirdGoTo(FormState["third-pg"]["Question1"]),
            questions: [
                {
                    id: "Question1",
                    type: textInput,
                    label: "How strongly do you agree with this statement: My personal happiness is of higher priority to me than that of others",
                    isRequired: true
                }
            ]
        },
        {
            id: "fourth-pg",
            header: "What is your Alignment",
            instructions: "Answer the following questions on a scale of 1-10",
	    	goTo: fourthGoTo(FormState["fourth-pg"]["Question1"]),
            questions: [
                {
                    id: "Question1",
                    type: textInput,
                    label: "Do you resent authority",
                    isRequired: true
                }
            ]
        },
        {
            id: "lawful-good",
            header: "You Are: ",
            instructions: "Lawful Good: you are A boring goody two shoes"
        },
        {
            id: "chaotic-good",
            header: "You Are: ",
            instructions: "Chaotic Good: you are the life of a party"
        },
        {
            id: "chaotic-evil",
            header: "You Are: ",
            instructions: "Chaotic Evil: you are the joker"
        },
        {
            id: "lawful-evil",
            header: "You Are: ",
            instructions: "Lawful Evil: you would be an awesome foot soldier for an authoritarian ruler"
        }
    ],
    functions: [
        getQuestionLabel1() {
            return "How mad do you get while driving?"
        },
	    introGoTo(val) {
            num = getScaleNumber(val)
		    totalScore = (totalScore + num)
		    return "second-pg"
	    },
        secondGoTo(val) {
            num = getScaleNumber(val)
		    totalScore = (totalScore + num)
		    return "third-pg"
	    },
        thirdGoTo(val) {
            num = getScaleNumber(val)
		    totalScore = (totalScore + num)
		    return "fourth-pg"
	    },
        fourthGoTo(val) {
            num = getScaleNumber(val)
		    totalScore = (totalScore + num)
            if (isGreater(totalScore, 30)) {
                return "chaotic-evil"
            }
            if (isGreater(totalScore, 20)) {
                return "lawful-evil"
            }
            if (isGreater(totalScore, 10)) {
                return "chaotic-good"
            }
            if (isGreater(totalScore, 0)) {
                return "lawful-good"
            }
		    return totalScore
	    },
        getScaleNumber(stringVal) {
            if (isEqual(stringVal, "0")) {
                return 0
            }
            if (isEqual(stringVal, "1")) {
                return 1
            }
            if (isEqual(stringVal, "2")) {
                return 2
            }
            if (isEqual(stringVal, "3")) {
                return 3
            }
            if (isEqual(stringVal, "4")) {
                return 4
            }
            if (isEqual(stringVal, "5")) {
                return 5
            }
            if (isEqual(stringVal, "6")) {
                return 6
            }
            if (isEqual(stringVal, "7")) {
                return 7
            }
            if (isEqual(stringVal, "8")) {
                return 8
            }
            if (isEqual(stringVal, "9")) {
                return 9
            }
            if (isEqual(stringVal, "10")) {
                return 10
            }
            return 0
        }
    ],
	vars: {
        num: 0,
		totalScore: 0
	}
}
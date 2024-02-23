{
    pages: [

        {
            id: "classification-pg",
            header: "Classification",
            instructions: "Please classify yourself",
            goTo: classificationNext(),
            questions: [
                {
                    id: "what-are-you",
                    type: radio,
                    label: "What are you?",
                    options: ["Metal", "Nonmetal"],
                    isRequired: true
                }
            ]
        },

        {
            id: "metal-pg",
            header: "Metal",
            instructions: "Please specify the type of metal you are",
            goTo: "final-pg",
            questions: [
                {
                    id: "metal",
                    type: radio,
                    label: "What type of metal are you?",
                    options: [
                        "Alkali Metal",
                        "Alkaline Earth Metal",
                        "Transition Metal",
                        "Post-Transition Metal",
                        "Lanthanide",
                        "Actinide"
                    ],
                    isRequired: true
                }
            ]
        },

        {
            id: "nonmetal-pg",
            header: "Nonmetal",
            instructions: "Please specify the type of nonmetal you are",
            goTo: "final-pg",
            questions: [
                {
                    id: "nonmetal",
                    type: radio,
                    label: "What type of nonmetal are you?",
                    options: ["Reactive Nonmetal", "Noble Gas"],
                    isRequired: true
                }
            ]
        },

        {
            id: "final-pg",
            header: buildFinalHeader(),
            instructions: "Thank you for filling out the metals quiz!"
        }
    ],

    functions: [
        classificationNext() {
            whatAreYouAns = getFormState(FormState["classification-pg"]["what-are-you"])
            if(isEqual(whatAreYouAns, "Metal")) {
            return "metal-pg"
        } else if(isEqual(whatAreYouAns, "Nonmetal")) {
            return "nonmetal-pg"
        } else if(isEqual(whatAreYouAns, "Metalloid")) {
            return "metalloid-pg"
        }

            return 0
        },

        buildFinalHeader() {
            if(isEqual(whatAreYouAns, "Metal")) {
                return stringConcat("Looks like you are a ", FormState["metal-pg"]["metal"])
            } else {
                return stringConcat("Looks like you are a ", FormState["nonmetal-pg"]["nonmetal"])
            }
        },


        getFormState(formStateAccess) {
            return formStateAccess
        }


    ],

    vars: {
        whatAreYouAns: ""
    }
}
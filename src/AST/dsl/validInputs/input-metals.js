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
                    options: ["Metal", "Nonmetal", "Metalloid"],
                    isRequired: true
                }
            ]
        },

        {
            id: "metal-pg",
            header: "Metal",
            instructions: "Please specify the type of metal you are",
            goTo: metalNext(),
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
            goTo: nonMetalNext(),
            questions: [
                {
                    id: "nonmetal",
                    type: radio,
                    label: "What type of nonmetal are you?",
                    options: ["Reactive Nonmetal", "Noble Gas"],
                    isRequired: true
                }
            ]
        }
    ],

    functions: [
        classificationNext() {
            if(isEqual(whatAreYouAns(FormState["classification-pg"]["what-are-you"]), "Metal")) {
            return "metal-pg"
        } else if(isEqual(whatAreYouAns(FormState["classification-pg"]["what-are-you"]), "Nonmetal")) {
            return "nonmetal-pg"
        } else if(isEqual(whatAreYouAns(FormState["classification-pg"]["what-are-you"]), "Metalloid")) {
            return "metalloid-pg"
        }

            return 0
        },

        metalNext() {
            if(isEqual(whatMetalAreYou, "Alkali Metal")) {
                return "alkali-metal-pg"
            } else if(isEqual(whatMetalAreYou, "Alkaline Earth Metal")) {
                return "alkaline-earth-metal-pg"
            } else if(isEqual(whatMetalAreYou, "Transition Metal")) {
                return "transition-metal-pg"
            } else if(isEqual(whatMetalAreYou, "Post-Transition Metal")) {
                return "post-transition-metal-pg"
            } else if(isEqual(whatMetalAreYou, "Actinide")) {
                return "actinide-pg"
            }

            return 0
        },

        nonMetalNext() {
            if(isEqual(whatNonMetalAreYou(FormState["nonmetal-pg"]["what-are-you"]), "Reactive Nonmetal")) {
                return "reactive-nonmetal-pg"
            } else if(isEqual(whatNonMetalAreYou(FormState["nonmetal-pg"]["what-are-you"]), "Noble Gas")) {
                return "noble-gas-pg"
            }

            return 0
        },

        whatAreYouAns(formStateAccess) {
            return formStateAccess
        },



        whatNonMetalAreYou(formStateAccess) {
                return formStateAccess
        }
    ]
}
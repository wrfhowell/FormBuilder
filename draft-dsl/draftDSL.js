/**
Types:
    - page:
        *id: string
        header: string | function | var
        instructions: string | function | var
        goTo: {}
        vars: {}
        displayQuestions: all | int
        questions: []
    - question
        *id: string 
        *type: "textInput" | "radio" | "checkbox" | "dropdown" 
        *label: string | function 
        options: function | [] | null
        dependsOn: string
        displayIf: function | regex | string
        // Can use the loop field to repeat the question a number of times with different input. For example, if we want to ask a math question with different inputs, the question is only written once and displayed multiple times with different inputs. 
        loop: int
        isRequired: 0 | 1 # (default: 0)
        correctAnswer: string | function | null
        vars: {}
    
    - goTo: 
        if: questionId,
        go: {
             [anwerID]: pageId
            }

    // The formState is the state of the form as the user is filling it out. It's used to keep track of the user's answers and is globally accesible to all functions.
    - FormState:{
        [pgId]: {
            [qId]: string | [] | null
        }
    }

        example: 
        {
            page1Id: {
                q1Id: "answer",
                q2Id: ["answer1", "answer2"]
                q3Id: null
            },
            page2Id: {
                q1Id: "answer",
                q2Id: ["answer1", "answer2"]
                q3Id: null
            }
        }

    // The form object has static methods the developer can use for question generation
    - Form: {
        getRandomInt(lowRange, highRange)
    }



*/

// Form Generator Script example
{
    pages: [
        // About You page
        {
            id: "personal-info",
            header: "Personal Information",
            instructions: "Please provide the following personal information",
            questions: [
                {
                    id: "first-name",
                    type: "textInput",
                    label: "First Name",
                    isRequired: 1
                },
                {
                    id: "last-name",
                    type: "textInput",
                    label: "Last Name",
                    isRequired: 1
                },
                {
                    // This question asks for a date, so I picked the textInput question type. If we want, we can add a question type for calendar input. 
                    id: "dob",
                    type: "textInput",
                    label: "Date of Birth",
                    isRequired: 1
                }

            ]
        },
        {
            id: "demographic-info",
            header: "Demographic Information",
            instructions: "Please provide the following demographic information",
            questions: [
                {
                    id: 'ethnicity',
                    label: 'What ethnicity do you identify as?',
                    type: 'checkbox',
                    options: [
                        'White',
                        'Black or African American',
                        'Hispanic or Latino',
                        'Asian',
                        'First Nations',
                        'Other'
                    ],
                    isRequired: 0,
                },
                {
                    id: 'ethnicity-other',
                    label: 'If other, please specify your ethnicity',
                    type: 'textInput',
                    // This question is only displayed if the user selects 'Other' in the previous question
                    dependsOn: 'ethnicity',
                    displayIf: 'Other'
                }
            ]
        },
        {
            id: "contact-info-pg",
            header: "Contact Information",
            sections: [
                {
                    id: 'address',
                    header: 'Address',
                    instructions: 'Please provide your address',
                    questions: [
                        {
                            id: 'street-address',
                            label: 'Street Address',
                            type: 'textInput',
                            isRequired: 1
                        },
                        {
                            id: 'province',
                            label: 'Province',
                            type: 'dropdown',
                            options: [
                                'Ontario',
                                'Quebec',
                                'Nova Scotia',
                                'New Brunswick',
                                'Manitoba',
                                'British Columbia',
                                'Prince Edward Island',
                                'Saskatchewan',
                                'Alberta',
                                'Newfoundland and Labrador'],
                            isRequired: 1
                        },
                        {
                            id: 'city',
                            label: 'City',
                            type: 'dropdown',
                            dependsOn: 'province',
                            options: {
                                Ontario: ontarioCities,
                                Quebec: quebecCities,
                                'Nova Scotia': novaScotiaCities,
                                'New Brunswick': newBrunswickCities,
                                Manitoba: manitobaCities,
                                'British Columbia': britishColumbiaCities,
                                'Prince Edward Island': princeEdwardIslandCities,
                                Saskatchewan: saskatchewanCities,
                                Alberta: albertaCities,
                                'Newfoundland and Labrador': newfoundlandAndLabradorCities
                            },
                            isRequired: 1,
                            vars: {
                                ontarioCities: ['Toronto', 'Ottawa', 'Mississauga', 'Brampton', 'Hamilton', 'London', 'Markham', 'Vaughan', 'Kitchener', 'Windsor'],
                                quebecCities: ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Longueuil', 'Sherbrooke', 'Saguenay', 'Levis', 'Trois-Rivieres', 'Terrebonne'],
                                novaScotiaCities: ['Halifax', 'Dartmouth', 'Sydney', 'Truro', 'New Glasgow', 'Glace Bay', 'Kentville', 'Stellarton', 'Wolfville', 'Windsor'],
                                newBrunswickCities: ['Moncton', 'Saint John', 'Fredericton', 'Dieppe', 'Miramichi', 'Edmundston', 'Bathurst', 'Campbellton', 'Oromocto', 'Grand Falls'],
                                manitobaCities: ['Winnipeg', 'Brandon', 'Steinbach', 'Portage la Prairie', 'Thompson', 'Winkler', 'Selkirk', 'Dauphin', 'Morden', 'The Pas'],
                                britishColumbiaCities: ['Vancouver', 'Victoria', 'Kelowna', 'Abbotsford', 'Kamloops', 'Nanaimo', 'Prince George', 'Chilliwack', 'Vernon', 'Courtenay'],
                                princeEdwardIslandCities: ['Charlottetown', 'Summerside', 'Cornwall', 'Montague', 'Kensington', 'Souris', 'Alberton', 'Tignish', 'Georgetown', 'Stratford'],
                                saskatchewanCities: ['Saskatoon', 'Regina', 'Prince Albert', 'Moose Jaw', 'Yorkton', 'Swift Current', 'North Battleford', 'Estevan', 'Weyburn', 'Corman Park'],
                                albertaCities: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'Medicine Hat', 'Grande Prairie', 'Airdrie', 'Spruce Grove', 'Leduc', 'Fort Saskatchewan'],
                                newfoundlandAndLabradorCities: ['St. John\'s', 'Mount Pearl', 'Corner Brook', 'Conception Bay South', 'Grand Falls-Windsor', 'Paradise', 'Gander', 'Labrador City', 'Stephenville', 'Happy Valley-Goose Bay']
                            }
                        },
                        
                        {
                            id: 'postal-code',
                            label: 'Postal Code',
                            type: 'textInput',
                            isRequired: 1
                        }
                    ]
                }
            ]
        },
        {
            id: "arithmetic-pg",
            header: "Arithmetic",
            sections: [
                {
                    id: "addition",
                    header: "Addition",
                    instructions: "Please solve the following addition problems",
                    displayQuestions: 5,
                    questions: [
                        {
                            id: "addition1",
                            type: "textInput",
                            label: "{{num1}} + {{num2}} = ",
                            isRequired: 1,
                            correctAnswer: "{{ans}}",
                            // This question is repeated 5 times with different inputs
                            loop: 5,
                            vars: {
                                num1: Form.getRandomInt(1, 100),
                                num2: Form.getRandomInt(1, 100),
                                ans: () => {num1 + num2} // - / % *
                            }
                        },
                    ]
                },
                {
                    id: "subtraction",
                }
            ]
        },
        {}
    ],
    vars: {}
}

/**
 * Form Generator script example 2
 * 
 * Question 1: Basic Classification 
 *  Option A: Are you a Metal? 
 *  Option B: Are you a Nonmetal? 
 *  Option C: Are you a Metalloid? 
 * 
 * Based on the answer to Question 1, the follow-up questions will branch out:
 *  Follow-Up Questions if Option A (Metal) is Chosen 
 *      Question 2A: Type of Metal 
 *          Option A1: Alkali Metal 
 *          Option A2: Alkaline Earth Metal 
 *          Option A3: Transition Metal 
 *          Option A4: Post-Transition Metal 
 *          Option A5: Lanthanide 
 *          Option A6: Actinide 
 * 
 *  Follow-Up Questions if Option B (Nonmetal) is Chosen 
 *      Question 2B: Type of Nonmetal 
 *          Option B1: Reactive Nonmetal 
 *          Option B2: Noble Gas
 */

{
    pages: [
        {
            id: "classification-pg",
            header: "Classification",
            instructions: "Please classify yourself",
            goTo: {
                if: "what-are-you",
                go: {
                    "Metal": "metal-pg",
                    "Nonmetal": "nonmetal-pg",
                    "Metalloid": "metalloid-pg"
                }
            },
            questions: [
                {
                    id: "what-are-you",
                    type: "radio",
                    label: "What are you?",
                    options: [
                        "Metal",
                        "Nonmetal",
                        "Metalloid"
                    ],
                    isRequired: 1
                }
            ]
        },
        {
            id: "metal-pg",
            header: "Metal",
            instructions: "Please specify the type of metal you are",
            goto: {
                if: "metal",
                go: {
                    "Alkali Metal": "alkali-metal-pg",
                    "Alkaline Earth Metal": "alkaline-earth-metal-pg",
                    "Transition Metal": "transition-metal-pg",
                    "Post-Transition Metal": "post-transition-metal-pg",
                    "Lanthanide": "lanthanide-pg",
                    "Actinide": "actinide-pg"
                }
            },
            questions: [
                {
                    id: "metal",
                    type: "radio",
                    label: "What type of metal are you?",
                    options: [
                        "Alkali Metal",
                        "Alkaline Earth Metal",
                        "Transition Metal",
                        "Post-Transition Metal",
                        "Lanthanide",
                        "Actinide"
                    ],
                    isRequired: 1
                }
            ]
        },
        {
            id: "nonmetal-pg",
            header: "Nonmetal",
            goto: {
                if: "nonmetal",
                go: {
                    "Reactive Nonmetal": "reactive-nonmetal-pg",
                    "Noble Gas": "noble-gas-pg"
                }
            },
            instructions: "Please specify the type of nonmetal you are",
            questions: [
                {
                    id: "nonmetal",
                    type: "radio",
                    label: "What type of nonmetal are you?",
                    options: [
                        "Reactive Nonmetal",
                        "Noble Gas"
                    ],
                    isRequired: 1
                }
            ]
        }
    ]
}
/**
Types:
    - page:
        header: string || function || var
        *sections: []
        vars: {}
    - section
        *id: string 
        header: string || function
        instructions: string || function
        // The displayQuestions field is to control how many questions are displayed. So the developer can write a number of questions, but only display them randomly to the quiz taker as a way to make each quiz slightly different
        displayQuestions: all | int
        questions: []
        vars: {}
    - question
        *id: string 
        *type: questionType (see options below) 
        *label: string || function 
        options: function || [] || null
        dependsOn: string
        displayIf: function || regex || string
        // Can use the loop field to repeat the question a number of times with different input. For example, if we want to ask a math question with different inputs, the question is only written once and displayed multiple times with different inputs. 
        loop: int
        isRequired: 0 | 1 # (default: 0)
        correctAnswer: string || function || null
        vars: {}

Question types:
    - text
    - radio
    - checkbox
    - dropdown
*/

// Form Generator Script
{
    pages: [
        // About You page
        {
            header: "About You",
            sections: [
                {
                    id: "personal-info",
                    header: "Personal Information",
                    instructions: "Please provide the following personal information",
                    questions: [
                        {
                            id: "first-name",
                            type: "text",
                            label: "First Name",
                            isRequired: 1
                        },
                        {
                            id: "last-name",
                            type: "text",
                            label: "Last Name",
                            isRequired: 1
                        },
                        {
                            // This question asks for a date, so I picked the text question type. If we want, we can add a question type for calendar input. 
                            id: "dob",
                            type: "text",
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
                            type: 'text',
                            // This question is only displayed if the user selects 'Other' in the previous question
                            dependsOn: 'ethnicity',
                            displayIf: 'Other'
                        }
                    ]
                }
                
            ]
        },
        {
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
                            type: 'text',
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
                            options: getCityOptions(),
                            isRequired: 1
                        },
                        
                        {
                            id: 'postal-code',
                            label: 'Postal Code',
                            type: 'text',
                            isRequired: 1
                        }
                    ]
                }
            ]
        },
        {
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
                            type: "text",
                            label: "{{num1}} + {{num2}} = ",
                            isRequired: 1,
                            correctAnswer: "{{ans}}",
                            // This question is repeated 5 times with different inputs
                            loop: 5,
                            vars: {
                                num1: getRandomInt(1, 100),
                                num2: getRandomInt(1, 100),
                                ans: getAnswerForAddition(num1, num2)
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
    // Something we need to ask the TA is whether we can use language constructs of the target language. That is, if this is converted to Java, can we use Java classes like Math?
    //  Or does our DSL need to have all of the language constructs required for functions? If that's the case, we need to limit the functionality of our questions. 
    functions: [
            // Function returns the list of cities based on the province selected in the address.province question
            getCityOptions() {
                // I used the section id and question id to access the value of the question. 
                // Figured we can use the section name to create namespaces to avoid conflicts with two questions with the same id. 
                if(address.province == 'British Columbia') {
                    return [
                        'Vancouver',
                        'Victoria',
                        'Kelowna',
                        'Abbotsford',
                        'Kamloops',
                        'Nanaimo',
                        'Prince George',
                        'Chilliwack',
                        'Vernon',
                        'Courtenay'
                    ]
                } else if (address.province == 'Alberta') {
                    return [
                        'Calgary',
                        'Edmonton',
                        'Red Deer',
                        'Lethbridge',
                        'Medicine Hat',
                        'Grande Prairie',
                        'Airdrie',
                        'Spruce Grove',
                        'Leduc',
                        'Fort Saskatchewan'
                    ]
                } else if (address.province == "Ontario") {
                    return [
                        'Toronto',
                        'Ottawa',
                        'Mississauga',
                        'Brampton',
                        'Hamilton',
                        'London',
                        'Markham',
                        'Vaughan',
                        'Kitchener',
                        'Windsor'
                    ]
                }
            },
            getRandomInt(lowRange, highRange) {
                // This function is using Javascript syntax, which we need to check if that's allowed
                return Math.floor(Math.random() * (highRange - lowRange + 1) + lowRange);
            },
            getAnswerForAddition(num1, num2) {
                return num1 + num2;
            }
        ],
    vars: {}
}
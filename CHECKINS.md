Use this file to commit information clearly documenting your check-ins' content. If you want to store more information/details besides what's required for the check-ins that's fine too. Make sure that your TA has had a chance to sign off on your check-in each week (before the deadline); typically you should discuss your material with them before finalizing it here.

# Check-In 1 - January 19, 2024

## What is the high-level purpose of your DSL? What kind of users is it aimed at? What will it enable users to do?

The Form Builder DSL is a language design to easily create dynamic quizzes with custom grading criteria. The output will be similar to quizzes found on PrairieLearn. It will primarily be aimed at teaching staff in any educational setting where exams and quizzes may take place on a computer. The language will allow for users to create a specification for a quiz with sections that are dynamically generated based on input to previous questions. The language will allow teaching staff to specify grading procedures that execute when completed quizzes are submitted.

The language may also be used in other applications that require processing of form data.

## What are the 2-3 rich features of your DSL? What customisation will each feature enable? Which features can be combined to interact in useful or creative ways?

**1. Loops**: Enable users to ask the same questions about different items in an array. \
**2. Conditional Statements**: Allow users to make questions/fields appear based on answers to previous questions. \
**3. Functions/Procedure**: Provide functionality to create grading criteria, which can mark answers to questions as correct or incorrect after submitting. Procedures can also be used to programmatically generate questions so they change slightly each time the page is loaded (similar to the “Try new variant” functionality in PrairieLearn).

Each of the features listed above can be combined. For example, a function can consist of a loop to iterate over questions with a conditional statement that can check for correct answers.

## Example snippets of your DSL that illustrate at least each rich feature, and any interesting interaction between those.

The example below demonstrates how a user could create a form that asks for availability for a number of their contacts, and then determines when they may find time to meet.

```
Create form{
    contacts: [{name, email, location,transportationMode}]
    setOfQuestions:[(question)]
    sameQuestions: for each in contacts, ask(question in setOfQuestions)
    procedures: [hitGoogleAPItoFindTravelTime(location,transportationMode)]
    constraints: [(if procedures <= maxTravelTime),(question ?? answer)]
    if constraints: ret sendCalenderInvite(contacts)
}
```

The example below demonstrates how a user can create a form with two sections - one “Basic Information” and one “Quiz Section”. Each question would be constructed by the DSL based on the data provided in their definition. A procedure is added to grade answers to the questions upon submission by the user. This example uses an alternative syntax to the example provided above.

```
create form “Math Exam”

section "Basic Information"

question text shown Q1 "What is your name?"
type: short_answer

question scale shown Q2 "Rate your happiness (1-5)"
range: 1 to 5

question choice shown Q3 "What is your favorite color?"
options: ["Red", "Blue", "Green", "Yellow"]


// similar to prairielearn:
section "Quiz Section"

variable score = 0

question choice hidden Q4 “What is 2+2”
options: [“1” ,”4”]
correct: “4”

question choice hidden Q5 “What is 3x3”
options: [“6” ,”9”]
correct: “9”

question choice hidden Q6 “What is Capital of Canada”
options: randomized[“Vancouver” ,”Washington”, “Paris”, “Ottawa”]
correct: “Ottawa”

question group "Exam Questions"
show 2 from [Q4, Q5, Q6]

question submit "Submit Answers"

// script to answer questions
for each question:
	if selected correct:
		score += 1

if score > 2
   display "Great job!"
else
   display "You failed. Please drop out"
```

## Note any important changes/feedback from TA discussion.

Three ideas for DSLs were presented to the TA during the discussion. The general feedback was that a form creator DSL would provide the runway for the greatest feature set out of the ideas presented. There was one main piece of feedback from the TA for the Form Builder DSL when it was presented during the check-in:

Add additional features to make the language more dynamic (i.e. adding grading functionality).

This feedback has been incorporated as one of the rich features of the language.

## Note any planned follow-up tasks or features still to design.

The language tokens and syntax still need to be decided upon.

# Check-In 2 - January 26, 2024

## Planned division of main responsibilities between team members, considering how to enable working in parallel as much as possible.

### Modular Design for the software system: what is the input, output of each component? Who is responsible for each component? Do you want to be jointly responsible for some components?

| Module                        | Input                                 | Output        | Who is Responsible |
| ----------------------------- | ------------------------------------- | ------------- | ------------------ |
| Tokenizer, Parser             | String, Grammar Rules, List of Tokens | Parse Tree    | Rodrigo            |
| AST Conversion, Static Checks | Parse Tree                            | Validated AST | Mohan, Kenny       |
| Evaluation                    | Validated AST                         | Form          | Alex, Will         |

### What is the data at each interface point? Are there invariants over the data other than the class structure?

The data at each interface point has generally been described in the table above.

### How will you be able to build component X independently? Can you write tests for component X independently of its dependent components?

By defining the structure of each input/output, the group will be able to separate the implementation of each module. This will be completed once the language grammar has been defined.

### Who will be responsible for writing which tests, and when (will the same people write the tests as the code)?

The people who are responsible for each module will write their own tests. We will try test driven development. All tests will be written prior to beginning the DSL implementation. Tests can be peer reviewed by team members working on other modules, to ensure that the team is aligned.

### Are there design or other project tasks (possibly including team management), other than these components, that need to be assigned/completed?

The group needs to create the design for the form interface. As far as project tasks, the group has set up weekly meetings to review project progress.

## Roadmap/timeline(s) for what should be done when, and how you will synchronise/check-in with each other to make sure progress is on-track. Talk clearly with your team members about your expectations for communication and progress, and what you will do as a team if someone falls behind.

| Item                                                               | Timeline | Responsible      |
| ------------------------------------------------------------------ | -------- | ---------------- |
| Define a grammar for the DSL                                       | Jan 26   | Rodrigo          |
| Define inputs and output data structures for each module           | Jan 28   | All team members |
| Complete tests - AST conversion                                    | Feb 1    | Mohan, Kenny     |
| Complete tests - AST evaluation                                    | Feb 1    | Alex, Will       |
| Perform first User Study                                           | Feb 1    | Alex             |
| Language design revisions from first User Study                    | Feb 2    | All team members |
| Complete language implementation                                   | Feb 9    | All team members |
| Perform final User Study                                           | Feb 12   | All team members |
| Language design and implementation revisions from final User Study | Feb 14   | All team members |
| Final project submission                                           | Feb 16   | All team members |

## Summary of progress so far.

This far into the project, the group has decided on the DSL to build as well as its feature set, and created several examples that make use of the feature set. The grammar of the language is actively being developed and reviewed. Once this has been completed, the group can proceed with creating tests and working on the implementation for the various modules.

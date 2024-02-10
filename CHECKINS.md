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

question group "Exam Questions_Field"
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

# Check-In 3 - February 2, 2024

## Explain a mockup of your concrete language design (as used for your first user study), including descriptions of both the syntax and what is meant to happen. Include the example snippets you used in your user study, and their outputs.

The code snippet below contains a mock up of the language design that was used in the first user study. This snippet generates a quiz as a series of forms. The first form contains a prompt “Please classify yourself”. Based on the answer to this question, the quiz branches out and users will be directed to different questions. If they answer “Metal”, they will be directed to a page prompting them “Please specify the type of metal you are” with options “Alkali Metal”, “Alkaline Earth Metal”, “Transition Metal”, “Post-Transition Metal”, “Lanthanide”, and “Actinide”. If the user had answered “Nonmetal” to the first question, they would be directed to a form prompting them to “Please specify the type of nonmetal you are”. The options for this question are “Reactive Nonmetal” and “Noble Gas”.

### Language Mock-Up Used in User Study:

```
/**
 * Form Generator script example 2
 *
 * Question 1: Basic Classification
 *  Option A: Are you a Metal?
 *  Option B: Are you a Nonmetal?
 *  Option C: Are you a Metalloid?
 *
 * Based on the answer to Question 1, the follow-up questions will branch out:
 *  Follow-Up Questions_Field if Option A (Metal) is Chosen
 *      Question 2A: Type of Metal
 *          Option A1: Alkali Metal
 *          Option A2: Alkaline Earth Metal
 *          Option A3: Transition Metal
 *          Option A4: Post-Transition Metal
 *          Option A5: Lanthanide
 *          Option A6: Actinide
 *
 *  Follow-Up Questions_Field if Option B (Nonmetal) is Chosen
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
          Metal: "metal-pg",
          Nonmetal: "nonmetal-pg",
          Metalloid: "metalloid-pg",
        },
      },
      questions: [
        {
          id: "what-are-you",
          type: "radio",
          label: "What are you?",
          options: ["Metal", "Nonmetal", "Metalloid"],
          isRequired: 1,
        },
      ],
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
          Lanthanide: "lanthanide-pg",
          Actinide: "actinide-pg",
        },
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
            "Actinide",
          ],
          isRequired: 1,
        },
      ],
    },
    {
      id: "nonmetal-pg",
      header: "Nonmetal",
      goto: {
        if: "nonmetal",
        go: {
          "Reactive Nonmetal": "reactive-nonmetal-pg",
          "Noble Gas": "noble-gas-pg",
        },
      },
      instructions: "Please specify the type of nonmetal you are",
      questions: [
        {
          id: "nonmetal",
          type: "radio",
          label: "What type of nonmetal are you?",
          options: ["Reactive Nonmetal", "Noble Gas"],
          isRequired: 1,
        },
      ],
    },
  ];
}
```

### User Study Participant #1 Results:

```
{
    pages: [
        {
            id: "garment-pg",
            header: "Garment Type",
            instructions: "What type of garment are you?",
            goTo: {
                if: "what-garment-are-you",
                go: {
                    Sweater: "sweater-pg",
                    Scarf: "scarf-pg"
                },
            },
            questions: [
                {
                    id: "what-garment-are-you",
                    type: "radio",
                    label: "What type of garment are you?",
                    options: [ "Sweater", "Scarf" ],
                    isRequired: 1
                },
            ],
        },
        {
            id: "sweater-pg",
            header: "What colour sweater are you?",
            instructions: "Choose a colour",
            goTo: {
                if: "blue",
                go: {
                    LightBlue: "light-blue-pg",
                    DarkBlue: "dark-blue-pg"
                },
            },
            questions: [
                {
                    id: "what-colour-are-you",
                    type: "radio",
                    label: "What colour sweater are you?",
                    options: [ "Light Blue", "Dark Blue" ],
                    isRequired: 1
                }
            ]
        },

        {
            id: "scarf-pg",
            header: "What sized scarf are you?",
            instructions: "Choose a size",
            goTo {
                if: "what-size-are-you",
                go: {
                    Large: "large-scarf-pg",
                    Small: "small-scarf-pg",
                }

            },
            questions: [
                id: "what-size-are-you",
                type: "radio",
                label: "What size scarf are you?",
                options: ["Large", "Small],
                isRequired: 1
            ]
        }
    ],
}
```

### User Study Participant #2 Results

```
{
    pages: [
        {
            id: "choose-your-own-adventure-pg",
            header: "Interactive Adventure Game",
            instructions: "Choose your own path to make a unique adventure",
            goTo: {
                if: "area",
                go: {
                    "Jungle": "jungle-pg",
                    "Mountains": "mountain-pg",
                    "Sea": "sea-pg",
                    "Desert": "desert-pg",
                }
            },
            questions: [
                {
                    id: "name",
                    type: "textInput",
                    label: "Name",
                    isRequired: 1,
                },
                {
                    id: "area",
                    type: "radio",
                    label: "What landscape do you want to explore?",
                    options: ["Jungle", "Mountains", "Sea", "Desert"],
                    isRequired: 1,
                }
            ]
        },
        {
            id: "jungle-pg",
            header: "Welcome to the Jungle!",
            goTo: {
                if: "jungle-method",
                go: {
                    "by zipline": "zipline-pg",
                    "by boat": "boat-pg",
                    "by foot": "foot-pg",
                }
            },
            questions: [
                {
                    id: "jungle-method",
                    type: "radio",
                    label: "The air is hot and humid here, and I can feel the day getting warmer. We need to find somewhere cooler with food and shelter soon. How do you want to explore the jungle?",
                    options: ["by zipline", "by boat", "by foot"],
                    isRequired: 1,
                }
            ]
        },
        {
            id: "zipline-pg",
            header: "The zipline through the treetops was beautiful! But a thick mist just rolled in and it's getting hard to see...",
            questions: [
                {
                    id: "zipline",
                    type: "radio",
                    label: "What should we do next?",
                    options: ["keep going, follow the birds for directions", "get down and shelter by the waterfall below", "climb through the trees above the mist to see the way"],
                    isRequired: 1,
                }
            ]
        },
        {
            id: "boat-pg",
            header: "The local tribes let us join their boat down the river and showed us how to build our own rafts. But now it looks like crocodiles may be following us...",
            questions: [
                {
                    id: "river",
                    type: "radio",
                    label: "What should we do next?",
                    options: ["abandon the raft and swim to the nearest shore quick!", "hold steady and go down the rapids ahead to escape them", "call for help from the local tribesmen"],
                    isRequired: 1,
                }
            ]
        },
        {
            id: "foot-pg",
            header: "Travelling by foot has proved a great way of exploring the jungle floor, finding lots of food. We even stumbled upon an old Mayan temple...",
            questions: [
                {
                    id: "temple",
                    type: "radio",
                    label: "What should we do next?",
                    options: ["go in the temple! let's see what's in there!", "stay outside, there could be deadly traps or a jaguar inside", "make ourselves some weapons then head inside"],
                    isRequired: 1,
                }
            ]
        },
        {
            id: "mountain-pg",
            header: "Welcome to the Mountains!",
            goTo: {
                if: "mountain-method",
                go: {
                    "on skis": "ski-pg",
                    "on bikes": "bike-pg",
                    "on foot": "hike-pg",
                }
            },
            questions: [
                {
                    id: "mountain-method",
                    type: "radio",
                    label: "The beautiful mountains lie ahead of us, with glaciers and lakes, but there's a lot of terrain we need to cover to find safety. How should we explore the mountains?",
                    options: ["on skis", "on bikes", "on foot"],
                    isRequired: 1,
                }
            ]
        },
        {
            id: "ski-pg",
            header: "Skis were definitely the right way to go, there's a lot of snow out here! But I see some deep crevasses in our way...",
            questions: [
                {
                    id: "crevasse",
                    type: "radio",
                    label: "What should we do next?",
                    options: ["keep going, trust the glacier to keep us safe", "turn back and try to find a way through the valley", "get climbing gear and try to climb along the ridgeline"],
                    isRequired: 1,
                }
            ]
        },
        {
            id: "bike-pg",
            header: "Bikes allowed us to cover a lot of distance and find an old cabin to shelter in! But unfortunately the cabin doesn't have any food or water nearby...",
            questions: [
                {
                    id: "cabin",
                    type: "radio",
                    label: "What should we do next?",
                    options: ["hope that someone finds us tomorrow for help", "bike through the night to find a lake for some fish", "try to build a squirrel trap and get our own food"],
                    isRequired: 1,
                }
            ]
        },
        {
            id: "hike-pg",
            header: "Hiking through the mountains has let us navigate the terrain easily and follow ridgelines to see the safest path. But it's getting dark now and we have nowhere to shelter...",
            questions: [
                {
                    id: "night",
                    type: "radio",
                    label: "What should we do next?",
                    options: ["find some snow and try to build a warm snow cave", "keep hiking through the night to try and find shelter", "hike into the valley floor and try to start a fire to stay warm"],
                    isRequired: 1,
                }
            ]
        }
    ]
}
```

## Notes about your first user study. What did they find easy/difficult? What did you learn from your user(s)? Is there anything you would have done differently? Can this be done for your final user study?

The first user study went well for the most part. The users found it straightforward to study the example provided to generate quizzes of their own.

From the user study, the group learned that the number of brackets involved in the language does not make it easy to write. One user claimed it would be simpler to write a quiz if the syntax allowed for a more written language-like approach (as in JavaScript, Python, etc.). This user also experienced some confusion around the syntax of the “if” statements in the language, and suggested that this could be refined.

Due to time constraints, the user study was administered separately to the participants. In future, it may be better to attempt to get two participants who can meet together at the same time, and administer the user study once. This approach could be taken for the final user study, given that some planning is done beforehand to arrange the schedule.

## What changes to your language design have you made so far, or are considering? How does this affect the example snippets you include here?

- Removed sections in favour of having just pages and questions. Examples already updated.
- In the process of moving from JSON format to a more Python-esque format. There will be less brackets and be easier to read.
- Moving variables and functions to a global scope as opposed to question scoped.

## Any changes to your project timeline/plan that you need to make?

There is one definite change that must be made to the project timeline, with one potential change. The original timeline aimed to have the language design revisions from the first user study completed by February 2nd. Now that the group has decided to move from the JSON format to a more Python-esque format, this step will need a few extra days. It will not impact the remainder of the schedule. The same set of tokens will be used to create the AST, and therefore work can begin on the AST conversion and on the Evaluator components of the DSL while the grammar is being revised. Given the complexity of the language, completion of the implementation may take more than one week, which was the original estimate. The team will start on the implementation soon and will need to update this item in the project timeline as required. The final user study can still be expected to be completed on February 12, given that it does not take too long to administer these.

## Are there new tests you can write now, based on your current project status? How can your snippets be made into unit tests, and for which component(s)? What about planned error handling in your components? Tests for these?

We can use the existing JSON format generated lexer/parser to test that the parse tree converts to our desired AST. We can also begin working on AST and evaluation tests, as those require a visualisation of the parse tree and the AST tree, which we have diagrams completed for. If our grammar rules are changing however, that might mean a change in the types and numbers of tests we are doing, which should be simple enough to refactor.

# Check-In 4 - February 9, 2024

## Status of implementation. Component-wise progress. Which tests are passing, and which not? Which extra tests still need to be written/made?

**Tokenizer / Lexer**

The lexer and parser rules have been debugged and are ready to be tested with the AST.
There are three different valid test inputs that can be used to test the rest of the program.
No major changes are expected to the grammar rules going forward.

**AST Conversion**

Converts the parse tree into simple AST nodes
The nodes have been completed. The only nodes that are missing are the function nodes that will be added soon
Ready to be tested and debugged
Static checks are still left to be added.
Only major change is the addition of function nodes which should be completed over this weekend for the Evaluator to use and test.

**Evaluator**

The implementation of the Evaluator has been split into two parts - the first will traverse the AST to put together a JavaScript object that contains all of the information required to generate the quizzes. The second portion uses the React JavaScript library to render the JavaScript object into a usable web form.
Both portions of the Evaluator have been started.
Currently, the first portion of the evaluator can gather all static properties involved in generating the quizzes by traversing the AST. This has been minimally tested and appears to be working.
The second portion of the AST is able to generate static quizzes in its current form.
Function handling still needs to be completed.

**Tests Currently Passing**

The lexer is properly tokenizing the valid test inputs.

Evaluator has simple tests passing.

**Extra Tests That Need to Be Made**

Tests for the parser and more for the evaluator still need to be made, for both valid inputs and invalid inputs. The team focused first on completing the language implementation, and will complete testing afterwards.

## Plans for final user study. Are there any major differences from the previous one? If so, what are the reasons? Make sure to find suitable users (different from the first study!)

The final user study will be conducted in a similar fashion to the previous one. The only major difference is that users involved with the study will be able to use the code they write in the study to generate a quiz they or their friends can use in a web browser.

## Planned timeline for the remaining days. Plans for integration/end-to-end testing. Be sure to test for smooth error-handling (as well as expected results working). Make sure to schedule some time for bug-fixing!

| Item                                                               | Timeline |
| ------------------------------------------------------------------ | -------- |
| Complete language implementation                                   | Feb 12   |
| Perform final user study                                           | Feb 14   |
| Language design and implementation revisions from final User Study | Feb 16   |
| Start integration / end-to-end testing and bug fixing              | Feb 17   |
| Complete integration / end-to-end testin and bug fixing            | Feb 19   |
| Final project submission                                           | Feb 20   |

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

## Note any important changes/feedback from TA discussion.

Three ideas for DSLs were presented to the TA during the discussion. The general feedback was that a form creator DSL would provide the runway for the greatest feature set out of the ideas presented. There was one main piece of feedback from the TA for the Form Builder DSL when it was presented during the check-in:

Add additional features to make the language more dynamic (i.e. adding grading functionality).

This feedback has been incorporated as one of the rich features of the language.

## Note any planned follow-up tasks or features still to design.

The language tokens and syntax still need to be decided upon.

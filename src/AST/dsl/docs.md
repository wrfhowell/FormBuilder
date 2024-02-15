# Table of Contents

1. [Overview](#overview)
2. [DSL Components](#dsl-components)
   - [Page Object](#page)
   - [Question Object](#question)
   - [Functions](#functions)
   - [Vars](#vars)
3. [Form State](#form-state)
4. [API](#api)

# Overview

The Form Generator DSL is used to create dynamic forms through a simple JSON-based text interface. The form generation script consists of a root object that contains an list of [pages](#page), an list [functions](#functions) and [vars](#variables) object. Each page represent a page in the form, which contains zero or more questions. The functions list contains of a list of functions available for generating question content. Finally the vars object is an object of variables accessible to all of the questions.

Form developers also have access to an [API library](#api) of available functions which can be used for generating dynamic content for the questions.

All of the form responses generated by the quiz takers are stored in the [Form State](#form-state). The Form State can be accessed by the form developers to make use of quiz taker responses in other parts of the form and is used by the autograder to check for correct answers.

```
{
  pages: [
    {
      id: "page-id",
      header: pageHeaderText,
      instructions: "These are some instructions",
      goTo: "id-of-next-page",
      displayQuestions: all,
      questions: [
        {
          id: stringConcat("addition-q-", loopIndex),
          type: textInput,
          label: getAdditionQuestionLabel(num1, num2),
          isRequired: true,
          correctAnswer: ans,
          loop: 5,
          vars: {
              num1: getRandomInt(1, 100),
              num2: getRandomInt(1, 100),
              ans: addNums(num1, num2)
          }
        }
      ]
    }
  ],
  functions: [
    addNums(num1, num2) {
      additionAns = (num1 + num2)
      return additionAns
    },
  ],
  vars: {
    pageHeaderText: "This is a page header"
  }
}
```

# DSL Components

## Page

A page object creates a new page and can have any of the following fields, of which only `id` is required.

```
{
  id*,
  header,
  instructions,
  goTo,
  questions,
  displayQuestions
}
```

- `id: String` - **Required** unique page id (eg. "contact-page") <!-- TODO: write static check for this -->
- `heder: String` - Page header text. Can be dynamically generated with a function or variable
- `instructions: String` - Instructions or introduction for the quiz takers. Can be dynamically generated with a function or variable.
- `goTo: String` - ID of page that should follow. If the page that follows is dependent on the quiz taker's responses, it can be generated with a function or a variable <!-- TODO: write dynamic check for this -->
- `Questions: List` - List of questions that will appear in the page. Refer to the [Question](#question) section for more information about the questions.

## Question

A question object creates a new question inside of a page. The only required fields for the question are the `id`, `type` and `label`.

```
{
  id*
  type*
  label*
  options
  dependsOn
  displayIf
  loop
  isRequired
  correctAnswer
  vars
}
```

- `id: String` - **Required** unique question id (eg. "first-name"). Can be dynamically generated with functions or variables. <!-- TODO: write static check for this -->
  `label: String`- **Required** this is the question text that appears above an input
- `type: textInput | radio | checkbox | dropdown` - **Required** question type. textInput creates a simple text input field, radio creates a single select question, checkbox is a multiple select question and dropdown creates a single select question with a dropdown list. For the select questions, a list of `options` must be provided <!-- TODO: write static check to make sure there is a question type -->
- `options: List` - **Required** when the question type is `radio`, `checkbox` or `dropdown`. Can either be a list of strings, a variable or a function that dynamically generates a list of options. <!-- TODO: write static check to ensure options is present for select questions -->
- `dependsOn: String` - If this question is conditional on a different question, this should be the question-id of the other question. Use this if you want to show/hide a question based on the response to a different question or if the options available to select are dependent on another question.
- `displayIf: ` - If the question's display depends on a another question, this field should have the answer that should display the question. For example, if question 1 asks a quiz taker whether they identify as a visible minority, question 2 will only display if the quiz taker selects 'yes' to question 1.
  ```
  {
    id: "visible-minority-q",
    label: "Do you identify as a visible minority?",
    type: radio,
    options: ["Yes", "No"],
    isRequired: true
  }
  {
    id: 'select-minority-q'
    label: "What visible minority do you identify with?"
    type: radio
    options: ["Afro Canadian", "Latin American", "East Asian"...]
    dependsOn: "visible-minority-q"
    displayIf: "Yes"
  }
  ```
- `loop: Number` - Repeats the question `loop` times. So if `loop: 5`, then the question will be repeated 5 times. Useful when generating multiple similar questions dynamically without having to write it multiple times. The `loopindex` keyword can be used to generate unique IDs and identify the question in the Form State

  ```
    {
        id: "addition-q-" + loopIndex,
        type: textInput,
        label: label: "What is " + num1 + "+" + num2 + "?",
        correctAnswer: ans,
        loop: 5,
        vars: {
            num1: Form.getRandomInt(1, 100),
            num2: Form.getRandomInt(1, 100),
            ans: num1 + num2
        }
    }
  ```

- `isRequired: true | false` - Determines whether the quiz taker has to answer the question. Defaults to false.
- `correctAnswer: String | Number` - Used by the autograder to determine the correct answer. Use a function or variable to dynamically generate the correct answer.
- `vars: Object` - An object consisting of key/value pairs used to declare and instantiate variables. These variables, as opposed to the variables in the root object are only accessible by the question.

## Functions

The functions list is a list of C-style curly bracket functions. A few notes about functions

- Functions cannot declare their own variables. If a variable is needed, declare it in the global [vars](#vars) object.
- Functions _must_ have a return value.
- Statements in functions can only be composed of mathematical expressions, other function calls (including the API library) or conditional blocks.
  - The allowable math operators are `+`, `-`, `*`, `/`

```
functions: [
        condFunc(num1, num2) {
            if(isGreater(num1 > num2)) {
                return num1
            }
            return num2
        },

        algebraQuestionAns(num1, num2) {
            return roundToInt( (((num4 - num3) / (num1 * num2) * 100) / 100) )
        },

        getAdditionQuestionLabel(num1, num2) {
            return stringConcat(num1, " + ", num2, " = ")
        }
    ]
```

## Vars

The vars object is a list of key/value pairs where the key is the variable and the value is the value of the variable. Variables can be of type string, number, boolean, list, or function calls.

```
vars: {
  myStr: "this is a string var",
  mybool: true,
  optionsList: ["Vancouver", "Montreal", "Toronto"],
  randomNum: getRandomInt(1, 100),
  answer: 5 + 8,
  myVar: functionCall()
}
```

# Form State

The Form State is a data store that stores all of the quiz taker's responses. These can be accessed by the form developers by entering the page-id and question-id that is needed in this format `formState["page-id"]["question-id"]`.

# API

Functions currently used in examples:
stringConcat(args...),
isEqual(num1, num2),
isGreater(num1, num2),
isGreaterEqual(num1, num2),
isLess(num1, num2),
isLessEqual(num1, num2)
getRandom(),
getRandomInt(min, max)
roundToInt()
const quizData = {
    globalVariables: [
      {
        name: "score",
        value: 0,
      },
    ],
    pages: [
      {
        goTo: {
          goOptions: {
            next: "end",
          },
          ifStatementValue: undefined,
        },
        header: undefined,
        id: "page1",
        instructions: undefined,
        questions: [
          {
            correctAnswer: "20",
            displayIf: undefined,
            id: "q1",
            isRequired: true,
            label: "What is 10 + 10?",
            loop: undefined,
            options: [
              "10",
              "20",
              "30",
              "40",
            ],
            type: "radio",
            variables: undefined,
          },
        ],
        variables: undefined,
      },
    ],
  };
  
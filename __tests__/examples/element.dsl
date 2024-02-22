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
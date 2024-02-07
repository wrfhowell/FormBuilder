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
            isRequired: 1,
          },
          {
            id: "last-name",
            type: "textInput",
            label: "Last Name",
            isRequired: 1,
          },
          {
            id: "dob",
            type: "textInput",
            label: "Date of Birth",
            isRequired: 1,
          },
        ],
      },
      {
        id: "demographic-info",
        header: "Demographic Information",
        instructions: "Please provide the following demographic information",
        questions: [
          {
            id: "ethnicity",
            label: "What ethnicity do you identify as?",
            type: "checkbox",
            options: [
              "White",
              "Black or African American",
              "Hispanic or Latino",
              "Asian",
              "First Nations",
              "Other",
            ],
            isRequired: 0,
          },
          {
            id: "ethnicity-other",
            label: "If other, please specify your ethnicity",
            type: "textInput",
            // This question is only displayed if the user selects 'Other' in the previous question
            dependsOn: "ethnicity",
            displayIf: "Other",
          },
        ],
      },
      {
        id: "address",
        header: "Address",
        instructions: "Please provide your address",
        questions: [
          {
            id: "street-address",
            label: "Street Address",
            type: "textInput",
            isRequired: 1,
          },
          {
            id: "province",
            label: "Province",
            type: "dropdown",
            options: provinces,
            isRequired: 1,
          },
          {
            id: "city",
            label: "City",
            type: "dropdown",
            dependsOn: "province",
            options: getCityOptions(FormState["demographic-info"]["province"]),
            isRequired: 1,
          },
  
          {
            id: "postal-code",
            label: "Postal Code",
            type: "textInput",
            isRequired: 1,
          },
        ],
      },
    ],

    functions: [
      getCityOptions(prov) {
        if(prov == "Ontario") {
          return ontarioCities
        } else if(prov == "Quebec") {
          return quebecCities
        } else if(prov == "Nova Scotia") {
          return novaScotiaCities
        } else if(prov == "New Brunswick") {
          return newBrunswickCities
        } else if(prov == "Manitoba") {
          return manitobaCities
        } else if(prov == "British Columbia") {
          return britishColumbiaCities
        } else if(prov == "Prince Edward Island") {
          return princeEdwardIslandCities
        } else if(prov == "Saskatchewan") {
          return saskatchewanCities
        } else if(prov == "Alberta") {
          return albertaCities
        } else if(prov == "Newfoundland and Labrador") {
          return newfoundlandAndLabradorCities
        } else {
          return []
        }
      },
    ],

    vars: {
      provinces: [
        "Ontario",
        "Quebec",
        "Nova Scotia",
        "New Brunswick",
        "Manitoba",
        "British Columbia",
        "Prince Edward Island",
        "Saskatchewan",
        "Alberta",
        "Newfoundland and Labrador",
      ],
      ontarioCities: [
        "Toronto",
        "Ottawa",
        "Mississauga",
        "Brampton",
        "Hamilton",
        "London",
        "Markham",
        "Vaughan",
        "Kitchener",
        "Windsor",
      ],
      quebecCities: [
        "Montreal",
        "Quebec City",
        "Laval",
        "Gatineau",
        "Longueuil",
        "Sherbrooke",
        "Saguenay",
        "Levis",
        "Trois-Rivieres",
        "Terrebonne",
      ],
      novaScotiaCities: [
        "Halifax",
        "Dartmouth",
        "Sydney",
        "Truro",
        "New Glasgow",
        "Glace Bay",
        "Kentville",
        "Stellarton",
        "Wolfville",
        "Windsor",
      ],
      newBrunswickCities: [
        "Moncton",
        "Saint John",
        "Fredericton",
        "Dieppe",
        "Miramichi",
        "Edmundston",
        "Bathurst",
        "Campbellton",
        "Oromocto",
        "Grand Falls",
      ],
      manitobaCities: [
        "Winnipeg",
        "Brandon",
        "Steinbach",
        "Portage la Prairie",
        "Thompson",
        "Winkler",
        "Selkirk",
        "Dauphin",
        "Morden",
        "The Pas",
      ],
      britishColumbiaCities: [
        "Vancouver",
        "Victoria",
        "Kelowna",
        "Abbotsford",
        "Kamloops",
        "Nanaimo",
        "Prince George",
        "Chilliwack",
        "Vernon",
        "Courtenay",
      ],
      princeEdwardIslandCities: [
        "Charlottetown",
        "Summerside",
        "Cornwall",
        "Montague",
        "Kensington",
        "Souris",
        "Alberton",
        "Tignish",
        "Georgetown",
        "Stratford",
      ],
      saskatchewanCities: [
        "Saskatoon",
        "Regina",
        "Prince Albert",
        "Moose Jaw",
        "Yorkton",
        "Swift Current",
        "North Battleford",
        "Estevan",
        "Weyburn",
        "Corman Park",
      ],
      albertaCities: [
        "Calgary",
        "Edmonton",
        "Red Deer",
        "Lethbridge",
        "Medicine Hat",
        "Grande Prairie",
        "Airdrie",
        "Spruce Grove",
        "Leduc",
        "Fort Saskatchewan",
      ],
      newfoundlandAndLabradorCities: [
        "St. John's",
        "Mount Pearl",
        "Corner Brook",
        "Conception Bay South",
        "Grand Falls-Windsor",
        "Paradise",
        "Gander",
        "Labrador City",
        "Stephenville",
        "Happy Valley-Goose Bay",
      ],
    }
  }
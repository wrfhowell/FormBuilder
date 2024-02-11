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
export const questions = [
    {
        question: "Has {Component} been implemented?",
        description: "If the component has been coded up and is available in production",
        options: [
            { text: "Yes", score: 10 },
            { text: "No, it's just a design", score: 0, skipToResults: true },
        ],
        image: null,
    },
    {
        question: "Is there documentation available for {Component}?",
        description: "Verify if documentation exists for the component.",
        options: [
            { text: "No", score: 0 },
            { text: "Yes", score: 10 },
        ],
        image: null,
    },
    {
        question: "Does {Component} use design tokens?",
        description: "Evaluate the usage of design tokens in the component.",
        options: [
            { text: "Not at all", score: 2 },
            { text: "A mixture, some have tokens some don't", score: 5 },
            { text: "Everything that is tokenized in code is", score: 8 },
            { text: "Yes, everything is design tokens", score: 10 },
        ],
        image: null,
    },
    {
        question: "Does the Figma component name for {Component} match the namespace in code?",
        description: "Assess the consistency between Figma component names and code namespaces.",
        options: [
            { text: "Not very close", score: 2 },
            { text: "Somewhat close", score: 5 },
            { text: "Slightly amended", score: 9 },
            { text: "Perfect", score: 10 },
        ],
        image: {
            url: "/placeholder.svg?height=400&width=400",
            caption: "Example of design-code comparison",
        },
    },
    {
        question: "Do you include links and metadata in {Component}'s description?",
        description: "Check if links and metadata are included in the component's description.",
        options: [
            { text: "None", score: 1 },
            { text: "Just metadata", score: 6 },
            { text: "Just links to documentation", score: 7 },
            { text: "Both to documentation and metadata", score: 10 },
        ],
        image: {
            url: "/placeholder.svg?height=400&width=400",
            caption: "Collaboration between designers and developers",
        },
    },
    {
        question: "How are your Figma library pages organized?",
        description: "Evaluate the organization of Figma library pages.",
        options: [
            { text: "All in a single page", score: 3 },
            { text: "A mixture", score: 7 },
            { text: "One page per component with sub components too", score: 9 },
            { text: "One page per component", score: 10 },
        ],
        image: {
            url: "/placeholder.svg?height=400&width=400",
            caption: "Collaboration between designers and developers",
        },
    },
    {
        question: "If your component has a state prop, how is it set up?",
        description: "Determine how state props are set up in the component.",
        options: [
            { text: "I don't have a state prop", score: 10 },
            { text: "A mixture", score: 7 },
            { text: "Some states are component API", score: 9 },
            { text: "Every state is in the state prop", score: 10 },
        ],
        image: {
            url: "/placeholder.svg?height=400&width=400",
            caption: "Collaboration between designers and developers",
        },
    },
    {
        question: "How have you matched {Component} properties with code?",
        description: "Assess the consistency between component properties and code.",
        options: [
            { text: "Nothing matches", score: 2 },
            { text: "A mixture of exact and different", score: 6 },
            { text: "All props are exact but casing is different", score: 9 },
            { text: "All props are exactly the same as code, even the casing", score: 10 },
        ],
        image: {
            url: "/placeholder.svg?height=400&width=400",
            caption: "Collaboration between designers and developers",
        },
    },
    {
        question: "If {Component} has a prop for dynamic content, how is it set up in Figma?",
        description: "Evaluate how dynamic content props are set up in Figma.",
        options: [
            { text: "It doesn't need one", score: null },
            { text: "Preferred values with a default", score: 2 },
            { text: "Editable text", score: 6 },
            { text: "All props are exact but casing is different", score: 9 },
            { text: "A slot technique", score: 10 },
        ],
        image: {
            url: "/placeholder.svg?height=400&width=400",
            caption: "Collaboration between designers and developers",
        },
    },
    {
        question: "How do you match the structure and layout?",
        description: "Assess the consistency of structure and layout.",
        options: [
            { text: "Hierarchy", score: null },
            { text: "Preferred values with a default", score: 2 },
            { text: "Editable text", score: 6 },
            { text: "All props are exact but casing is different", score: 9 },
            { text: "A slot technique", score: 10 },
        ],
        image: {
            url: "/placeholder.svg?height=400&width=400",
            caption: "Collaboration between designers and developers",
        },
    },
    {
        question: "How do you handle sub-components?",
        description: "Evaluate the handling of sub-components.",
        options: [
            { text: "We don't need it", score: null },
            { text: "Match", score: 10 },
        ],
        image: {
            url: "https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/ae1e5755-c9dc-44b5-a805-2a11a69969be/Screenshot_2025-02-22_at_6.25.55_PM.png?t=1740209161",
            caption: "Collaboration between designers and developers",
        },
    },
    {
        question: "Is code connect set up?",
        description: "Check if code connect is set up.",
        options: [
            { text: "No", score: 0 },
            { text: "Yes but it's outdated", score: 5 },
            { text: "Yes", score: 10 },
        ],
        image: {
            url: "https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/ae1e5755-c9dc-44b5-a805-2a11a69969be/Screenshot_2025-02-22_at_6.25.55_PM.png?t=1740209161",
            caption: "Collaboration between designers and developers",
        },
    },
    {
        question: "How do you handle configuration examples?",
        description: "Evaluate the handling of configuration examples.",
        options: [
            { text: "We don't have any examples", score: 0 },
            { text: "Different examples exist in design and code", score: 5 },
            { text: "The exact same examples are in both design and code", score: 10 },
        ],
        image: {
            url: "https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/ae1e5755-c9dc-44b5-a805-2a11a69969be/Screenshot_2025-02-22_at_6.25.55_PM.png?t=1740209161",
            caption: "Collaboration between designers and developers",
        },
    },
    {
        question: "How do you handle accessibility annotations?",
        description: "Evaluate the handling of accessibility annotations.",
        options: [
            { text: "What's accessibility?", score: 0 },
            { text: "Accessibility is set up in code but nothing exists in design", score: 3 },
            { text: "We have a loose connection", score: 6 },
            { text: "An annotations kit is used to define everything and match a screen reader", score: 10 },
        ],
        image: {
            url: "https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/ae1e5755-c9dc-44b5-a805-2a11a69969be/Screenshot_2025-02-22_at_6.25.55_PM.png?t=1740209161",
            caption: "Collaboration between designers and developers",
        },
    },
    {
        question: "Do you have tooling to help keep design and code in sync?",
        description: "Evaluate the tools used to keep design and code in sync.",
        options: [
            { text: "No", score: 0 },
            { text: "Yes, but the tooling is manual", score: 5 },
            { text: "Yes, tooling automatically translates between design and code", score: 10 },
        ],
        image: {
            url: "https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/ae1e5755-c9dc-44b5-a805-2a11a69969be/Screenshot_2025-02-22_at_6.25.55_PM.png?t=1740209161",
            caption: "Collaboration between designers and developers",
        },
    },
]

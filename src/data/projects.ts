export const projects = [
  {
    id: "smart-mirror",
    title: "Smart Mirror V2",
    shortDescription:
      "A custom built smart mirror with facial recognition, personalized dashboards, and voice control.",
    longDescription:
      "I wanted a morning dashboard that didn't require pulling out my phone. This smart mirror uses a two-way glass pane over an old monitor, powered by a Raspberry Pi. It recognizes who is standing in front of it and adjusts the widgets accordingly.",
    category: "Hardware",
    techStack: ["Raspberry Pi", "Python", "OpenCV", "React"],
    status: "Completed",
    github: "https://github.com",
    demo: "https://demo.com",
    image: "https://picsum.photos/seed/mirror/800/600",
    gallery: [
      "https://picsum.photos/seed/mirror1/800/600",
      "https://picsum.photos/seed/mirror2/800/600",
    ],
    challenges:
      "Getting the two-way glass to not absorb too much light from the monitor behind it.",
    learnings:
      "Learned a lot about hardware-software interfacing and basic woodworking for the frame.",
  },
  {
    id: "digital-garden",
    title: "Digital Garden Theme",
    shortDescription:
      "A minimalist, typography-focused theme for personal blogs and digital gardens.",
    longDescription:
      "Built for writers who want a clean, distraction-free environment. Features bidirectional linking, full text search, and a beautiful dark mode.",
    category: "Software",
    techStack: ["Next.js", "Tailwind CSS", "MDX"],
    status: "In Progress",
    github: "https://github.com",
    demo: "https://demo.com",
    image: "https://picsum.photos/seed/garden/800/600",
    gallery: [
      "https://picsum.photos/seed/garden1/800/600",
      "https://picsum.photos/seed/garden2/800/600",
    ],
    challenges:
      "Implementing fast client-side search across hundreds of markdown files.",
    learnings: "Deep dive into AST parsing and search indexing algorithms.",
  },
  {
    id: "analog-synth",
    title: "Analog Synthesizer",
    shortDescription:
      "A fully functional 3-oscillator analog synthesizer built from scratch.",
    longDescription:
      "A passion project combining my love for music and electronics. Features custom PCB designs, 3D printed knobs, and a laser-cut wooden enclosure.",
    category: "Hardware",
    techStack: ["C++", "KiCad", "Fusion 360", "Woodworking"],
    status: "Completed",
    github: "https://github.com",
    demo: "https://demo.com",
    image: "https://picsum.photos/seed/synth/800/600",
    gallery: [
      "https://picsum.photos/seed/synth1/800/600",
      "https://picsum.photos/seed/synth2/800/600",
    ],
    challenges:
      "Tuning the oscillators to stay in pitch across multiple octaves.",
    learnings: "Advanced PCB routing techniques and analog circuit design.",
  },
];

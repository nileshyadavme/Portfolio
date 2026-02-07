export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string;
    image?: string;
}

export const PROJECTS: Project[] = [
    {
        id: "1",
        title: "Neural Search Engine",
        description:
            "A semantic search engine built with Python and vector databases. Uses embeddings to understand query intent beyond keyword matching.",
        tags: ["AI", "Python", "Vector DB"],
        github: "https://github.com",
        link: "https://example.com",
    },
    {
        id: "2",
        title: "E-Commerce Microservices",
        description:
            "Scalable e-commerce backend built with Go and gRPC. Features event-driven architecture and distributed tracing.",
        tags: ["Backend", "Go", "Microservices"],
        github: "https://github.com",
    },
    {
        id: "3",
        title: "Algorithm Visualizer",
        description:
            "Interactive web app to visualize sorting and graph algorithms. Built with React and D3.js for educational purposes.",
        tags: ["Web", "React", "D3.js"],
        link: "https://example.com",
    },
    {
        id: "4",
        title: "Smart Home Dashboard",
        description:
            "IoT dashboard for managing smart devices. Built with Next.js and secure WebSocket connections.",
        tags: ["Web", "IoT", "Next.js"],
        github: "https://github.com",
    },
    {
        id: "5",
        title: "DevOps Pipeline Tool",
        description:
            "CLI tool to automate deployment workflows. Integrates with AWS and Docker for seamless CI/CD.",
        tags: ["Tools", "DevOps", "Go"],
        github: "https://github.com",
    },
    // Adding more mock projects for the full page
    {
        id: "6",
        title: "Portfolio Website v1",
        description: "My previous portfolio built with Gatsby and Styled Components.",
        tags: ["Web", "React", "Gatsby"],
        github: "https://github.com",
    },
    {
        id: "7",
        title: "Chat Application",
        description: "Real-time chat app using Socket.io and Redis for message persistence.",
        tags: ["Web", "Backend", "Socket.io"],
        github: "https://github.com",
    },
];

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    tags: string[];
    slug: string;
    image?: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: "1",
        title: "Building Scalable Microservices with Go",
        excerpt: "Learn how to structure your Go applications for scale and maintainability using domain-driven design principles.",
        date: "May 15, 2024",
        readTime: "8 min read",
        tags: ["Backend", "Go", "Architecture"],
        slug: "scalable-microservices-go",
    },
    {
        id: "2",
        title: "The Future of AI in Software Engineering",
        excerpt: "Exploring how LLMs are changing the way we write, test, and deploy code.",
        date: "April 28, 2024",
        readTime: "5 min read",
        tags: ["AI", "Career", "Opinion"],
        slug: "ai-future-software-engineering",
    },
    {
        id: "3",
        title: "Mastering React Server Components",
        excerpt: "A deep dive into the server-side rendering paradigm in Next.js 14 and how it improves performance.",
        date: "March 10, 2024",
        readTime: "10 min read",
        tags: ["Web", "React", "Next.js"],
        slug: "react-server-components",
    },
    {
        id: "4",
        title: "Why formatting code matters",
        excerpt: "Code style consistency is crucial for long-term project health. Here's why.",
        date: "Feb 12, 2024",
        readTime: "4 min read",
        tags: ["Best Practices", "Tools"],
        slug: "formatting-matters",
    },
];

export interface TimelineEntry {
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
    logo?: string;
    image?: string; // New field for storytelling image
    tags?: string[];
    current?: boolean;
}

export const EXPERIENCE: TimelineEntry[] = [
    {
        id: "1",
        role: "Senior Software Engineer",
        company: "Tech Corp",
        period: "2023 - Present",
        description:
            "Leading the frontend architecture migration to Next.js. Improved performance by 40% and established a new design system used across 5 products.",
        current: true,
        tags: ["React", "Next.js", "System Design"],
        logo: "/logos/techcorp.png",
        image: "/timeline/tech-team.jpg", // Placeholder
    },
    {
        id: "2",
        role: "Software Engineer",
        company: "Startup Inc",
        period: "2021 - 2023",
        description:
            "Built and scaled the core payment infrastructure processing $1M+ monthly. Mentored 2 junior developers and introduced automated testing pipelines.",
        tags: ["Go", "PostgreSQL", "AWS"],
        logo: "/logos/startup.png",
        image: "/timeline/startup-office.jpg", // Placeholder
    },
    {
        id: "3",
        role: "Full Stack Developer",
        company: "Freelance",
        period: "2019 - 2021",
        description:
            "Delivered 15+ web applications for clients in fintech and healthcare. Specialized in React and Node.js solutions.",
        tags: ["Node.js", "React", "Firebase"],
        logo: "/logos/freelance.png",
        image: "/timeline/freelance-work.jpg", // Placeholder
    },
];

export const EDUCATION: TimelineEntry[] = [
    {
        id: "e1",
        role: "BS Computer Science",
        company: "University of Technology",
        period: "2015 - 2019",
        description: "Focus on Distributed Systems and Artificial Intelligence. Graduated with honors.",
        tags: ["Distributed Systems", "AI", "Algorithms"],
        logo: "/logos/university.png",
        image: "/timeline/graduation.jpg", // Placeholder
    },
];

export interface GalleryItem {
    id: string;
    title: string;
    src: string;
    category: string;
    location: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
    {
        id: "1",
        title: "Mountain Sunrise",
        src: "/gallery/mountain.jpg",
        category: "Landscape",
        location: "Swiss Alps",
    },
    {
        id: "2",
        title: "Urban Geometry",
        src: "/gallery/urban.jpg",
        category: "Architecture",
        location: "Tokyo, Japan",
    },
    {
        id: "3",
        title: "Neon Nights",
        src: "/gallery/neon.jpg",
        category: "Street",
        location: "Hong Kong",
    },
    {
        id: "4",
        title: "Serene Lake",
        src: "/gallery/lake.jpg",
        category: "Nature",
        location: "Banff, Canada",
    },
    {
        id: "5",
        title: "Minimalist Interior",
        src: "/gallery/interior.jpg",
        category: "Interior",
        location: "Copenhagen",
    },
    {
        id: "6",
        title: "Desert Dunes",
        src: "/gallery/desert.jpg",
        category: "Landscape",
        location: "Sahara",
    },
];

export interface VolunteerEntry {
    id: string;
    role: string;
    organization: string;
    period: string;
    description: string;
    location: string;
    link?: string;
    images?: string[];
}

export const VOLUNTEERING: VolunteerEntry[] = [
    {
        id: "v1",
        role: "Tech Mentor",
        organization: "Code for Good",
        period: "2022 - Present",
        description: "Mentoring underprivileged youth in web development fundamentals. Helping them build their first portfolio websites.",
        location: "San Francisco, CA",
        images: [
            "/volunteer/mentor-1.jpg",
            "/volunteer/mentor-2.jpg",
            "/volunteer/workshop.jpg",
        ],
    },
    {
        id: "v2",
        role: "Event Organizer",
        organization: "Local Hack Day",
        period: "2021 - 2023",
        description: "Organized annual hackathons for 200+ participants. Managed logistics, sponsorships, and judging panels.",
        location: "Remote / Hybrid",
        images: [
            "/volunteer/hackathon-1.jpg",
            "/volunteer/hackathon-crowd.jpg",
        ],
    },
    {
        id: "v3",
        role: "Open Source Contributor",
        organization: "Mozilla",
        period: "2020 - 2021",
        description: "Contributed documentation and accessibility fixes to MDN Web Docs.",
        location: "Remote",
        link: "https://developer.mozilla.org",
    },
];

export interface Book {
    id: string;
    title: string;
    author: string;
    thought: string;
    color: string;
}

export const BOOKS: Book[] = [
    {
        id: "1",
        title: "The Pragmatic Programmer",
        author: "Andy Hunt & Dave Thomas",
        thought: "A timeless guide on software craftsmanship. Changed how I approach debugging and refactoring.",
        color: "bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
    },
    {
        id: "2",
        title: "Clean Code",
        author: "Robert C. Martin",
        thought: "Fundamental principles for writing readable and maintainable code. 'Code is read much more often than it is written.'",
        color: "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400",
    },
    {
        id: "3",
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        thought: "The bible for distributed systems. Essential for understanding database internals and scalability.",
        color: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
    },
    {
        id: "4",
        title: "Structure and Interpretation of Computer Programs",
        author: "Abelson & Sussman",
        thought: "Deep dive into the philosophy of computer science. Lisp reveals the beauty of recursion.",
        color: "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400",
    },
    {
        id: "5",
        title: "Refactoring",
        author: "Martin Fowler",
        thought: "Improving the design of existing code. A must-read for working on legacy codebases.",
        color: "bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400",
    },
    {
        id: "6",
        title: "Algorithms",
        author: "Robert Sedgewick",
        thought: "Comprehensive guide to algorithms and data structures. Essential for competitive programming.",
        color: "bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400",
    },
];

export const SOCIAL_LINKS = [
    {
        name: "GitHub",
        url: "https://github.com",
        icon: "Github",
    },
    {
        name: "LinkedIn",
        url: "https://linkedin.com",
        icon: "Linkedin",
    },
    {
        name: "Instagram",
        url: "https://instagram.com",
        icon: "Instagram",
    },
    {
        name: "YouTube",
        url: "https://youtube.com",
        icon: "Youtube",
    },
    {
        name: "Kaggle",
        url: "https://kaggle.com",
        icon: "Kaggle", // Will handle this special case component-side or add SVG path
    },
];

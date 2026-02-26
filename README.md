<div align="center">

# ✦ Nilesh — Personal Portfolio

*Design · Build · Deploy*

[![Built with React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Powered by Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-D96C2B?style=flat-square)](LICENSE)

</div>

---

> *"I design and build Machine Learning systems for real-world impact. I believe code is a medium for expression, just like paint or ink."*

A handcrafted, dark-mode-first personal portfolio. Built with care, not a template. Every interaction has a reason.

---

## ✨ Features

| Section | Description |
|---|---|
| 🏠 **Home** | Hero with photo, coding stats (GitHub · LeetCode · Kaggle), recent work |
| 👤 **About** | Animated skill bars, experience timeline, polaroid portrait |
| 🔧 **Projects** | Folder-grid by tech stack → drill into project detail with gallery |
| 📓 **Journal** | Markdown-powered blog, folder-grouped by tags |
| 📚 **Library** | Reading list with star ratings and reading progress |
| 📷 **Photography** | Photo folders with full EXIF data viewer |
| 🔗 **Links** | Bento-grid link-in-bio page (`/links`) |
| 📬 **Contact** | Contact form + social links |
| 📄 **Resume** | In-page resume modal with PDF download |

**Design highlights:**
- 🌗 Dark/light mode — class-based, FOUC-free, persisted to `localStorage`
- 🎞️ Smooth animated page transitions with Framer Motion
- ✨ Animated ambient background orbs
- 📱 Fully responsive down to mobile
- ⚡ Code-split routes + lazy-loaded Markdown for fast initial loads
- 🟫 Warm typographic palette — Inter, Playfair Display, JetBrains Mono

---

## 🗂 Project Structure

```
src/
├── App.tsx               # Route map (code-split with React.lazy)
├── index.css             # Design tokens, global styles
│
├── components/           # Reusable UI building blocks (15 components)
│   ├── Layout.tsx        # Page shell — Nav, MotionBackground, Footer
│   ├── FolderCard.tsx    # Photography / Journal / Projects folder card
│   ├── ResumeModal.tsx   # In-page resume viewer
│   ├── CodingStats.tsx   # GitHub + LeetCode + Kaggle stats
│   └── ...
│
├── pages/                # One file = one route (9 pages)
│   ├── Home.tsx
│   ├── Journal.tsx
│   ├── Projects.tsx
│   └── ...
│
└── data/                 # ← Edit your content here
    ├── config.ts         # Your name, bio, socials, hero image
    ├── projects.ts       # Project list
    ├── experience.ts     # Work history + skills
    ├── resume.ts         # Resume modal content
    ├── books.ts          # Reading list
    ├── photos.ts         # Photography folders
    ├── coding.ts         # GitHub / LeetCode / Kaggle stats
    └── journals/         # ← Add new blog posts here as .md files
        ├── slow-coding.md
        └── your-new-post.md
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/nileshyadavme/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open `http://localhost:5173` — changes hot-reload instantly.

---

## ✏️ Making It Your Own

### Update site info
Edit [`src/data/config.ts`](src/data/config.ts):
```ts
export const config = {
  name: "Your Name",
  role: "Your tagline",
  bio: "...",
  heroImage: "assets/your-photo.jpg",
  socials: {
    github: "https://github.com/you",
    // ...
  },
};
```

### Add a journal post
Just drop a `.md` file into `src/data/journals/`. No code changes needed.

```markdown
---
title: "My New Post"
date: "2026-03-01"
category: "Craft"
tags: ["writing", "ideas"]
excerpt: "A short summary shown in the list view."
readTime: 4
---

Your content goes here in **Markdown**.
```

### Add a project
Add an entry to [`src/data/projects.ts`](src/data/projects.ts) — the folder grid auto-generates from `techStack`.

### Add a photo folder
Add an entry to [`src/data/photos.ts`](src/data/photos.ts).

---

## 🛠 Tech Stack

| | |
|---|---|
| **Framework** | React 19 |
| **Build Tool** | Vite 6 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 + Vanilla CSS |
| **Animation** | Framer Motion (`motion/react`) |
| **Routing** | React Router DOM v7 |
| **Markdown** | `react-markdown` + `remark-math` + `rehype-katex` |
| **Icons** | Lucide React |
| **Fonts** | Inter · Playfair Display · JetBrains Mono |
| **Analytics** | Vercel Speed Insights |

---

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Preview production build locally
npm run preview
```

Output goes to `dist/`. Deploy to **[Vercel](https://vercel.com)** or **[Netlify](https://netlify.com)** — just point it at the repo and it works instantly.

---

## 📄 License

MIT — use it, fork it, make it yours. If you do, a ⭐ on the repo is always appreciated.

---

<div align="center">

Made with ☕ + sawdust · [nileshyadavme](https://github.com/nileshyadavme)

</div>


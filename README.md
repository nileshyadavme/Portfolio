# My Portfolio - Developer Guide

Welcome to the codebase for my portfolio! This guide is designed to help you understand how the code is structured and how you can make changes easily, even if you are brand new to React and web development.

## Getting Started

To run this website on your own computer:

1. **Install dependencies:**
   Make sure you have [Node.js](https://nodejs.org/) installed. Open a terminal (command prompt) in this project folder and run:
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the local server URL provided in the terminal (usually `http://localhost:3000`). Any changes you make to the code will automatically update in your browser instantly!

## Codebase Structure

The entire website lives inside the `src/` folder. Here is what each subfolder does:

### 1. `src/data/` 📝 - **Change your content here!**
If you just want to update the text, links, or images on your website, you usually **don't need to touch the React components**. All the data that powers the site is stored in simple TypeScript files here:
- `config.ts`: General website settings (like your name, role, or email).
- `projects.ts`: Your portfolio projects shown on the Projects page.
- `experience.ts` / `resume.ts` / `timeline.ts`: Your work history, timeline, and resume details.
- `photos.ts`: Images specifically for your Photography page.
- `journal.ts`: Your blog or journal entries.
- `books.ts`: Your reading list or favorite books.

**How to add a new project:** Open `src/data/projects.ts` and add a new entry to the list following the exact same format (title, description, image link, etc.) as the others.

### 2. `src/pages/` 📄 - **The pages of your website**
Each file here represents a different page on your website (e.g., `Home.tsx`, `About.tsx`, `Contact.tsx`).
- If you want to change the layout or add entirely new sections to a specific page, edit the corresponding `.tsx` file here.
- These pages use React components (from the `src/components/` folder) to build the layout.

### 3. `src/components/` 🧩 - **Reusable UI pieces**
This folder contains the smaller building blocks of your website. Instead of writing the same code over and over for every page, we create reusable components.
- `Navigation.tsx` / `Footer.tsx`: The top bar and bottom section of your site.
- `Button.tsx`: A button style you can use anywhere.
- `ThemeToggle.tsx`: The dark/light mode switch.
- `Layout.tsx`: The wrapper that keeps the Navigation and Footer visible on every single page.
- Other fun bits like `Polaroid.tsx`, `StickyNote.tsx`, and `Squiggle.tsx` are unique design elements.

### 4. `src/App.tsx` & `src/main.tsx` 🚀 - **The starting point**
- `main.tsx` is the entryway that takes your React code and injects it into the browser (`index.html`).
- `App.tsx` handles the **Routing**. It acts as a map, telling the website which Page component to load based on the URL (e.g., loading `About.tsx` when the user goes to `/about`).

### 5. Styling with Tailwind CSS 🎨
This project uses **[Tailwind CSS](https://tailwindcss.com/)** for styling. Instead of writing separate standard CSS files, you style elements by adding "classes" directly in the HTML/React code.
- **Example:** `<div className="bg-blue-500 text-white p-4">` creates a blue box with white text and some padding (`p-4`).
- Global base styles and font imports are located in `src/index.css`.

## How to Make Common Changes (Examples)

**Scenario 1: I want to update my email address.**
- Look in `src/data/config.ts` or `src/pages/Contact.tsx`. Update the text, save the file, and watch the browser update.

**Scenario 2: I want to add a new link to the Navigation bar.**
- Open `src/components/Navigation.tsx`. Find the list of links and add a new one. Then, make sure you configure the route in `src/App.tsx` and create the new page in `src/pages/` if it doesn't exist yet.

**Scenario 3: I want to change a color.**
- Find the component or page you want to modify. Look at the `className="..."` attribute and change the Tailwind classes (e.g., change `text-gray-500` to `text-red-500`).

## Key Technologies Used
- **[React](https://react.dev/)**: The core UI library.
- **[Vite](https://vitejs.dev/)**: The lightning-fast build tool matching `npm run dev`.
- **[React Router](https://reactrouter.com/)**: For navigating between pages without refreshing the browser.
- **[Tailwind CSS](https://tailwindcss.com/)**: For styling components quickly.
- **[Framer Motion](https://www.framer.com/motion/)**: For smooth, dynamic animations (used in `MotionBackground.tsx`, page transitions, etc.).
- **[Lucide React](https://lucide.dev/)**: An icon library for all the little icons across the site.

Welcome to web development! Have fun exploring and customizing your portfolio!

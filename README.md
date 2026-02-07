# Portfolio Website Documentation

Welcome to the documentation for your portfolio website. This guide covers how to update content, add new projects/blogs, and manage the site.

## 📂 Project Structure

- **`src/app`**: Pages and routing (Next.js App Router).
- **`src/components`**: React components (UI, layout, features).
- **`src/content`**: MDX files for Projects and Blogs.
- **`src/lib/data.ts`**: Static data for Timeline, Gallery, Volunteer, and Books.
- **`public`**: Static assets (images, icons).

---

## 📝 Managing Content

### 1. **Projects**
Projects are managed as **MDX files** in `src/content/projects/`.

**To add a new project:**
1.  Create a new file: `src/content/projects/my-new-project.mdx`.
2.  Add the frontmatter (metadata) at the top:
    ```yaml
    ---
    title: "My New Project"
    description: "A brief description of the project."
    date: "2024-03-20"
    tags: ["React", "TypeScript", "Next.js"]
    image: "/projects/my-project-cover.jpg"
    github: "https://github.com/username/repo"
    link: "https://my-project-demo.com"
    ---
    ```
3.  Write your content in Markdown below the `---`. You can use standard Markdown (headings, lists, code blocks, tables).

### 2. **Blogs**
Blog posts are managed as **MDX files** in `src/content/posts/`.

**To add a new blog post:**
1.  Create a new file: `src/content/posts/my-new-post.mdx`.
2.  Add the frontmatter:
    ```yaml
    ---
    title: "The Future of AI"
    date: "2024-04-01"
    readTime: "5 min read"
    excerpt: "A short summary for the blog card."
    tags: ["AI", "Tech"]
    image: "/blog/ai-cover.jpg"
    ---
    ```
3.  Write your article using Markdown.

### 3. **Gallery**
Gallery images are stored in the `GALLERY_ITEMS` array in `src/lib/data.ts`.

**To add a new image:**
1.  Upload your image to `public/gallery/` (e.g., `public/gallery/sunset.jpg`).
2.  Open `src/lib/data.ts`.
3.  Add a new object to the `GALLERY_ITEMS` array:
    ```typescript
    {
        id: "unique-id",
        title: "Sunset",
        src: "/gallery/sunset.jpg",
        category: "Landscape", // Landscape, Urban, Nature, etc.
        location: "California, USA",
    },
    ```

### 4. **Timeline (Experience & Education)**
Timeline entries are managed in `src/lib/data.ts`.

**To add experience:**
-   Update the `EXPERIENCE` array.
-   **Fields**: `role`, `company`, `period`, `description`, `tags`, `logo` (path to image in public), `image` (feature image).

**To add education:**
-   Update the `EDUCATION` array.

### 5. **Volunteer Work**
Volunteer entries are in the `VOLUNTEERING` array in `src/lib/data.ts`.
-   Supports an optional `images` array for the modal gallery.

### 6. **Books (Reads)**
Book recommendations are in the `BOOKS` array in `src/lib/data.ts`.
-   You can customize the card color using Tailwind classes in the `color` field (e.g., `bg-blue-100 text-blue-700`).

---

## 🎨 styling & Theming

-   **Tailwind CSS**: The site uses Tailwind v4. Configuration is in `src/app/globals.css`.
-   **Colors**: The primary theme is **Slate & Indigo**.
    -   Dark Mode is the default.
    -   Colors are defined in CSS variables (`--background`, `--primary`, etc.) in `globals.css`.

## 🛠️ Development

**Run locally:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Deploy:**
The site is ready for deployment on Vercel or Netlify. Just connect your GitHub repository.

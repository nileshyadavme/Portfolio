# Portfolio Content Replacement Guide

This guide will walk you through replacing the placeholder text and images with your own content, page by page.

## 1. Global Settings & Metadata

**File:** `src/app/layout.tsx`
- **Line 19**: Change `title: "Nilesh🐉"` to your name/title.
- **Line 20**: Change `description` to your personal site description.

## 2. Navigation Bar

**File:** `src/components/layout/navbar.tsx`
- **Line 47**: Change `~/nilesh.` text logo to your name or handle.
- **Line 10-18**: Update `navItems` if you want to change the menu links.

## 3. Home Page Content (`/`)

### **Hero Section**
**File:** `src/components/home/hero.tsx`
- **Lines 26-27**: Replace `"Start with the logic..."` with your main headline.
- **Lines 31-32**: Replace `"I'm a software engineer..."` with your intro/bio.
- **Links**: Update `"View Projects"` (Line 37) and `"Contact Me"` (Line 43) links if needed.
- **Tech Stack Ticker**: Since `TechTicker` is used, go to `src/components/home/tech-ticker.tsx` to modify the `techs` array (Lines 25-94) if you want to change logos.

### **Projects Section**
The project data displayed here comes from `src/lib/data.ts`.
**File:** `src/lib/data.ts`
- **Lines 71-128**: Update the `PROJECTS` array. Replace titles, descriptions, tags, and links with your real projects.

### **Experience & Education (Timeline)**
The data comes from `src/lib/data.ts`.
**File:** `src/lib/data.ts`
- **Lines 192-227**: Update `EXPERIENCE` array with your work history.
- **Lines 229-240**: Update `EDUCATION` array with your degrees/certifications.

### **Latest Reads / Books**
**File:** `src/lib/data.ts`
- **Lines 352-401**: Update `BOOKS` array if you want to showcase different books.

### **Contact Section**
**File:** `src/components/home/contact.tsx`
- **Email Link**: Line 25, change `mailto:hello@example.com` to your email.
- **Social Links**: Update `SOCIAL_LINKS` in `src/lib/data.ts` (Lines 403-429).

## 4. About Page (`/about`)

**File:** `src/app/about/page.tsx`
- **Image**: Line 21, replace `[Add Your Image Here]` div with an `<Image />` component pointing to your photo (e.g., `/about/me.jpg`).
- **Bio Text**: Lines 36-44, replace the paragraphs with your full biography.
- **Tech Stack List**: Lines 49, update the array `["React", "Next.js", ...]` with your skills.
- **Achievements**: The data comes from `src/lib/data.ts` -> `ACHIEVEMENTS` array (Lines 20-69).

## 5. Projects Page (`/projects`)
This page automatically lists projects from:
1. **MDX Files**: `src/content/projects/*.mdx` (for detailed project case studies).
2. **Data File**: `src/lib/data.ts` (for simple project cards).

**To Add a Detailed Project Case Study:**
- Create a new file in `src/content/projects/my-project.mdx`.
- Follow the frontmatter format (title, description, tags, etc.) seen in existing `.mdx` files.

## 6. Images to Replace

You should place your actual images in the `public/` folder and update the paths in `src/lib/data.ts` or component files.

- **Hero Image**: `public/gallery/main.jpg` (Already set)
- **About Me Image**: Add to `public/about/` and update `src/app/about/page.tsx`.
- **Project Images**: Add to `public/projects/` and update `src/content/projects/*.mdx` or `src/lib/data.ts`.
- **Book Covers**: Add to `public/books/` and update `src/lib/data.ts` if creating new book entries.
- **Timeline Logos**: Add company logos to `public/logos/` and update `src/lib/data.ts`.

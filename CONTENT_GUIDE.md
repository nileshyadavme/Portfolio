# Portfolio Content Guide

This document lists all the files and specific lines where you need to replace placeholder text with your actual content.

## 1. Global Information
### `src/app/layout.tsx`
- **Metadata**: Update the `title` and `description` export.
- **Navbar/Footer**: Text links are in `src/components/layout/navbar.tsx` and `src/components/layout/footer.tsx`.

## 2. Home Page (`src/app/page.tsx`)

### Hero Section: `src/components/home/hero.tsx`
- **Heading**: Lines 25-27 ("Start with the logic...") -> Your personal tagline.
- **Subtext**: Lines 30-33 ("I'm a software engineer...") -> Your bio summary.
- **Image**: You already updated this to `/gallery/main.jpg`.
- **Buttons**: Update links if needed (currently `#projects` and `/contact`).

### Tech Ticker: `src/components/home/tech-ticker.tsx`
- **Tech Stack**: The `techs` array contains the logos. To change/add tech, update this array in the file.

### Projects Section: `src/components/home/projects.tsx`
- **Project Data**: The projects are likely hardcoded in `src/lib/data.ts` or directly in this file. Check for a `PROJECTS` array.
- **Content to Fill**: Title, Description, Tags, Links (Demo/Repo), Image paths.

### Timeline Section: `src/components/home/timeline.tsx`
- **Experience Data**: Check for `EXPERIENCE` array.
- **Education Data**: Check for `EDUCATION` array.
- **Content to Fill**: Role, Company, Period, Description.

### Reads Section: `src/components/home/reads.tsx`
- **Books/Articles**: Update the list of books or articles you want to feature.

### Contact Section: `src/components/home/contact.tsx`
- **Email/Socials**: Update your email address and social media links.

## 3. About Page (`src/app/about/page.tsx`)
- **Bio**: Replace the paragraphs in the text content section with your full biography.
- **Image**: The placeholder `[Add Your Image Here]` needs a real image path (use `next/image`).
- **Tech Stack**: Update the list of technologies in the `["React", ...]` array.
- **Achievements**: These are imported from `src/lib/data.ts` -> `ACHIEVEMENTS`. Update that file.

## 4. Projects Page (`src/app/projects/page.tsx`)
- *Note: Check if this page exists. If not, it might be using the same data as the home section or needs creation.*

## 5. Contact Page (`src/app/contact/page.tsx`)
- **Contact Form**: If there's a form, ensure it connects to a backend or service (like Formspree).
- **Contact Info**: Display your email, location, or other contact details.

## 6. Data File (`src/lib/data.ts`)
This is likely the central place for data.
- **Projects Array**: Add your real projects.
- **Achievements Array**: Add your real achievements.
- **Social Links**: Update generic URLs to your profiles.

---

**Action Plan:**
1. Open `src/lib/data.ts` and update all arrays there first.
2. Go through `hero.tsx` and `about/page.tsx` for static text updates.
3. Replace the placeholder image div in `about/page.tsx` with an `<Image />` component.

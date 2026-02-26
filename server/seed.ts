import { db } from "./db.js";
import { config } from "../src/data/config.js";
import { projects } from "../src/data/projects.js";
import { journalPosts } from "../src/data/journal.js";
import { experience } from "../src/data/experience.js";
import { timeline } from "../src/data/timeline.js";
import { photos } from "../src/data/photos.js";

console.log("Starting database seed...");

// --- Config ---
for (const [key, value] of Object.entries(config)) {
    db.prepare(
        "INSERT INTO config (id, value) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET value=excluded.value"
    ).run(key, JSON.stringify(value));
}
console.log("Seeded config.");

// --- Projects ---
db.prepare("DELETE FROM projects").run();
const insertProject = db.prepare(`
  INSERT INTO projects (id, title, shortDescription, description, image, category, technologies, date, demoUrl, githubUrl, featured)
  VALUES (@id, @title, @shortDescription, @longDescription, @image, @category, @techStack, @status, @demo, @github, @featured)
`);

for (const p of projects) {
    insertProject.run({
        ...p,
        techStack: JSON.stringify(p.techStack || []),
        featured: 0, // Migrating standard projects
    });
}
console.log("Seeded projects.");

// --- Journal Posts ---
db.prepare("DELETE FROM journal_posts").run();
const insertPost = db.prepare(`
  INSERT INTO journal_posts (id, title, date, category, tags, excerpt, content, readTime)
  VALUES (@id, @title, @date, @category, @tags, @excerpt, @content, @readTime)
`);

for (const p of journalPosts) {
    insertPost.run({
        ...p,
        tags: JSON.stringify(p.tags || []),
    });
}
console.log("Seeded journal_posts.");

// --- Experience ---
db.prepare("DELETE FROM experience").run();
const insertExp = db.prepare(`
  INSERT INTO experience (id, role, company, period, description, bullets)
  VALUES (@id, @role, @company, @period, @description, @bullets)
`);

for (const exp of experience) {
    insertExp.run({
        ...exp,
        bullets: JSON.stringify(exp.bullets || []),
    });
}
console.log("Seeded experience.");

// --- Timeline ---
db.prepare("DELETE FROM timeline").run();
const insertTime = db.prepare(`
  INSERT INTO timeline (year, title, description)
  VALUES (@year, @title, @description)
`);

for (const t of timeline) {
    insertTime.run(t);
}
console.log("Seeded timeline.");

// --- Photos ---
db.prepare("DELETE FROM photos").run();
const insertPhoto = db.prepare(`
  INSERT INTO photos (id, thumbnailUrl, fullUrl, caption, location, camera, film)
  VALUES (@id, @thumbnailUrl, @fullUrl, @caption, @location, @camera, @film)
`);

for (const p of photos) {
    insertPhoto.run({
        id: p.id,
        thumbnailUrl: p.url,
        fullUrl: p.url, // Using same for now
        caption: p.caption,
        location: p.category, // Mapping category to location as placeholder
        camera: p.camera,
        film: p.iso, // Mapping for now
    });
}
console.log("Seeded photos.");

console.log("Seeding complete!");

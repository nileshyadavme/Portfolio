import express from "express";
import { db } from "./db.js";

const app = express();
app.use(express.json());

// --- Config Endpoints ---
app.get("/api/config", (req, res) => {
    const rows = db.prepare("SELECT * FROM config").all() as { id: string; value: string }[];
    const configObj: Record<string, any> = {};
    for (const row of rows) {
        configObj[row.id] = JSON.parse(row.value);
    }
    res.json(configObj);
});

app.put("/api/config/:id", (req, res) => {
    const { id } = req.params;
    const value = JSON.stringify(req.body);

    const stmt = db.prepare("INSERT INTO config (id, value) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET value=excluded.value");
    stmt.run(id, value);
    res.json({ success: true });
});

// --- Journal Endpoints ---
app.get("/api/journal", (req, res) => {
    const posts = db.prepare("SELECT * FROM journal_posts ORDER BY date DESC").all() as any[];
    const formatted = posts.map(p => ({
        ...p,
        tags: JSON.parse(p.tags)
    }));
    res.json(formatted);
});

app.post("/api/journal", (req, res) => {
    const post = req.body;
    const stmt = db.prepare(`
    INSERT INTO journal_posts (id, title, date, category, tags, excerpt, content, readTime)
    VALUES (@id, @title, @date, @category, @tags, @excerpt, @content, @readTime)
  `);
    stmt.run({
        ...post,
        tags: JSON.stringify(post.tags || [])
    });
    res.json({ success: true });
});

app.put("/api/journal/:id", (req, res) => {
    const { id } = req.params;
    const post = req.body;
    const stmt = db.prepare(`
    UPDATE journal_posts SET
      title = @title, date = @date, category = @category, tags = @tags,
      excerpt = @excerpt, content = @content, readTime = @readTime
    WHERE id = @id
  `);
    stmt.run({ ...post, tags: JSON.stringify(post.tags || []), id });
    res.json({ success: true });
});

app.delete("/api/journal/:id", (req, res) => {
    db.prepare("DELETE FROM journal_posts WHERE id = ?").run(req.params.id);
    res.json({ success: true });
});

// --- Projects Endpoints ---
app.get("/api/projects", (req, res) => {
    const rows = db.prepare("SELECT * FROM projects").all() as any[];
    const formatted = rows.map(r => ({
        ...r,
        technologies: JSON.parse(r.technologies),
        featured: r.featured === 1
    }));
    res.json(formatted);
});

app.put("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    const p = req.body;
    const exists = db.prepare("SELECT id FROM projects WHERE id = ?").get(id);

    if (exists) {
        db.prepare(`
      UPDATE projects SET 
        title=@title, shortDescription=@shortDescription, description=@description,
        image=@image, category=@category, technologies=@technologies, date=@date,
        demoUrl=@demoUrl, githubUrl=@githubUrl, featured=@featured
      WHERE id=@id
    `).run({ ...p, technologies: JSON.stringify(p.technologies || []), featured: p.featured ? 1 : 0, id });
    } else {
        db.prepare(`
      INSERT INTO projects (id, title, shortDescription, description, image, category, technologies, date, demoUrl, githubUrl, featured)
      VALUES (@id, @title, @shortDescription, @description, @image, @category, @technologies, @date, @demoUrl, @githubUrl, @featured)
    `).run({ ...p, technologies: JSON.stringify(p.technologies || []), featured: p.featured ? 1 : 0, id });
    }
    res.json({ success: true });
});

app.delete("/api/projects/:id", (req, res) => {
    db.prepare("DELETE FROM projects WHERE id = ?").run(req.params.id);
    res.json({ success: true });
});

// --- Experience Endpoints ---
app.get("/api/experience", (req, res) => {
    const rows = db.prepare("SELECT * FROM experience").all() as any[];
    res.json(rows.map(r => ({ ...r, bullets: JSON.parse(r.bullets) })));
});

app.put("/api/experience/:id", (req, res) => {
    const { id } = req.params;
    const exp = req.body;
    const exists = db.prepare("SELECT id FROM experience WHERE id = ?").get(id);

    if (exists) {
        db.prepare(`UPDATE experience SET role=@role, company=@company, period=@period, description=@description, bullets=@bullets WHERE id=@id`).run({ ...exp, bullets: JSON.stringify(exp.bullets || []), id });
    } else {
        db.prepare(`INSERT INTO experience (id, role, company, period, description, bullets) VALUES (@id, @role, @company, @period, @description, @bullets)`).run({ ...exp, bullets: JSON.stringify(exp.bullets || []), id });
    }
    res.json({ success: true });
});

app.delete("/api/experience/:id", (req, res) => {
    db.prepare("DELETE FROM experience WHERE id = ?").run(req.params.id);
    res.json({ success: true });
});

// --- Timeline Endpoints ---
app.get("/api/timeline", (req, res) => {
    const rows = db.prepare("SELECT * FROM timeline ORDER BY year DESC").all();
    res.json(rows);
});

app.put("/api/timeline/:year", (req, res) => {
    const { year } = req.params;
    const t = req.body;
    db.prepare(`
    INSERT INTO timeline (year, title, description) VALUES (@year, @title, @description)
    ON CONFLICT(year) DO UPDATE SET title=excluded.title, description=excluded.description
  `).run({ ...t, year });
    res.json({ success: true });
});

app.delete("/api/timeline/:year", (req, res) => {
    db.prepare("DELETE FROM timeline WHERE year = ?").run(req.params.year);
    res.json({ success: true });
});

// --- Photos Endpoints ---
app.get("/api/photos", (req, res) => {
    const rows = db.prepare("SELECT * FROM photos").all();
    res.json(rows);
});

app.put("/api/photos/:id", (req, res) => {
    const { id } = req.params;
    const p = req.body;
    const exists = db.prepare("SELECT id FROM photos WHERE id = ?").get(id);

    if (exists) {
        db.prepare(`UPDATE photos SET thumbnailUrl=@thumbnailUrl, fullUrl=@fullUrl, caption=@caption, location=@location, camera=@camera, film=@film WHERE id=@id`).run({ ...p, id });
    } else {
        db.prepare(`INSERT INTO photos (id, thumbnailUrl, fullUrl, caption, location, camera, film) VALUES (@id, @thumbnailUrl, @fullUrl, @caption, @location, @camera, @film)`).run({ ...p, id });
    }
    res.json({ success: true });
});

app.delete("/api/photos/:id", (req, res) => {
    db.prepare("DELETE FROM photos WHERE id = ?").run(req.params.id);
    res.json({ success: true });
});

// Serve API on 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend API running on http://localhost:${PORT}`);
});

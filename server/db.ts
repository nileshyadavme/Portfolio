import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbDir = path.join(__dirname, "../data");
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new Database(path.join(dbDir, "portfolio.sqlite"));

// Enable foreign keys
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Initialize Schema
export function initDB() {
    db.exec(`
    CREATE TABLE IF NOT EXISTS config (
      id TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      shortDescription TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      category TEXT NOT NULL,
      technologies TEXT NOT NULL, -- JSON array
      date TEXT NOT NULL,
      demoUrl TEXT,
      githubUrl TEXT,
      featured INTEGER DEFAULT 0 -- 0 or 1
    );

    CREATE TABLE IF NOT EXISTS journal_posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      tags TEXT NOT NULL, -- JSON array
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      readTime INTEGER NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS experience (
      id TEXT PRIMARY KEY,
      role TEXT NOT NULL,
      company TEXT NOT NULL,
      period TEXT NOT NULL,
      description TEXT NOT NULL,
      bullets TEXT NOT NULL -- JSON array
    );

    CREATE TABLE IF NOT EXISTS timeline (
      year TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS photos (
      id TEXT PRIMARY KEY,
      thumbnailUrl TEXT NOT NULL,
      fullUrl TEXT NOT NULL,
      caption TEXT NOT NULL,
      location TEXT NOT NULL,
      camera TEXT,
      film TEXT
    );
  `);
}

initDB();

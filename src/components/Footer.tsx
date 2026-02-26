import { config } from "../data/config";
import { projects } from "../data/projects";
import { journalPosts } from "../data/journal";
import { books } from "../data/books";
import { photoFolders } from "../data/photos";

export function Footer() {
  const totalPhotos = photoFolders.reduce((acc, folder) => acc + folder.photos.length, 0);

  return (
    <footer className="mt-auto py-12 border-t border-[var(--color-gold)]/20 text-center text-sm text-[var(--color-text)]/60 dark:text-[var(--color-dark-text)]/60">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 font-handwriting text-lg opacity-80">
          <span>{projects.length} Projects</span>
          <span>•</span>
          <span>{journalPosts.length} Entries</span>
          <span>•</span>
          <span>{books.length} Books</span>
          <span>•</span>
          <span>{totalPhotos} Photos</span>
        </div>
        <div className="flex items-center gap-4">
          {Object.entries(config.socials).map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-accent)] transition-colors capitalize font-medium"
            >
              {name}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-8 opacity-50 font-code text-xs">
        &copy; {new Date().getFullYear()} {config.name}. Crafted with care.
      </div>
    </footer>
  );
}

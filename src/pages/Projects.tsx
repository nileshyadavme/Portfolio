import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { projects } from "../data/projects";
import { Link } from "react-router-dom";
import { Squiggle } from "../components/Squiggle";
import { Polaroid } from "../components/Polaroid";
import { ExternalLink, Github, Image as ImageIcon, ArrowLeft, FileText } from "lucide-react";
import { ProjectGallery } from "../components/ProjectGallery";
import { FolderCard } from "../components/FolderCard";

export function Projects() {
  const [filter, setFilter] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.techStack))
  ).sort();

  const filteredProjects = filter
    ? projects.filter((p) => p.techStack.includes(filter))
    : projects;

  const isFolderView = filter === null;

  // Generate folder data from tags
  const folders = allTags.map(tag => {
    const projectCount = projects.filter(p => p.techStack.includes(tag)).length;
    return {
      id: tag,
      title: `#${tag}`,
      coverUrl: `https://picsum.photos/seed/${tag}/600/400`,
      count: projectCount,
      category: 'Tag',
      date: 'Various'
    };
  });

  return (
    <div className="space-y-16">
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
            Projects
          </h1>
          <p className="font-handwriting text-3xl text-[var(--color-secondary)] mb-8">
            Things I've built, broken, and fixed
          </p>
          <p className="font-body text-xl text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80 leading-relaxed">
            A collection of my work spanning software, hardware, and the messy
            space in between.
          </p>
        </motion.div>
      </section>

      <Squiggle className="text-[var(--color-gold)]" />

      <section>
        {/* View Transition Area */}
        <AnimatePresence mode="popLayout">
          {isFolderView ? (
            // FOLDER GRID VIEW
            <motion.div
              key="folder-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-6xl"
            >
              {folders.map((folder, index) => (
                <motion.div
                  key={folder.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    opacity: { duration: 0.3, delay: index * 0.1 },
                    scale: { duration: 0.3, delay: index * 0.1 },
                    y: { duration: 0.3, delay: index * 0.1 }
                  }}
                >
                  <FolderCard
                    title={folder.title}
                    coverUrl={folder.coverUrl}
                    count={folder.count}
                    category={folder.category}
                    date={folder.date}
                    onClick={() => setFilter(folder.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // LIST VIEW
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-24"
            >
              {/* Header for List View */}
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => setFilter(null)}
                  className="p-2 rounded-full hover:bg-[var(--color-gold)]/10 text-[var(--color-text)]/60 hover:text-[var(--color-accent)] transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h3 className="text-2xl font-display font-bold">
                  Projects using <span className="text-[var(--color-accent)]">#{filter}</span>
                </h3>
              </div>

              <div className="space-y-24">
                {filteredProjects.map((project, index) => (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, type: "spring" }}
                    className="grid md:grid-cols-2 gap-12 items-center"
                  >
                    <div
                      className={`order-2 ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}
                    >
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h2 className="font-display text-3xl md:text-4xl font-bold">
                          {project.title}
                        </h2>
                        <span className="shrink-0 px-3 py-1 text-xs font-code bg-[var(--color-gold)]/20 text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70 rounded-full">
                          {project.status}
                        </span>
                      </div>

                      <p className="font-body text-lg text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80 leading-relaxed mb-6">
                        {project.longDescription}
                      </p>

                      <div className="mb-8">
                        <h3 className="font-handwriting text-xl text-[var(--color-secondary)] mb-2">
                          Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <button
                              key={tech}
                              onClick={() => setFilter(tech)}
                              className="font-code text-sm px-2 py-1 border border-[var(--color-gold)]/30 rounded-sm hover:bg-[var(--color-gold)]/20 transition-colors"
                            >
                              {tech}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-6">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 font-display text-lg hover:text-[var(--color-accent)] transition-colors"
                          >
                            <Github className="w-5 h-5" /> Source
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 font-display text-lg hover:text-[var(--color-accent)] transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" /> Live Demo
                          </a>
                        )}
                        <Link
                          to={`/projects/${project.id}`}
                          className="flex items-center gap-2 font-display text-lg hover:text-[var(--color-accent)] transition-colors text-[var(--color-accent)]/80"
                        >
                          <FileText className="w-5 h-5" /> Case Study
                        </Link>
                      </div>
                    </div>

                    <div
                      className={`order-1 ${index % 2 === 0 ? "md:order-2" : "md:order-1"} flex justify-center relative group`}
                    >
                      <div className="relative">
                        <Polaroid
                          src={project.image}
                          caption={project.title}
                          rotation={index % 2 === 0 ? 2 : -2}
                          className="w-full max-w-md transition-all duration-300 group-hover:blur-[2px]"
                          onClick={() => setSelectedProject(project)}
                        />
                        <div
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer pointer-events-none"
                        >
                          <div className="bg-[var(--color-accent)] text-[var(--color-cream)] px-4 py-2 rounded-full font-code text-sm shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <ImageIcon className="w-4 h-4" />
                            View Gallery
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Project Gallery Modal */}
      {selectedProject && (
        <ProjectGallery
          isOpen={!!selectedProject}
          title={selectedProject.title}
          images={selectedProject.gallery || [selectedProject.image]}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { projects } from "../data/projects";
import { Squiggle } from "../components/Squiggle";
import { Polaroid } from "../components/Polaroid";
import { ExternalLink, Github, Image as ImageIcon } from "lucide-react";
import { ProjectGallery } from "../components/ProjectGallery";

export function Projects() {
  const [filter, setFilter] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const categories = Array.from(new Set(projects.map((p) => p.category)));

  const filteredProjects = filter
    ? projects.filter((p) => p.category === filter)
    : projects;

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
        <div className="flex flex-wrap gap-4 mb-12">
          <button
            onClick={() => setFilter(null)}
            className={`px-4 py-2 font-code text-sm rounded-full transition-colors ${filter === null
              ? "bg-[var(--color-accent)] text-[var(--color-cream)]"
              : "bg-[var(--color-gold)]/20 text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70 hover:bg-[var(--color-gold)]/40"
              }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 font-code text-sm rounded-full transition-colors ${filter === cat
                ? "bg-[var(--color-accent)] text-[var(--color-cream)]"
                : "bg-[var(--color-gold)]/20 text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70 hover:bg-[var(--color-gold)]/40"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="space-y-24">
          <AnimatePresence mode="popLayout">
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
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="font-display text-3xl md:text-4xl font-bold">
                      {project.title}
                    </h2>
                    <span className="px-3 py-1 text-xs font-code bg-[var(--color-gold)]/20 text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70 rounded-full">
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
                        <span
                          key={tech}
                          className="font-code text-sm px-2 py-1 border border-[var(--color-gold)]/30 rounded-sm"
                        >
                          {tech}
                        </span>
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
          </AnimatePresence>
        </motion.div>
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

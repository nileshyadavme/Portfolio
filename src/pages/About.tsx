import { motion } from "motion/react";
import { useData } from "../context/DataContext";
import { skills } from "../data/experience"; // Can keep skills static for now or add them to DB if needed
import { Squiggle } from "../components/Squiggle";
import { Polaroid } from "../components/Polaroid";

export function About() {
  const { config, experience, timeline } = useData();

  return (
    <div className="space-y-24">
      {/* Header */}
      <section className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center lg:items-start justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl flex-1"
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
            About Me
          </h1>
          <p className="font-handwriting text-3xl text-[var(--color-secondary)] mb-12">
            A brief history of a tinkerer
          </p>

          <div className="flex lg:hidden justify-center mb-12">
            <Polaroid
              src="https://picsum.photos/seed/portrait/400/500"
              caption="Me, probably thinking about coffee"
              rotation={4}
              className="w-64 md:w-72"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert font-body text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80 leading-relaxed max-w-none">
            <p className="mb-6">
              I'm {config.name}, a {config.role.toLowerCase()} based somewhere
              between the digital and physical worlds. My journey didn't start
              with a computer science degree, but rather with a screwdriver and
              a broken radio. I've always been fascinated by how things work,
              taking them apart to understand the hidden mechanisms inside.
            </p>
            <p className="mb-6">
              That curiosity eventually led me to code. I discovered that
              software is just another medium for building, one where the raw
              materials are logic and imagination instead of wood and metal.
              Today, I try to bring the care and craftsmanship of physical
              making into the digital products I build.
            </p>
            <p>
              When I'm not writing code, you can usually find me in my workshop
              covered in sawdust, reading a book about design, or trying to fix
              that radio I broke years ago.
            </p>
          </div>
        </motion.div>

        <div className="hidden lg:block flex-shrink-0 mt-8 lg:mt-0">
          <Polaroid
            src="https://picsum.photos/seed/portrait/400/500"
            caption="Me, probably thinking about coffee"
            rotation={4}
            className="w-64 lg:w-72 xl:w-80"
          />
        </div>
      </section>

      <Squiggle className="text-[var(--color-gold)]" />

      {/* Skills & Tools */}
      <section>
        <h2 className="font-display text-4xl font-bold mb-12">
          Tools of the Trade
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-handwriting text-2xl text-[var(--color-accent)] mb-6">
              Digital
            </h3>
            <ul className="space-y-4 font-code text-sm">
              {skills
                .filter((s) => s.category !== "Physical")
                .map((skill) => (
                  <li key={skill.name} className="flex items-center gap-4">
                    <span className="w-24 font-bold">{skill.name}</span>
                    <div className="flex-1 h-2 bg-[var(--color-gold)]/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-[var(--color-accent)]"
                      />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h3 className="font-handwriting text-2xl text-[var(--color-secondary)] mb-6">
              Analog
            </h3>
            <ul className="space-y-4 font-code text-sm">
              {skills
                .filter((s) => s.category === "Physical")
                .map((skill) => (
                  <li key={skill.name} className="flex items-center gap-4">
                    <span className="w-24 font-bold">{skill.name}</span>
                    <div className="flex-1 h-2 bg-[var(--color-gold)]/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-[var(--color-secondary)]"
                      />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      <Squiggle className="text-[var(--color-secondary)]" />

      {/* Experience */}
      <section>
        <h2 className="font-display text-4xl font-bold mb-12">Experience</h2>
        <div className="space-y-12">
          {experience.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-4 md:gap-8 items-baseline">
                <div className="mb-4 md:mb-0 md:text-right font-code text-sm text-[var(--color-text)]/60 dark:text-[var(--color-dark-text)]/60">
                  {job.period}
                </div>
                <div className="md:col-span-3 pb-8 border-b border-[var(--color-gold)]/20 last:border-0">
                  <h3 className="font-display text-2xl font-bold mb-1">
                    {job.role}
                  </h3>
                  <div className="font-handwriting text-xl text-[var(--color-accent)] mb-4">
                    {job.company}
                  </div>
                  <p className="font-body text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80 mb-4 leading-relaxed">
                    {job.description}
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-body text-[var(--color-text)]/70 dark:text-[var(--color-dark-text)]/70">
                    {job.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Squiggle className="text-[var(--color-gold)]" />

      {/* Timeline */}
      <section>
        <h2 className="font-display text-4xl font-bold mb-12">Timeline</h2>
        <div className="relative border-l-2 border-[var(--color-gold)]/30 ml-4 md:ml-8 space-y-12 pb-8">
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8"
            >
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[var(--color-bg)] dark:bg-[var(--color-dark-bg)] border-2 border-[var(--color-accent)]" />
              <div className="font-code text-sm text-[var(--color-accent)] mb-2">
                {item.year}
              </div>
              <h3 className="font-display text-xl font-bold mb-2">
                {item.title}
              </h3>
              <p className="font-body text-[var(--color-text)]/80 dark:text-[var(--color-dark-text)]/80 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

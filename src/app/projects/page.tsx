import { ProjectList } from "@/components/projects/project-list";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Projects | Nilesh's Portfolio",
    description: "A showcase of my software engineering projects.",
};

export default async function ProjectsPage() {
    const projects = await getAllFilesFrontMatter("projects");

    // Map MDX frontmatter to Project interface expected by ProjectCard
    const formattedProjects = projects.map((project) => ({
        id: project.slug,
        title: project.frontmatter.title,
        description: project.frontmatter.description,
        tags: project.frontmatter.tags,
        link: `/projects/${project.slug}`, // Link to internal MDX page
        github: project.frontmatter.github,
        image: project.frontmatter.image,
    }));

    return (
        <div className="min-h-screen py-24 md:py-32">
            <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="mb-12 space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Projects</h1>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        A collection of my work in software engineering, from distributed systems to AI applications.
                    </p>
                </div>

                <div className="mt-8">
                    <Suspense fallback={<div>Loading projects...</div>}>
                        <ProjectList initialProjects={formattedProjects} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

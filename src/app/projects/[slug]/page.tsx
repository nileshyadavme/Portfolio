import { getAllFilesFrontMatter, getFileBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export async function generateStaticParams() {
    const projects = await getAllFilesFrontMatter("projects");
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    try {
        const project = await getFileBySlug("projects", slug);
        return {
            title: `${project.frontmatter.title} | Nilesh's Portfolio`,
            description: project.frontmatter.description,
        };
    } catch {
        return {
            title: "Project Not Found",
        };
    }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let project;

    try {
        project = await getFileBySlug("projects", slug);
    } catch {
        notFound();
    }

    return (
        <article className="container mx-auto max-w-3xl px-4 py-24 md:py-32">
            <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
            </Link>

            <header className="mb-12 space-y-6">
                <div className="flex flex-wrap gap-2">
                    {project.frontmatter.tags.map((tag: string) => (
                        <Link
                            key={tag}
                            href={`/projects?tag=${encodeURIComponent(tag)}`}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                        >
                            {tag}
                        </Link>
                    ))}
                </div>

                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                    {project.frontmatter.title}
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed">
                    {project.frontmatter.description}
                </p>

                <div className="flex gap-4 pt-4">
                    {project.frontmatter.github && (
                        <a
                            href={project.frontmatter.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium"
                        >
                            <Github className="w-4 h-4" />
                            View Source
                        </a>
                    )}
                    {project.frontmatter.link && (
                        <a
                            href={project.frontmatter.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                        </a>
                    )}
                </div>
            </header>

            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl">
                <MDXRemote
                    source={project.content}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                            rehypePlugins: [
                                rehypeSlug,
                                [rehypeAutolinkHeadings, { behavior: "wrap" }],
                                [rehypePrettyCode, {
                                    theme: "github-dark",
                                    keepBackground: true,
                                }]
                            ]
                        }
                    }}
                />
            </div>
        </article>
    );
}

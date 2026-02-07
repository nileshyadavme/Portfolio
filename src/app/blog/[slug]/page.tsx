import { getAllFilesFrontMatter, getFileBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export async function generateStaticParams() {
    const posts = await getAllFilesFrontMatter("posts");
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getFileBySlug("posts", slug);
    if (!post) return {};

    return {
        title: `${post.frontmatter.title} | Nilesh's Blog`,
        description: post.frontmatter.excerpt,
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getFileBySlug("posts", slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="container mx-auto max-w-3xl px-4 py-24 md:py-32">
            <Link
                href="/blog"
                className="group mb-8 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Blog
            </Link>

            <header className="mb-12 space-y-6">
                <div className="flex flex-wrap gap-2">
                    {post.frontmatter.tags.map((tag: string) => (
                        <Link
                            key={tag}
                            href={`/blog?tag=${encodeURIComponent(tag)}`}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                        >
                            {tag}
                        </Link>
                    ))}
                </div>

                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{post.frontmatter.title}</h1>

                <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{post.frontmatter.readTime}</span>
                    </div>
                </div>
            </header>

            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl">
                <MDXRemote
                    source={post.content}
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

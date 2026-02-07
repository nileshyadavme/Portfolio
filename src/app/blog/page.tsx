import { BlogList } from "@/components/blog/blog-list";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Blog | Nilesh's Portfolio",
    description: "Thoughts on software engineering, architecture, and the future of tech.",
};

export default async function BlogPage() {
    const posts = await getAllFilesFrontMatter("posts");

    // Map MDX frontmatter to BlogPost interface
    const formattedPosts = posts.map((post) => ({
        id: post.slug,
        title: post.frontmatter.title,
        excerpt: post.frontmatter.excerpt || "", // Ensure excerpt fallback
        date: post.frontmatter.date,
        readTime: post.frontmatter.readTime || "5 min read", // Fallback readTime
        tags: post.frontmatter.tags,
        slug: post.slug,
        image: post.frontmatter.image,
    }));

    // Sort posts by date (newest first)
    formattedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="min-h-screen py-24 md:py-32">
            <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="mb-16 text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Writing</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Thoughts on software engineering, architecture, and the future of tech.
                    </p>
                </div>

                <Suspense fallback={<div>Loading posts...</div>}>
                    <BlogList initialPosts={formattedPosts} />
                </Suspense>
            </div>
        </div>
    );
}

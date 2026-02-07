import { getFileBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import PrintButton from "@/components/resume/print-button";

export const metadata: Metadata = {
    title: "Resume | Nilesh",
    description: "My professional resume.",
};

export default async function ResumePage() {
    const resume = await getFileBySlug("resume", "main");

    return (
        <div className="container mx-auto max-w-4xl px-4 py-24 md:py-32 print:py-0 print:max-w-none print:px-0">
            {/* Print Button - Hidden in Print Mode */}
            <div className="mb-8 flex justify-end">
                <PrintButton />
            </div>

            <article className="prose prose-slate dark:prose-invert max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight 
                prose-h1:text-4xl prose-h1:mb-2 prose-h1:text-center
                prose-h2:border-b prose-h2:border-border prose-h2:pb-2 prose-h2:mt-8 prose-h2:mb-4
                prose-p:leading-relaxed prose-li:marker:text-primary
                print:prose-neutral print:max-w-none
            ">
                <MDXRemote
                    source={resume.content}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                            rehypePlugins: [
                                [rehypePrettyCode, {
                                    theme: "github-dark",
                                    keepBackground: false,
                                }]
                            ]
                        }
                    }}
                />
            </article>
        </div>
    );
}

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

            {/* Resume Content with Modal/Document Styling */}
            <div className="mx-auto max-w-[210mm] bg-white p-8 md:p-12 shadow-lg rounded-lg print:max-w-none print:p-0 print:shadow-none print:rounded-none dark:bg-[#1a1a1a]">
                <article className="prose prose-slate dark:prose-invert max-w-none 
                    prose-headings:font-bold prose-headings:tracking-tight 
                    prose-h1:text-4xl prose-h1:mb-2 prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-8 dark:prose-h1:border-gray-800
                    prose-h2:text-xl prose-h2:uppercase prose-h2:tracking-wider prose-h2:mb-4 prose-h2:mt-8
                    prose-h3:font-bold prose-h3:mb-1
                    prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300
                    prose-li:marker:text-primary prose-li:text-sm
                    prose-a:text-gray-600 prose-a:no-underline hover:prose-a:text-gray-900 dark:prose-a:text-gray-400 dark:hover:prose-a:text-white
                    prose-strong:font-medium prose-strong:text-gray-900 dark:prose-strong:text-white
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
        </div>
    );
}

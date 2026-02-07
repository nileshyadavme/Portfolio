import fs from "fs";
import path from "path";
import matter from "gray-matter";

const root = process.cwd();

export type MdxType = "posts" | "projects" | "resume";

export interface MdxFrontmatter {
    title: string;
    description: string;
    date: string;
    tags: string[];
    [key: string]: any;
}

export interface MdxFile {
    slug: string;
    frontmatter: MdxFrontmatter;
    content: string;
    source: any;
}

export async function getFiles(type: MdxType) {
    return fs.readdirSync(path.join(root, "src", "content", type));
}

export async function getFileBySlug(type: MdxType, slug: string): Promise<MdxFile> {
    const source = slug
        ? fs.readFileSync(path.join(root, "src", "content", type, `${slug}.mdx`), "utf8")
        : fs.readFileSync(path.join(root, "src", "content", type, `index.mdx`), "utf8");

    const { data, content } = matter(source);

    return {
        slug,
        frontmatter: data as MdxFrontmatter,
        content,
        source: null, // We don't need serialized source for RSC
    };
}

export async function getAllFilesFrontMatter(type: MdxType): Promise<MdxFile[]> {
    const files = fs.readdirSync(path.join(root, "src", "content", type));

    return files.reduce((allPosts: MdxFile[], postSlug: string) => {
        const source = fs.readFileSync(
            path.join(root, "src", "content", type, postSlug),
            "utf8"
        );
        const { data } = matter(source);

        return [
            {
                slug: postSlug.replace(".mdx", ""),
                frontmatter: data as MdxFrontmatter,
                content: "", // We don't need content for listing
                source: null,
            },
            ...allPosts,
        ];
    }, []);
}

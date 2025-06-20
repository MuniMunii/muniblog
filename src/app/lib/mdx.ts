import fs from "fs";
import path from "path";
import matter from "gray-matter";
export async function getPost(slug: string):Promise<{content:string,frontmatter:contentProps}> {
  const filePath = path.join(process.cwd(), "src/app/lib", `${slug}.mdx`);
  const file = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(file);
  return { content, frontmatter: data as contentProps };
}
export function getAllPost():contentProps[] {
  const contentDir = path.join(process.cwd(), "src/app/lib");
  const files = fs.readdirSync(contentDir);
  return files
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => {
      const filePath = path.join(contentDir, filename);
      const rawContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(rawContent);
      return {...(data as contentProps),slug:filename.replace('.mdx','')}
    });
}

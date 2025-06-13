import fs from "fs";
import path from "path";
import matter from "gray-matter";
export async function getPost(slug: string) {
  const filePath = path.join(process.cwd(), "src/app/lib", `${slug}.mdx`);
  const file = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(file);
  return { content, frontmatter: data };
}
export function getAllPost() {
  const contentDir = path.join(process.cwd(), "src/app/lib");
  console.log(contentDir)
  const files = fs.readdirSync(contentDir);
  return files
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => {
      const filePath = path.join(contentDir, filename);
      const rawContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(rawContent);
      return {...data,slug:filename.replace('.mdx','')}
    });
}

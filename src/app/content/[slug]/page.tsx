"use server";
import { ContentData } from "@/app/contentData";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import fs from "fs";
import './content.css'
export async function generateStaticParam() {
  return ContentData.map((content) => ({
    slug: content.slug,
  }));
}
export default async function ContentPage({
  params,
}: {
  params: { slug: string };
}) {
  const filePath = path.join(
    process.cwd(),
    "src/app/lib",
    `${params.slug}.mdx`
  );
  if (!fs.existsSync(filePath)) return notFound();
  const source = fs.readFileSync(filePath, "utf8");
  const { content, frontmatter } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          [
            (await import("rehype-pretty-code")).default,
            { theme: "kanagawa-wave" }
          ],
        ],
      },
    },
  });
  return <main className="content-blog leading-8 max-w-[800px] w-full p-4 mt-12 mx-auto"><section>{content}</section></main>;
}

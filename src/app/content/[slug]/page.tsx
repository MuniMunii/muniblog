// "use server";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import fs from "fs";
import "./content.css";
import dynamic from "next/dynamic";
import { getPost } from "@/app/lib/mdx";
import { Metadata } from "next";
import {use}from "react"
const Video=dynamic(()=>import('@/app/content/[slug]/media').then((m)=>m.Video),{ssr:true})
const OptimizedImage=dynamic(()=>import('@/app/content/[slug]/media').then((m)=>m.OptimizedImage),{ssr:true})

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const slug=use(params).slug
  const post =await getPost(slug)
  return {
    title:post?.frontmatter.title ?? "MuniBlog",
    description:post.frontmatter.metaTag
  }
}
export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug=use(params).slug
  const filePath = path.join(
    process.cwd(),
    "src/app/lib",
    `${slug}.mdx`
  );
  if (!fs.existsSync(filePath)) return notFound();
  const source = fs.readFileSync(filePath, "utf8");
  const { content, frontmatter } = await compileMDX<contentProps>({
    source,
    components:{
      Video,OptimizedImage
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          [
            (await import("rehype-pretty-code")).default,
            { theme: "kanagawa-wave" },
          ],
        ],
      },
    },
  });
  return (
    <main className="content-blog leading-8 max-w-[800px] w-full mt-4 mx-auto">
      <section>
        <h1 className="text-4xl text-center">{frontmatter.title}</h1>
        <OptimizedImage alt={frontmatter.thumbnail_alt} src={frontmatter.thumbnail} height={300} width={600} priority quality={100} className="rounded-md mx-auto my-3"/>
        {content}
      </section>
    </main>
  );
}

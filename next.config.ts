import type { NextConfig } from "next";
import withMDX from '@next/mdx';
import rehypePrettyCode from "rehype-pretty-code";
/** @type {import('next').NextConfig} */
const mdxConfig=withMDX({
  extension:/\.mdx?$/,
  options:{
    remarkPlugins:[],
    rehypePlugins:[
      [
        rehypePrettyCode,
        {theme:'kanagawa-wave'}
      ]
    ]
  }
})
const nextConfig: NextConfig = {
  /* config options here */ 
  pageExtensions:['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
};
export default mdxConfig(nextConfig)
// export default nextConfig;

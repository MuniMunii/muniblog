'use client';
import Giscus from "@giscus/react";
export default function GiscusComp(){
return <Giscus
  id="comments"
  repo="MuniMunii/muniblog"
  repoId="R_kgDOO3wdqg"
  category="comments"
  categoryId="DIC_kwDOO3wdqs4CrnNr"
  mapping="pathname"
  theme="dark_tritanopia"
  reactionsEnabled="1"
  emitMetadata="0"
  inputPosition="bottom"
  loading="lazy"
/>
}
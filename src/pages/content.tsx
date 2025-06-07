import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { contentData } from "../contentData";
import { Helmet } from "react-helmet";
export default function ContentPage() {
  const contentParam = useParams<{ title: string }>();
  const contentTitle = contentParam.title?.replace(/-/g, " ") || "";
  const findContent = contentData.find(
    (content) => content.title.toLowerCase() === contentTitle.toLowerCase()
  );
//   const metaContent = findContent?.metaTag || [];
//   const metaList= metaContent.map((meta, i) => {
//           return <meta name="description" content={meta} key={`${meta}${i}`} />;
//         })
  useEffect(() => {
    console.log(contentParam, contentTitle, findContent);
  }, []);
  useEffect(() => {
  const meta = document.querySelector('meta[name="description"]');
  console.log("Meta tag content:", meta?.getAttribute('content'));
}, [findContent]);
  return (
    <>
      <Helmet>
        <meta name="description" content={findContent?.metaTag||''} />
         {/* <meta name="description" content="This is a test description." /> */}
        <title>{findContent?.title}</title>
      </Helmet>
      {findContent?.content}
    </>
  );
}

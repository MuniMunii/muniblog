import { useEffect } from "react";
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
    console.log("Meta tag content:", meta?.getAttribute("content"));
  }, [findContent]);
  return (
    <>
      <Helmet>
        <meta name="description" content={findContent?.metaTag || ""} />
        {/* <meta name="description" content="This is a test description." /> */}
        <title>{findContent?.title}</title>
      </Helmet>
      <main className="size-full min-h-screen pt-14 text-center text-white">
        <article>
          <header>
            <h1 className="text-5xl mb-2">{findContent?.title}</h1>
            <div className="mx-auto max-w-[550px] w-[95%] flex justify-between items-center mb-2">
              <p>Author: Ramzi Akbar Ramadhan</p>
              <p>Time Read: 4 Min</p>
            </div>
            <figure>
              {/* change to image if already done */}
              <figcaption className="max-w-[550px] w-[95%] h-80 bg-black border border-white mx-auto rounded-md">
                Fake Image
              </figcaption>
            </figure>
          </header>
          <section className="text-left text-base/loose mt-4 max-w-[800px] mx-auto ">
            {findContent?.content}
          </section>
        </article>
      </main>
    </>
  );
}

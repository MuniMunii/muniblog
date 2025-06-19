
import { getAllPost } from "./lib/mdx";
import ListContent from "./component/ListContent";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home | MuniBlog",
  description: "Learn more about frontend, Here in Muniblog we can share experience",
};
export default function Home() {
  const getContent=getAllPost()
    return (
      <>
        <div className="size-full min-h-screen flex flex-col items-center mt-3 gap-4">
          <div className="max-w-[800px] mx-auto w-[90%]">
            <h2 className="text-4xl border-b-4 border-b-blue-600 w-fit">Content</h2>
            <br/>
            <p className="leading-8 text-neutral-300">Collection of my blog. I will write blog mostly tech/experiences stories in Indonesian or in English depends on the content/theme that i wanna write</p>
            <br/>
            <ListContent content={getContent}/>
            </div>
        </div>
      </>
    );
}

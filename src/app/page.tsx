
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
          <div className="max-w-[800px] mx-auto w-[90%]"><ListContent content={getContent}/></div>
        </div>
      </>
    );
}

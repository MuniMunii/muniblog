
import { getAllPost } from "./lib/mdx";
import ListContent from "./component/ListContent";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home | MuniBlog",
  description: "Learn more about frontend, Here in Muniblog we can share experience",
  icons:{
    icon: "/iconMuni.svg",
  },
};
export default function Home() {
  const getContent=getAllPost()
    return (
      <>
        <div className="size-full min-h-screen flex flex-col items-center mt-3 gap-4">
          <div><ListContent content={getContent}/></div>
        </div>
      </>
    );
}

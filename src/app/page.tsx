
import { getAllPost, getPost } from "./lib/mdx";
import ListContent from "./component/ListContent";
import Navbar from "./component/navbar";
export default function Home() {
  const getContent=getAllPost()
    return (
      <>
        <div className="size-full min-h-screen flex flex-col items-center pt-12 gap-4">
          <div><ListContent content={getContent}/></div>
        </div>
      </>
    );
}

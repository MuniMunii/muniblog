import { contentData } from "../contentData";
import {motion} from "framer-motion";
export default function IndexPage() {
  const listContent = contentData.map((content) => {
    const changeParamTitle = content.title
      .replace(/\s+/g, "-")
      .toLocaleLowerCase();
    return (
      <motion.div initial={{background:"linear-gradient(135deg,#fb2c36,#f6339a)",transition:{duration:1}}} whileHover={{background:"linear-gradient(315deg,#fb2c36,#f6339a)",transition:{duration:1}}} className=" w-full h-40 text-white p-1">
        <div className="bg-black size-full p-3">
          <a href={`content/${changeParamTitle}`}>{content.title}</a>
        </div>
      </motion.div>
    );
  });
  return (
    <>
      <div className="size-full min-h-screen flex flex-col items-center pt-12 gap-4">
        {listContent}
      </div>
    </>
  );
}

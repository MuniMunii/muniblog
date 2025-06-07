import { contentData } from "../contentData";

export default function IndexPage() {
  const listContent = contentData.map((content) => {
    const changeParamTitle = content.title
      .replace(/\s+/g, "-")
      .toLocaleLowerCase();
    return <a href={`content/${changeParamTitle}`}>{content.title}</a>;
  });
  return <>{listContent}</>;
}

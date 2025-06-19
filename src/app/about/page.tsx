import { Metadata } from "next";
import '../content/[slug]/content.css'
import AboutContent from "./content";
export const metadata: Metadata = {
  title: "About | MuniBlog",
  description:
    "Learn more about MuniBlog and me Ramzi the owner and the author of this blog",
};
export default function AboutPage() {

  return (
    <AboutContent/>
  );
}

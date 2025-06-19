"use client";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { OptimizedImage } from "../lib/media";
import { motion } from "framer-motion";
export default function AboutContent() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function BorderSpan({ text }: { text: string }) {
    return <span className="border-b-2 border-b-blue-600">{text}</span>;
  }
  return (
    <div className="size-full min-h-screen flex flex-col items-center mt-3 gap-4 content-blog">
      <div className="max-w-[800px] mx-auto w-[90%] mt-9 break-words whitespace-pre-wrap text-base leading-8">
        <h1 className="text-4xl border-b-4 border-b-blue-600 w-fit">
          About Me
        </h1>
        <br />
        <p>
          Hi, I am Muni A.k.a Ramzi (My real name by the way). I'm just a guy
          who loves building stuff for the web, enjoys learning new things, and
          spends way too much time listening to Music while coding at night.
        </p>
        <br />
        <p>
          I started coding back in late 2021, just as a hobby. But as time
          passed, it became something I really wanted to pursue seriously. So
          thats why i take <BorderSpan text="System Informations" /> degree as
          my college degree at Bina Sarana Informatika. Now i am currently in my 3rd
          years of college. My first language i learn was{" "}
          <BorderSpan text="C" /> but once I discovered <BorderSpan text="HTML"/>, <BorderSpan text="CSS"/>, and <BorderSpan text="JavaScript"/>, I totally fell in love with building websites.
           In 2023 i was focusing making
          projects as part of my learning, and i made plenty of personal project
          to this day like this blog website. And in 2025 i got Internship in
          journalism based corp for 5 months as{" "}
          <BorderSpan text="Fullstack Developer" />.
        </p>
        <br />
        <p>
          I enjoy using <BorderSpan text="React" />,{" "}
          <BorderSpan text="Javascript" /> ,<BorderSpan text="Tailwind.css" />,{" "}
          <BorderSpan text="mySQL" />, <BorderSpan text="Node.js" /> and{" "}
          <BorderSpan text="Typescript" /> as my main tools. I love learning new
          things like a while ago i started learning about{" "}
          <BorderSpan text="Framer-Motions/Motion" /> for animations, and{" "}
          <BorderSpan text="Next.js" /> like this website i build with.
        </p>
        <br />
        <p>
          I spent my freetime learning new thing, listening to music, watching
          some animes, and i enjoy spent my free time alone or with family and
          friend. I also love playing game especially rhythm game like Project
          Diva/Project Sekai and more, and i am currently learning japanese
          language for fill my empty time.{" "}
          <a
            target="_blank"
            className="border-b border-pink-400"
            href="https://muniporto.my.id"
          >
            Here
          </a>{" "}
          if you want to know more about me profesionally.
        </p>
        <h2>Hobby</h2>
        <br />
        <p>
          Like i mention before what do i spent in my freetime like learning new
          thing and that's true i have some experience from learning new thing
          like once i create some music (Piano Pieces) because i love classical
          music so this one get me into inspiration, making 🎎 Felting doll yes i
          once make Felting doll (it turned out a little cursed though) {""}
          <span>
            <button
              className="border-b-2 border-b-amber-400 p-0"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "hide" : "show"} image
            </button>
          </span>
          .
        </p>
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key="felting-image"
              className="mx-auto overflow-hidden"
              initial={{ height: 0, opacity: 0, y: 20 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <OptimizedImage
                className="mx-auto"
                height={300}
                width={300}
                alt="Felting-doll"
                src="https://res.cloudinary.com/duyurqj38/image/upload/v1750352855/IMG_20211014_160608_gmdmgs.jpg"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <p>
          🎹 Playing piano was in my list too before but i give up because it
          was hard, 🎶 i love listening music because i like listening to
          intrument so i listen to pretty much anything like from classical
          music, rap songs, metal, to jpop mostly from vocaloid tho, and last i
          love 📺 watching some anime especially when it comes to Slice of life.
        </p>
      </div>
    </div>
  );
}

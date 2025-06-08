import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
export const contentData: contentProps[] = [
  {
    id: "1",
    metaTag: "meta description for blog1",
    title:
      "Bringing UI to Life: Designing an Interactive Carousel with Framer Motion",
    content: (
      <>
        <p>
          Dalam dunia pengembangan frontend, animasi pada antarmuka pengguna
          (UI) bukan lagi hal yang asing dari transisi yang halus saat berpindah
          halaman, hingga efek-efek interaktif yang membuat pengalaman pengguna
          terasa lebih hidup, animasi sudah menjadi bagian penting dalam desain
          modern dan terlebih lagi di era AI dan "Vibe Coding" yang memetingkan
          kecepatan, dan karena itu masi banyak developer terutama yang baru
          belajar tentang pengembangan website yang sering melupakan tentang
          performa website/aplikasi. Karena itu saya ingin mengenalkan
          Framer-Motion dari pengalaman saya membangun carousel menggunakan
          Framer-Motion.
        </p>
        <br />
        <p>
          Sedikit cerita, sekitar setahun yang lalu saya pernah membuat website
          yang bertujuan sangat bergantung pada animasi, tetapi saya belum
          mengenal tentang library animation jadi saya hanya menggunakan hook
          seperti useState,useEffect dan Asynchronous (setTimeout,setInterval).
          tetapi animasi nya sangat clunky, dan tidak smooth. setelah menyadari
          itu saya mulai mencari dan belajar tentang library animasi terutama
          component carousel seperti Swiper.js, namun sayangnya saya menemui
          kendala performa seperti skor LCP (Largest Contentful Paint) yang
          menurun, nested slide dan fitur Lazy loading nya yang kurang optimal.
          Setelah melalui banyak pencarian akhirnya saya menemukan sebuah
          library animasi React yang menurut saya sesuai untuk kebutuhan saya
          yaitu Framer-motion. Nah di blog ini saya akan membagi pengalaman saya
          membuat carousel menggunakan Framer-motion yang tidak hanya smooth
          secara visual, tapi juga efisien secara performa.
        </p>
        <h2 className="h2-content relative border-b-3 border-b-sky-700 w-fit">
          Setting up Framer-motion
        </h2>
        <p>
          Untuk Mensetup Framer-motion di project react, pertama harus
          menginstall Framer-motion di syntax dibawah ini.
        </p>
        <br />
        <SyntaxHighlighter language="bash" style={atomDark}>
          npm i framer-motion
        </SyntaxHighlighter>
        <br />
        <h2 className="h2-content relative border-b-3 border-b-sky-700 w-fit">
          Process of making carousel
        </h2>
        <p>
          Di pembuatan carousel ini saya tidak menggunakan Framer-motion saja
          untuk performa, tetapi melibatkan teknik seperti dibawah berikut
        </p>
        <ul className="list-decimal ml-12 w-fit">
          <li>Lazy Loading</li>
          <li>useMemo()</li>
          <li>Menggunakan cloudinary untuk gambar</li>
        </ul>
        <p>
          Lazy Loading adalah strategi untuk mengidentifikasikan resources yang
          di anggap tidak critical dan akan di load ketika dibutuhkan,
          Dikarenakan kemungkinan component carousel ini berat jadi teknik ini
          cocok untuk di gunakan. dan yang kedua yaitu menaruh gambar kedalam
          cloud disini saya menggunakan{" "}
          <a className="link-content" href="https://www.cloudinary.com">
            Cloudinary
          </a>{" "}
          sebagai SaaS nya, fungsi ini untuk membuat ukuran file gambar lebih
          kecil dibandingkan ukuran utama nya dengan cara mengubah format gambar
          menjadi Webp/Avif tanpa mengurangi kualitas gambar secara berlebih.
        </p>
        <p>Tools dan bahasa yang saya pakai adalah Tailwind dan Typescript</p>
        <h3 className="h3-content relative border-b-3 border-b-sky-700 w-fit">
          First Step
        </h3>
        <p>
          Yang pertama saya membuat component untuk image. component ini
          bertujuan mengambil gambar yang sudah kita masukan ke cloudinary dan
          panggil gambar ke dalam img element
        </p>

        <SyntaxHighlighter
          language="typescript"
          style={atomDark}
          showLineNumbers
        >
          {`import { Cloudinary } from '@cloudinary/url-gen/index';
import { byAngle } from '@cloudinary/url-gen/actions/rotate';
import { fit } from '@cloudinary/url-gen/actions/resize';
import { useEffect, useState } from 'react';

type QualityProps = 'auto' | 'low' | 'medium' | 'high' | 'best' | number;

const cld = new Cloudinary({
  cloud: { cloudName: import.meta.env.VITE_CLOUDNAME (cloudname from cloudinary) }
});

export function ImageOptimization({
  url,
  quality = 'auto',
  height,
  width,
  rotateAngle,
  className,
  loading = false,
  fetchPriority = false,
}: {
  fetchPriority?: boolean;
  loading?: boolean;
  className?: string;
  rotateAngle?: number;
  quality?: QualityProps;
  url: string;
  width?: number;
  height?: number;
}) {
  const myImage = cld.image(url)
    .format('auto')
    .quality(quality)
    .resize(fit().width(width ?? 1920).height(height ?? 1080));

  if (rotateAngle) {
    myImage.setVersion(Date.now());
    myImage.rotate(byAngle(rotateAngle));
  }

  useEffect(() => {
    const img = new Image();
    img.src = myImage.toURL();
  }, [url]);

  return (
    <>
      <img
        src={myImage.toURL()}
        alt={url}
        fetchPriority={fetchPriority ? 'high' : 'auto'}
        className={\`object-contain \${className ?? ''}\`}
      />
    </>
  );
}`}
        </SyntaxHighlighter>
        <h3 className="h3-content relative border-b-3 border-b-sky-700 w-fit">
          Second Step
        </h3>
        <p>
          Yang step kedua saya buat adalah container carousel dan membuat data{" "}
          <a
            className="link-content"
            href={`https://github.com/MuniMunii/munisekai_v2/blob/main/src/data.ts`}
          >
            here is the link
          </a>
          , yang akan berisikan Slide dan Pagination
        </p>
        <p>module.d.ts (untuk safe typing)</p>
        <SyntaxHighlighter
          language="typescript"
          style={atomDark}
          showLineNumbers
        >
          {`interface TestingCharacter {
  id?: number;
  name: string;
  color: string;
  bodyImage: string;
  charDesc: string;
  specialty:string[]
  birthday:string
  hobbies:string[]
  longDesc:string
  stamps?:StampProps[]
}
type GroupShortNames = "leo" | "mmj" | "vbs" | "wxs" | "25j";
interface StampProps{
  url:string;
  top?:number;
  right?:number;
  bottom?:number;
  left?:number;
  zIndex?:number;
}
interface CharProps {
imageColor:string;
  specialty:string[]
  birthday:string
  hobbies:string[]
  name: string;
  icon: string;
  desc: string;
  longDesc: string;
  bodyImg: string;
  halfImg?:string;
  stamps?:StampProps[]
}
interface GroupProps {
  groupName: string;
  iconGroup: string;
  group: GroupShortNames;
  groupDesc: string;
  color: string;
  char: CharProps[];
}
            `}
        </SyntaxHighlighter>
        <p>carousel.tsx</p>
        <SyntaxHighlighter
          language="typescript"
          style={atomDark}
          showLineNumbers
        >
          {`import { useMemo, useState } from "react";
import { AnimatePresence, motion, wrap } from "motion/react";
import { ImageOptimization } from "../ImageOptimization";
import { dummyObject } from "../../data";
export default function CarouselCharacter() {
  // store items
  const [group, setGroup] = useState<GroupShortNames>("leo");
  const [selectedItem, setSelectedItem] = useState(1);
  // state for changing items
  const [direction, setDirections] = useState<1 | -1>(1);
  const currentGroup = useMemo(
    () => dummyObject.find((child) => child.group === group)!,
    [group]
  );
  const charList = currentGroup.char;
  const currentChar = charList[selectedItem - 1];
  // function change slide
  function setSlide(newDirection: 1 | -1) {
    const nextItem = wrap(1, charList.length + 1, selectedItem + newDirection);
    // set next item
    setSelectedItem(nextItem);
    // change with new parametes
    setDirections(newDirection);
  }`}
        </SyntaxHighlighter>
        <p>
          Disini kita melihat ada beberapa state. Yang pertama ada state{" "}
          <span className="span-block">Group</span> state ini untuk menunjukan
          group yang nanti kita akan find nantinya, state{" "}
          <span className="span-block">selectedItem</span> state ini sebagai
          index character di data group, dan terakhir ada state{" "}
          <span className="span-block">direction</span> state ini untuk mengatur
          pergerakan index <span className="span-block">selectedItem</span>{" "}
          seperti Next dan Previous button.component ini masih belom complete
        </p>
        <h3 className="h3-content relative border-b-3 border-b-sky-700 w-fit">Third Step</h3>
        <p>Di step ini saya membuat char Pagination untuk carousel nya</p>
        <p>carousel.tsx</p>
        <SyntaxHighlighter
          language="typescript"
          style={atomDark}
          showLineNumbers
        >
          {`function CharPagination() {
  return charList.map((char, index) => {
    const [isHover, setIsHover] = useState<boolean>(false);
    const isActive = selectedItem === index + 1;
    return (
      <motion.div
        key={\\\`\${currentGroup.group}-\${char.name}\\\`}
        onHoverStart={() => setIsHover(true)}
        onHoverEnd={() => setIsHover(false)}
        onTapStart={() => setIsHover(true)}
        onTapCancel={() => setIsHover(false)}
        animate={isHover && !isActive ? { rotate: 360 } : { rotate: 0 }}
        transition={
          isHover && !isActive
            ? { repeat: Infinity, duration: 2, delay: 0 }
            : { duration: 0 }
        }
        onClick={() => setSelectedItem(index + 1)}
        className="rounded-full border md:size-18 max-md:size-16 p-[6px] flex cursor-pointer justify-center items-center select-none"
        style={{
          border: \`solid 1px \${isActive ? currentGroup.color : "#000"}\`,
        }}
      >
        <ImageOptimization url={char.icon} loading={true} className="" />
      </motion.div>
    );
  });
}
`}
        </SyntaxHighlighter>
        <p>
          Disini dimana saya akan menjelaskan component motion. Untuk membaca
          element/value yang akan di gunakan dalam animasi motion, motion
          menyediakan component{" "}
          <span className="span-block">motion.elementHTML</span>. Di component
          ini ada 2 state yaitu <span className="span-block">isHover</span> dan{" "}
          <span className="span-block">isActive</span>. Pertama-tama kenapa kita
          tidak memakai hover yang di sediakan oleh CSS?, alasan kenapa memakai
          state untuk hover karena hover menggunakan vanilla css tidak berfungsi
          pada touch device seperti mobile,tablet,dll. component motion
          menyediakan berbagai props dan event handler, disini saya akan
          membahas <span className="span-block">animate</span> dan event handler
          on dan sejenisnya. props <span className="span-block">animate</span>{" "}
          adalah props untuk mengatur animasi di props tersebut, dan props on
          seperti <span className="span-block">onHoverStart</span> dan{" "}
          <span className="span-block">onHoverCancel</span> props yang akan
          firing ketika di hover dimulai dan saat keluar dari element tersebut
          sama seperti <span className="span-block">onTapStart</span> dan{" "}
          <span className="span-block">onTapCancel</span>.
        </p>
        <h3 className="h3-content relative border-b-3 border-b-sky-700 w-fit">Fourth Step</h3>
        <p>
          Di Step ini saya membuat container Image menggunakan Lazy load jadi
          image akan ke load hanya jika image itu di tampilkan
        </p>
        <p>slide.tsx</p>
        <SyntaxHighlighter
          language="typescript"
          style={atomDark}
          showLineNumbers
        >
          {`import { motion, AnimatePresence } from "framer-motion";
import { ImageOptimization } from "../ImageOptimization";
function StampAppear({
  stamps,
  name,
}: {
  stamps: StampProps[] | undefined;
  name: string;
}) {
  return (
    <AnimatePresence>
      {stamps?.map((stamp, index) => (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              type: "spring",
              bounce: 0.4,
              damping: 10,
              stiffness: 120,
              delay: index * 0.3,
            },
          }}
          exit={{ opacity: 0, scale: 0 }}
          key={stamp.url + index + name}
          style={{
            top: \`\${stamp.top}%\`,
            left: \`\${stamp.left}%\`,
            zIndex: stamp.zIndex,
          }}
          className="absolute md:size-24 max-md:size-20 pointer-events-none"
        >
          <ImageOptimization url={stamp.url} className="" />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
export default function ImageCarousel({
  stamps,
  bodyImage,
  name,
}: {
  stamps: StampProps[] | undefined;
  bodyImage: string;
  name: string;
}) {
  return (
    <motion.div
      key={bodyImage + name}
      initial={{ opacity: 0, x: 50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.6,
          type: "spring",
          bounce: 0.4,
        },
      }}
      exit={{ opacity: 0, x: -50 }}
      className="h-96 w-[90%] max-w-72 z-10 flex justify-center items-center relative select-none"
    >
      <ImageOptimization
        loading={true}
        quality={100}
        url={bodyImage}
        className="object-cover pointer-events-none z-20"
      />
      <StampAppear stamps={stamps} name={name} />
    </motion.div>
  );
}
`}
        </SyntaxHighlighter>
        <p>
          Di karenakan kita sudah membahas tentang props animate, sekarang kita
          akan membahas props lain nya seperti{" "}
          <span className="span-block">initial</span>,
          <span className="span-block">exit</span>, dan
          <span className="span-block">spring</span>.{""}
          <span className="span-block">initial</span> props ini bertujuan
          sebagai state awalan sebelum element akan di animasi, props{" "}
          <span className="span-block">exit</span> props ini bertujuan meng
          animasi element ketika element ini keluar/unmount dan terakhir motion
          juga menyediakan <span className="span-block">spring</span> effect di
          props transition ini juga support seperti dampness, bounce,dan
          stiffnes untuk mensimulasikan spring secara realistis.
        </p>
        <h3 className="h3-content relative border-b-3 border-b-sky-700 w-fitt">Fifth Step</h3>
        <p>Di step ke lima, kita akan membuat Slide Container untuk content di dalam carousel</p>
        <p>slideCarousel.tsx</p>
<SyntaxHighlighter language="typescript" style={atomDark} showLineNumbers>
{`import React, { forwardRef } from "react";
import { motion } from "framer-motion";
const ImageCarousel = React.lazy(() => import("./image"));
export const Slide = forwardRef<HTMLDivElement, TestingCharacter>(
  function Slide(
    {
      name,
      bodyImage,
      color,
      charDesc,
      birthday,
      hobbies,
      specialty,
      stamps,
      longDesc,
    },
    ref
  ) {
    return (
      <motion.div
        className="w-full rounded-3xl flex lg:flex-row flex-col items-center justify-start"
        ref={ref}
        key={name}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            delay: 0.1,
            type: "spring",
            bounce: 0.4,
          },
        }}
        exit={{
          opacity: 0,
          transition: { delay: 0.6 },
        }}
      >
        <ImageCarousel bodyImage={bodyImage} name={name} stamps={stamps} />
        <motion.div
          initial={{ opacity: 0, transition: { delay: 0.5 } }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
          exit={{ opacity: 0, transition: { delay: 0.5 } }}
          className="lg:w-2/3 md:mx-auto w-full p-3 pb-[32px] relative max-w-[754px] min-h-[398px] overflow-hidden rounded-md flex flex-col gap-2 backdrop-blur-xs"
          style={{
            backgroundImage: \`linear-gradient(320deg, \${color} 35%, rgba(255, 255, 255, 0.2) 100%)\`,
          }}
        >
          <motion.h1
            animate={{ opacity: 1, x: 0, transition: { delay: 0.15 } }}
            initial={{ opacity: 0, x: 100 }}
            exit={{ opacity: 0, x: -100 }}
            className="uppercase text-white text-4xl tracking-wider"
          >
            {name}
          </motion.h1>
          <motion.p
            animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
            initial={{ opacity: 0, x: 100 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white/80 rounded-md p-2 text-primary-gray"
          >
            {charDesc}
          </motion.p>
          <div className="flex flex-col-reverse md:flex-row-reverse gap-2 justify-between text-primary-gray">
            <motion.div
              animate={{ opacity: 1, x: 0, transition: { delay: 0.5 } }}
              initial={{ opacity: 0, x: 100 }}
              exit={{ opacity: 0, x: -100 }}
              className="bg-white/80 p-1 md:max-w-[415px] rounded-md"
            >
              {longDesc}
            </motion.div>
            <div className="flex flex-col gap-2 w-full">
              <motion.p
                animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
                initial={{ opacity: 0, x: 100 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white/80 rounded-md p-2 w-full md:max-w-[300px]"
              >
                Birthday
                <span className="ml-3.5 pl-1.5 border-l-2 border-l-gray-700">
                  {birthday}
                </span>
              </motion.p>
              <motion.div
                animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}
                initial={{ opacity: 0, x: 100 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white/80 h-fit w-full md:max-w-[300px] flex items-center gap-1.5 p-1.5 rounded-md"
              >
                <p className="border-r-2 border-r-gray-700 pr-3.5 w-[78px]">
                  Hobbies
                </p>
                <div>{hobbies.join(", ")}</div>
              </motion.div>
              <motion.div
                animate={{ opacity: 1, x: 0, transition: { delay: 0.5 } }}
                initial={{ opacity: 0, x: 100 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white/80 h-fit w-full md:max-w-[300px] flex items-center gap-1.5 p-1.5 rounded-md"
              >
                <p className="border-r-2 border-r-gray-700 pr-3.5 w-[78px]">
                  Specialty
                </p>
                <div>{specialty.join(", ")}</div>
              </motion.div>
            </div>
          </div>
          <div
            className="w-full h-fit pl-2 absolute bottom-0 left-0 text-sm border-t border-t-slate-100 uppercase text-white/70"
            style={{ backgroundColor: color }}
          >
            {name}
          </div>
        </motion.div>
      </motion.div>
    );
  }
);
`}
</SyntaxHighlighter>
<p><span className="span-block">{'const ImageCarousel = React.lazy(() => import("./image"))`'}</span> kita memakai function React.lazy sebagai lazyloading component</p>
<h3 className="h3-content relative border-b-3 border-b-sky-700 w-fit">Final Step</h3>
<p>Di step ini kita akan memasukan semua component tersebut ke dalam carousel.tsx</p>
<p>carousel.tsx</p>
<SyntaxHighlighter language="typescript" style={atomDark} showLineNumbers>
{`\import { useMemo, useState } from "react";
import { AnimatePresence, motion, wrap } from "framer-motion";
import { ImageOptimization } from "../ImageOptimization";
import { dummyObject } from "../../data";
import { Slide } from "./slideCarousel";
import useMediaQuery from "../../hook/useMediaQuerys";
export default function CarouselCharacter() {
  const isWideScreen = useMediaQuery("(min-width:1024px)");
  const [group, setGroup] = useState<GroupShortNames>("leo");
  const [selectedItem, setSelectedItem] = useState(1);
  const [direction, setDirections] = useState<1 | -1>(1);
  const currentGroup = useMemo(
    () => dummyObject.find((child) => child.group === group)!,
    [group]
  );
  const charList = currentGroup.char;
  const currentChar = charList[selectedItem - 1];
  function setSlide(newDirection: 1 | -1) {
    const nextItem = wrap(1, charList.length + 1, selectedItem + newDirection);
    setSelectedItem(nextItem);
    setDirections(newDirection);
  }
  function CharPagination() {
    return charList.map((char, index) => {
      const [isHover, setIsHover] = useState<boolean>(false);
      const isActive = selectedItem === index + 1;
      return (
        <motion.div
          key={\`\${currentGroup.group}-\${char.name}\`}
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          onTapStart={() => setIsHover(true)}
          onTapCancel={() => setIsHover(false)}
          animate={isHover && !isActive ? { rotate: 360 } : { rotate: 0 }}
          transition={
            isHover && !isActive
              ? { repeat: Infinity, duration: 2, delay: 0 }
              : { duration: 0 }
          }
          onClick={() => setSelectedItem(index + 1)}
          className="rounded-full border md:size-18 max-md:size-16 p-[6px] flex cursor-pointer justify-center items-center select-none"
          style={{
            border: \`solid 1px \${isActive ? currentGroup.color : "#000"}\`,
          }}
        >
          <ImageOptimization url={char.icon} loading={true} className="" />
        </motion.div>
      );
    });
  }
  return (
    <div id="unit" style={{ zIndex: 10 }} className="w-full max-w-[1333px] mx-auto my-auto h-full gap-4 flex flex-col">
      <div className="flex gap-2 justify-center">
        {dummyObject.map((group) => (
          <motion.button
            key={"button" + group.group}
            onClick={() => {
              setGroup(group.group);
              setSelectedItem(1);
            }}
            initial={{ backgroundImage: \`linear-gradient(220deg, \${group.color}, rgba(255, 255, 255, 0.55))\` }}
            whileHover={{ backgroundImage: \`linear-gradient(100deg, \${group.color}, rgba(255, 255, 255, 0.55))\` }}
            whileTap={{ backgroundImage: \`linear-gradient(100deg, \${group.color}, rgba(255, 255, 255, 0.55))\` }}
            className="w-32 h-fit py-1 flex justify-center items-center px-2 rounded-md z-10 cursor-pointer"
          >
            <ImageOptimization url={group.iconGroup} />
          </motion.button>
        ))}
      </div>
      <p
        style={{ color: currentGroup.color }}
        className="text-center text-2xl max-md:text-xl z-10 max-w-[700px] bg-white/90 h-fit w-[95%] mx-auto py-2 px-3 rounded-md relative before:absolute before:text-7xl before:content-['“'] before:font-mono before:-top-5 before:-left-4 after:absolute after:text-7xl after:content-['”'] after:font-mono after:-bottom-13 after:-right-4"
      >
        {currentGroup.groupDesc}
      </p>
      <div className="flex max-lg:flex-col h-full w-full gap-2">
        <div className="flex items-center justify-center max-lg:flex-row flex-col gap-2 z-10">
          <CharPagination />
        </div>
        <div className="w-full flex items-center gap-3 relative">
          <AnimatePresence custom={direction} mode="popLayout" initial={false}>
            <motion.button
              key="button-prev"
              initial={false}
              className={\`cursor-pointer text-black font-semibold h-fit \${!isWideScreen ? "absolute top-32" : ""}\`}
              onClick={() => setSlide(-1)}
            >
              Prev
            </motion.button>
            <Slide
              key={group + "-" + currentChar.name}
              color={currentChar.imageColor}
              name={currentChar.name}
              bodyImage={currentChar.bodyImg}
              charDesc={currentChar.desc}
              birthday={currentChar.birthday}
              hobbies={currentChar.hobbies}
              specialty={currentChar.specialty}
              stamps={currentChar.stamps}
              longDesc={currentChar.longDesc}
            />
            <motion.button
              key="button-next"
              initial={false}
              className={\`cursor-pointer text-black font-semibold h-fit \${!isWideScreen ? "absolute right-0 top-32" : ""}\`}
              onClick={() => setSlide(1)}
            >
              Next
            </motion.button>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}\``}
</SyntaxHighlighter>
<p>Dan Carousel animasi interaktif tanpa mengganggu performa website berhasil di buat</p>
      </>
    ),
  },
  {
    id: "2",
    metaTag: "meta description for blog2",
    title: "Welcome to My Blog2",
    content: <>welcome blog2</>,
  },
];

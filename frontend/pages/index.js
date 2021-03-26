import dynamic from "next/dynamic";

import Hero from "../components/index/hero";
const Gallery = dynamic(() => import("../components/index/gallery"));
const Contact = dynamic(() => import("../components/index/contact"));
const Content = dynamic(() => import("../components/index/content"));
export default function Home() {
  return (
    <>
      <Hero />
      <Content />
      <Gallery />
      <Contact />
    </>
  );
}

import dynamic from "next/dynamic";

import Hero from "../components/hero";
const Gallery = dynamic(() => import("../components/gallery"));
const Contact = dynamic(() => import("../components/contact"));

export default function Home() {
  return (
    <>
      <Hero />
      <Gallery />
      <Contact />
    </>
  );
}

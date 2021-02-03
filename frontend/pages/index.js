import dynamic from "next/dynamic";

import Hero from "../components/home/hero";
const DynamicGallery = dynamic(() => import("../components/home/gallery"));
const DynamicContact = dynamic(() => import("../components/home/contact"));

export default function Home() {
  return (
    <>
      <Hero />
      <DynamicGallery />
      <DynamicContact />
    </>
  );
}

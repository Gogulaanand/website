import dynamic from "next/dynamic";

import Hero from "../components/hero";
const DynamicGallery = dynamic(() => import("../components/gallery"));
const DynamicContact = dynamic(() => import("../components/contact"));

export default function Home() {
  return (
    <>
      <Hero />
      <DynamicGallery />
      <DynamicContact />
    </>
  );
}

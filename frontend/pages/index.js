import loadable from "@loadable/component";
const Hero = loadable(() => import("../components/hero"));
const Gallery = loadable(() => import("../components/gallery"));
const Contact = loadable(() => import("../components/contact"));

export default function Home() {
  return (
    <>
      <Hero />
      <Gallery />
      <Contact />
    </>
  );
}

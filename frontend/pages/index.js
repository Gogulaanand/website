import dynamic from "next/dynamic";
import Head from "next/head";
import Hero from "components/index/hero";
const Gallery = dynamic(() => import("components/index/gallery"));
const Contact = dynamic(() => import("components/index/contact"));
const Content = dynamic(() => import("components/index/content"));
export default function Home() {
  return (
    <>
      <Head>
        <title>Sunfabb</title>
        <meta
          type="description"
          content="Your one stop solution to order all your fabric requirements like bedspreads, pillow covers, bedsheets, towels and napkins"
        />
      </Head>
      <Hero />
      <Content />
      <Gallery />
      <Contact />
    </>
  );
}

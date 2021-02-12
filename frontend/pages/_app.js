import { useEffect } from "react";
import "../styles/globals.sass";
import Layout from "../components/layout";
import Footer from "../components/footer";
import withData from "../lib/apollo";
import AOS from "aos";
import "aos/dist/aos.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    setTimeout(() => {
      AOS.init({
        useClassNames: true,
        initClassName: false,
        animatedClassName: "animated",
      });
    }, 1000);
  }, []);

  return (
    <>
      <head>
        <html lang="en"></html>
        <title>Sunfabb</title>
        <meta
          name="description"
          content="company name: Sunfabb. High Quality bedspreads, bed sheets, pillow covers, scarf, hand keys, kerchief manufactured and priced reasonable but of best quality unmatched by others in the market"
        ></meta>
      </head>
      <body>
        <Layout />
        <Component {...pageProps} />
        <Footer />
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        ></link>
      </body>
    </>
  );
}

export default withData(MyApp);

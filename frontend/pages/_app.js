import "../styles/globals.sass";
import "tailwindcss/tailwind.css";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <html lang="en"></html>
      <title>Sunfabb</title>
      <meta
        name="description"
        content="company name: Sunfabb. High Quality bedspreads, bed sheets, pillow covers, scarf, hand keys, kerchief manufactured and priced reasonable but of best quality unmatched by others in the market"
      ></meta>
      <Layout />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

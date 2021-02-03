import "../styles/globals.sass";
import "tailwindcss/tailwind.css";
import Layout from "../components/general/layout";
import withData from "../lib/apollo";

function MyApp({ Component, pageProps }) {
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
      </body>
    </>
  );
}

export default withData(MyApp);

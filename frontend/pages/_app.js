import "../styles/globals.sass";
import "tailwindcss/tailwind.css";
import Layout from "../components/layout";
import withData from "../lib/apollo";

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
      {/* <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossorigin="anonymous"
        media="print"
        onload="this.media='all';this.onload=null;"
      />
      <noscript>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossorigin="anonymous"
        />
      </noscript> */}
    </>
  );
}

export default withData(MyApp);

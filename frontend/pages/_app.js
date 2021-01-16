import "../styles/globals.sass";
import "tailwindcss/tailwind.css";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <html lang="en"></html>
      <title>Sunfabb</title>
      <Layout />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

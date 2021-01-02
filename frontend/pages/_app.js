import "../styles/globals.sass";
import "tailwindcss/tailwind.css";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

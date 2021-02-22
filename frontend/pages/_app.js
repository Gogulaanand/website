import { useEffect, useState } from "react";
import "../styles/globals.sass";
import Layout from "../components/layout";
import Footer from "../components/footer";
import withData from "../lib/apollo";
import AOS from "aos";
import "aos/dist/aos.css";
import Cookie from "js-cookie";
import fetch from "isomorphic-fetch";
import AppContext from "../context/AppContext";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookie.get("token");
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(async (res) => {
        if (!res.ok) {
          Cookie.remove("token");
          return null;
        }
        const user = await res.json();
        setUser(user);
        console.log(user);
      });
    }

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
      <AppContext.Provider
        value={{
          user: user,
          isAuthenticated: !!user,
          setUser: setUser,
        }}
      >
        <title>Sunfabb</title>
        <meta
          name="description"
          content="company name: Sunfabb. High Quality bedspreads, bed sheets, pillow covers, scarf, hand keys, kerchief manufactured and priced reasonable but of best quality unmatched by others in the market"
        ></meta>
        <Layout />
        <Component {...pageProps} />
        <Footer />
      </AppContext.Provider>
    </>
  );
}

export default withData(MyApp);

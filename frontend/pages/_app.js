import { useEffect, useState } from "react";
import "../styles/globals.sass";
import Nav from "../components/index/nav";
import Footer from "../components/index/footer";
import withData from "../lib/apollo";
import AOS from "aos";
import "aos/dist/aos.css";
import Cookie from "js-cookie";
import fetch from "isomorphic-fetch";
import AppContext from "../context/AppContext";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [cart, updateCart] = useState({ items: [], total: 0 });

  useEffect(() => {
    const token = Cookie.get("token");
    const cart = Cookie.get("cart");
    if (cart === "String" && cart !== undefined) {
      JSON.parse(cart).forEach((item) => {
        updateCart({
          cart: JSON.parse(cart),
          total: item.price * item.quantity,
        });
      });
    }
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

  const addItem = (item) => {
    let items = cart.items;
    const newItem = items.find((i) => i.id === item.id);
    if (!newItem) {
      console.log(item);
      item.quantity = 1;
      items = [...items, item];
      updateCart({ items, total: cart.total + item.price });
      Cookie.set("cart", items);
    } else {
      items = cart.items.map((item) =>
        item.id === newItem.id
          ? Object.assign({}, item, { quantity: item.quantity + 1 })
          : item
      );
      updateCart({
        items,
        total: cart.total + item.price,
      });
      Cookie.set("cart", items);
    }
  };

  const removeItem = (item) => {
    let { items } = cart.items;
    const removeItem = items.find((i) => i.id === item.id);
    if (removeItem.quantity > 1) {
      items = cart.items.map((item) =>
        item.id === removeItem.id
          ? Object.assign({}, item, { quantity: item.quantity - 1 })
          : item
      );
      updateCart({
        items,
        total: cart.total - removeItem.price,
      });
      Cookie.set("cart", items);
    } else {
      const items = [...cart.items];
      const index = items.findIndex((i) => i.id === removeItem.id);
      items.splice(index, 1);
      updateCart({
        cart: {
          items,
          total: cart.total - removeItem.price,
        },
      });
      Cookie.set("cart", items);
    }
  };

  return (
    <>
      <AppContext.Provider
        value={{
          user,
          isAuthenticated: !!user,
          setUser,
          cart,
          addItem,
          removeItem,
        }}
      >
        <title>Sunfabb</title>
        <meta
          name="description"
          content="company name: Sunfabb. High Quality bedspreads, bed sheets, pillow covers, scarf, hand keys, kerchief manufactured and priced reasonable but of best quality unmatched by others in the market"
        ></meta>
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </AppContext.Provider>
    </>
  );
}

export default withData(MyApp);

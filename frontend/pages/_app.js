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
  const [cart, updateCart] = useState({
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
  });

  useEffect(() => {
    const token = Cookie.get("token");
    const cookieCart = Cookie.get("cart");

    if (cookieCart !== undefined && cookieCart.length > 0) {
      let totalCount = 0;
      JSON.parse(cookieCart).forEach((item) => {
        totalCount += item.quantity;
        updateCart({
          items: JSON.parse(cookieCart),
          totalAmount: item.price * item.quantity,
          totalQuantity: totalCount,
        });
      });
    } else {
      updateCart({
        items: [],
        totalAmount: 0,
        totalQuantity: 0,
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
    let existingItem;
    if (items) existingItem = items.find((i) => i.id === item.id);

    if (!existingItem) {
      updateCart({
        items: [
          ...(items || []),
          Object.assign({}, item, {
            quantity: 1,
          }),
        ],
        totalAmount: cart.totalAmount + item.price * 1,
        totalQuantity: cart.totalQuantity + 1,
      });
    } else {
      const index = items.findIndex((i) => i.id === item.id);
      items[index] = Object.assign({}, item, {
        quantity: existingItem.quantity + 1,
      });
      updateCart({
        items,
        totalAmount: cart.totalAmount + existingItem.price,
        totalQuantity: cart.totalQuantity + 1,
      });
    }
    Cookie.set("cart", items, { secure: true, expires: 365 });
  };

  const removeItem = (item) => {
    let items = cart.items;
    const removeItem = items.find((i) => i.id === item.id);

    if (removeItem.quantity > 1) {
      const index = items.findIndex((i) => i.id === item.id);
      items[index] = Object.assign({}, item, {
        quantity: removeItem.quantity - 1,
      });
      updateCart({
        items,
        totalAmount: cart.totalAmount - item.price,
        totalQuantity: cart.totalQuantity - 1,
      });
    } else {
      deleteItem(item);
    }
    Cookie.set("cart", items, { secure: true, expires: 365 });
  };

  const deleteItem = (item) => {
    let items = cart.items;
    const deleteItem = items.find((i) => i.id === item.id);
    if (deleteItem) {
      const index = items.findIndex((i) => i.id === item.id);
      items.splice(index, 1);
      updateCart({
        items,
        totalAmount: cart.totalAmount - deleteItem.price * deleteItem.quantity,
        totalQuantity: cart.totalQuantity - deleteItem.quantity,
      });
      Cookie.set("cart", items, { secure: true, expires: 365 });
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
          deleteItem,
          enableCart: false,
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
        <link
          rel="stylesheet"
          href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        ></link>
      </AppContext.Provider>
    </>
  );
}

export default withData(MyApp);

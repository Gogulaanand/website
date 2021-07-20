import { useEffect, useState } from "react";
import Head from "next/head";
import "../styles/globals.sass";
import Nav from "../components/index/nav";
import Footer from "../components/index/footer";
import AOS from "aos";
import "aos/dist/aos.css";
import Cookie from "js-cookie";
import fetch from "isomorphic-unfetch";
import AppContext from "../context/AppContext";
import withData from "../lib/apollo";
import { ApolloProvider } from "@apollo/react-hooks";
import { ToastProvider } from "react-toast-notifications";

function MyApp({ Component, pageProps, apollo }) {
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
      let totalPrice = 0;
      JSON.parse(cookieCart).forEach((item) => {
        totalCount += item.quantity;
        totalPrice += item.price * item.quantity;
        updateCart({
          items: JSON.parse(cookieCart),
          totalAmount: totalPrice,
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
        const verifiedUser = await res.json();
        setUser(verifiedUser);
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
    Cookie.set("cart", items, { sameSite: "None", secure: true, expires: 365 });
  };

  const removeItem = (item) => {
    let items = cart.items;
    const item_to_remove = items.find((i) => i.id === item.id);

    if (item_to_remove.quantity > 1) {
      const index = items.findIndex((i) => i.id === item.id);
      items[index] = Object.assign({}, item, {
        quantity: item_to_remove.quantity - 1,
      });
      updateCart({
        items,
        totalAmount: cart.totalAmount - item.price,
        totalQuantity: cart.totalQuantity - 1,
      });
      Cookie.set("cart", items, {
        sameSite: "None",
        secure: true,
        expires: 365,
      });
    } else {
      deleteItem(item);
    }
  };

  const deleteItem = (item) => {
    let items = cart.items;
    const item_to_delete = items.find((i) => i.id === item.id);
    if (item_to_delete) {
      const index = items.findIndex((i) => i.id === item.id);
      items.splice(index, 1);
      updateCart({
        items,
        totalAmount:
          cart.totalAmount - item_to_delete.price * item_to_delete.quantity,
        totalQuantity: cart.totalQuantity - item_to_delete.quantity,
      });
      Cookie.set("cart", items, {
        sameSite: "None",
        secure: true,
        expires: 365,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Sunfabb</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="company name: Sunfabb. High Quality bedspreads, bed sheets, pillow covers, scarf, hand keys, kerchief manufactured and priced reasonable but of best quality unmatched by others in the market"
        ></meta>
      </Head>
      <ApolloProvider client={apollo}>
        <ToastProvider>
          <AppContext.Provider
            value={{
              magic,
              user,
              isAuthenticated: !!user,
              setUser,
              cart,
              addItem,
              removeItem,
              deleteItem,
              enableCart: true,
            }}
          >
            <Nav />
            <Component {...pageProps} />
            <Footer />
          </AppContext.Provider>
        </ToastProvider>
      </ApolloProvider>
    </>
  );
}

export default withData(MyApp);

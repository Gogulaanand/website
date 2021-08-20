import { useContext } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import AppContext from "context/AppContext";

const FilledCart = dynamic(() => import("components/cart/filledCart"), {
  loading: function load() {
    return <div className="h-screen"></div>;
  },
});
const EmptyCart = dynamic(() => import("components/cart/emptyCart"), {
  loading: function load() {
    return <div className="h-screen"></div>;
  },
});

export default function Cart() {
  const { cart } = useContext(AppContext);
  return (
    <>
      <Head>
        <title>Cart</title>
        <meta
          type="description"
          content="Cart page which lists all of the sunfabb items that the customer intends to bug or order online and get it delivered"
        />
      </Head>
      {cart.totalQuantity > 0 ? <FilledCart /> : <EmptyCart />}
    </>
  );
}

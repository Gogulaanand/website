import { useContext } from "react";
import dynamic from "next/dynamic";

import AppContext from "../context/AppContext";
const FilledCart = dynamic(() => import("../components/cart/filledCart"), {
  loading: function load() {
    return <div className="h-screen"></div>;
  },
});
const EmptyCart = dynamic(() => import("../components/cart/emptyCart"), {
  loading: function load() {
    return <div className="h-screen"></div>;
  },
});

export default function Cart() {
  const { cart } = useContext(AppContext);
  return <>{cart.totalQuantity > 0 ? <FilledCart /> : <EmptyCart />}</>;
}

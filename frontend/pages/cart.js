import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import FilledCart from "../components/cart/filledCart";
import EmptyCart from "../components/cart/emptyCart";

export default function Cart() {
  const appContext = useContext(AppContext);
  const { cart } = appContext;
  return <>{cart.totalQuantity > 0 ? <FilledCart /> : <EmptyCart />}</>;
}

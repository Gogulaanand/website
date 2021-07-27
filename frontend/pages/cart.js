import { useContext } from "react";
import dynamic from "next/dynamic";

import AppContext from "../context/AppContext";
const FilledCart = dynamic(() => import("../components/cart/filledCart"));
const EmptyCart = dynamic(() => import("../components/cart/emptyCart"));

export default function Cart() {
  const { cart } = useContext(AppContext);
  return <>{cart.totalQuantity > 0 ? <FilledCart /> : <EmptyCart />}</>;
}

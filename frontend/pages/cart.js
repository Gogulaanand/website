import { useContext } from "react";
import AppContext from "../context/AppContext";
import FilledCart from "../components/cart/filledCart";
import EmptyCart from "../components/cart/emptyCart";

export default function Cart() {
  const { cart } = useContext(AppContext);
  return <>{cart.totalQuantity > 0 ? <FilledCart /> : <EmptyCart />}</>;
}

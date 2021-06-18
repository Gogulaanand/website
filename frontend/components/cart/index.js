import React, { useContext } from "react";
import { useRouter } from "next/router";
import CartItem from "./itemCard";
import AppContext from "../../context/AppContext";

function CartIndex() {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { cart, isAuthenticated } = appContext;
  return (
    <>
      <div className="grid grid-cols-6 w-4/5 lg:my-24 min-h-screen">
        <div className="col-span-1"></div>
        <div className="col-span-4">
          <h1 className="text-2xl font-semibold lg:ml-2">Shopping cart</h1>
          <div className="flex flex-col overflow-auto">
            {appContext.cart.items &&
              appContext.cart.items.map((item) => {
                return <CartItem data={item} key={item.id} />;
              })}
          </div>
        </div>
        <div className="col-span-1"></div>
      </div>
    </>
  );
}

export default CartIndex;

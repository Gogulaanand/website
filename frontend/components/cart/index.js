import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AppContext from "../../context/AppContext";

function CartIndex() {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { cart, isAuthenticated } = appContext;
  return (
    <>
      <div className="grid grid-cols-6 w-4/5 h-screen lg:mt-32">
        <div className="col-span-1"></div>
        <div className="col-span-4">
          <h1 className="text-2xl font-semibold lg:ml-2">Shopping cart</h1>
        </div>
        <div className="col-span-1"></div>
      </div>
    </>
  );
}

export default CartIndex;

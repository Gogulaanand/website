import React, { useContext } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import CartItem from "./itemCard";
import AppContext from "../../context/AppContext";
import Link from "next/link";

export default function FilledCart() {
  const appContext = useContext(AppContext);
  const { cart } = appContext;

  return (
    <div className="grid grid-cols-6 w-4/5 min-h-screen lg:mt-24 mt-12 lg:mx-0 mx-auto">
      <div className="lg:col-span-1 hidden lg:block"></div>
      <div className="lg:col-span-4 col-span-6">
        <div className="flex flex-col overflow-auto">
          <h1 className="font-semibold text-2xl">Shopping cart</h1>
          {cart.items &&
            cart.items.map((item) => {
              return <CartItem data={item} key={item.id} />;
            })}

          <div className="flex justify-between">
            <div className="cursor-pointer space-x-2 md:visible invisible md:flex">
              <ArrowLeftOutlined className="mt-1" />
              <Link href="/products" passHref>
                <p className="md:text-lg sm:text-md font-semibold transition-colors duration-200 hover:text-deep-purple-400">
                  Continue Shopping
                </p>
              </Link>
            </div>

            <p className="md:mt-0 mt-2 font-semibold">
              Subtotal: {cart.totalAmount}
            </p>
          </div>
        </div>
      </div>
      <div className="lg:col-span-1 hidden lg:block"></div>
    </div>
  );
}

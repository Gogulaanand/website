import React, { useContext } from "react";
import { useRouter } from "next/router";
import { ArrowLeftOutlined } from "@ant-design/icons";
import CartItem from "../components/cart/itemCard";
import AppContext from "../context/AppContext";
import Link from "next/link";

export default function Cart() {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { cart, isAuthenticated } = appContext;
  return (
    <>
      <div className="grid grid-cols-6 w-4/5 lg:my-24 min-h-screen">
        <div className="col-span-1"></div>
        <div className="col-span-4">
          <div className="flex flex-col overflow-auto">
            <h1 className="text-2xl font-semibold lg:ml-2">Shopping cart</h1>

            {appContext.cart.items &&
              appContext.cart.items.map((item) => {
                return <CartItem data={item} key={item.id} />;
              })}

            <div>
              <Link href="/products">
                <a className="flex cursor-pointer space-x-2" href="/products">
                  <ArrowLeftOutlined className="mt-1" />
                  <p className="text-lg">Continue Shopping</p>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-1"></div>
      </div>
    </>
  );
}

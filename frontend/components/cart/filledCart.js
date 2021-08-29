import { useContext } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import { loadStripe } from "@stripe/stripe-js/pure";
import Link from "next/link";
import { useRouter } from "next/router";

import CartItem from "./itemCard";
import AppContext from "@/context/AppContext";
import AuthContext from "@/context/AuthContext";

let stripePromise;
export default function FilledCart() {
  const { cartItems, totalAmount } = useContext(AppContext);
  const { user, getToken } = useContext(AuthContext);
  const router = useRouter();

  const redirectToLogin = () => {
    router.push("/login");
  };

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);
    }
    return stripePromise;
  };

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const token = await getToken();

    const products = cartItems.map((item) => {
      return { id: item.id, quantity: item.quantity };
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      method: "POST",
      body: JSON.stringify({ products }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const session = await res.json();

    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 mt-16">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="flex flex-col overflow-auto divide-y divide-gray-200 w-full lg:pr-5">
          <h1 className="font-semibold text-2xl mb-12">Shopping cart</h1>
          {cartItems &&
            cartItems.map((item) => {
              return <CartItem data={item} key={item.id} />;
            })}
          <hr />
          <div className="flex justify-between mb-24 hidden lg:block">
            <div className="cursor-pointer space-x-2 md:visible hidden md:flex mt-8">
              <ArrowLeftIcon className="mt-1 w-5 h-5" />
              <Link href="/products" passHref>
                <a className="md:text-lg sm:text-md font-semibold transition-colors duration-200 hover:text-deep-purple-400">
                  Continue Shopping
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:self-start mt-8 lg:mt-0">
          <div className="flex flex-col bg-gray-100 max-h-96 w-96 rounded-md">
            <div className="p-8">
              <span className="font-semibold">Order summary</span>
              <div className="divide-gray-400 divide-y">
                <p className="text-gray-700 flex justify-between -py-2 mt-4 py-4">
                  <span>Subtotal </span>
                  <span className="font-semibold">&#x20b9; {totalAmount}</span>
                </p>
                <p className="text-gray-700 flex justify-between py-4">
                  <span>Shipping estimate </span>
                  <span className="font-semibold">&#x20b9; {125}</span>
                </p>
                <p className="text-gray-700 flex justify-between py-4">
                  <span>Tax estimate </span>
                  <span className="font-semibold">
                    &#x20b9; {totalAmount * 0.18}
                  </span>
                </p>
                <p className="flex justify-between font-semibold py-4">
                  <span>Order total</span>
                  <span>&#x20b9; {totalAmount * 1.18 + 125}</span>
                </p>
              </div>
              <div className="flex justify-center mt-3">
                {!user && (
                  <p
                    onClick={redirectToLogin}
                    className="h-12 px-8 py-4 w-full justify-center border border-transparent bg-gray-800 rounded-md inline-flex items-center text-base text-white leading-6 shadow-md cursor-pointer bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700"
                  >
                    Login to Checkout
                  </p>
                )}
                {user && (
                  <p
                    onClick={handleCheckout}
                    className="h-12 px-8 py-4 w-full justify-center border border-transparent bg-gray-800 rounded-md inline-flex items-center text-base text-white leading-6 shadow-md cursor-pointer bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700"
                  >
                    Checkout
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-24 block lg:hidden">
            <div className="cursor-pointer space-x-2 md:flex flex-col mt-8">
              <p className="text-center">or</p>
              <div className="flex mt-2">
                <Link href="/products" passHref>
                  <a className="md:text-lg sm:text-md font-semibold transition-colors duration-200 hover:text-deep-purple-400">
                    Continue Shopping
                  </a>
                </Link>
                <ArrowRightIcon className="mt-1 ml-2 w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

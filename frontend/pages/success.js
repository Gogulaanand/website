import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { RefreshIcon } from "@heroicons/react/outline";

import AppContext from "@/context/AppContext";

const useOrder = (session_id) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const { session, updateCart, setTotalAmount, setTotalQuantity } =
    useContext(AppContext);
  const token = session?.jwt;
  const user = session?.user?.email;

  useEffect(() => {
    if (user) {
      const fetchOrder = async () => {
        setLoading(true);
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/orders/confirm`,
            {
              method: "POST",
              body: JSON.stringify({ checkout_session: session_id }),
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await res.json();
          setOrder(data);
          if (data) {
            updateCart([]);
            setTotalQuantity(0);
            setTotalAmount(0);
          }
        } catch (err) {
          setOrder(null);
          throw new Error("Order confirmation failed");
        }
        setLoading(false);
      };
      fetchOrder();
    }
  }, [user, session_id]);

  return { order, loading };
};

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;
  const { order, loading } = useOrder(session_id);

  return (
    <>
      <Head>
        <title>Payment success</title>
        <meta name="description" content="Thank you for the purchase" />
      </Head>
      <div className="lg:my-12 md:my-8 sm:my-6 h-screen w-4/5 text-center mx-auto">
        {loading && (
          <div className="mt-24 mx-auto">
            <RefreshIcon className="mx-auto w-12 h-12 animate-spin" />
            <h1 className="font-bold text-2xl mt-3 ml-3">
              We&apos;re confirming your purchase !
            </h1>
          </div>
        )}
        {!loading && order && (
          <div className="mx-auto flex-col w-4/5 text-center">
            <Image
              src="/success-confetti.gif"
              alt="payment success confetti"
              className="mx-auto"
              width={400}
              height={400}
            ></Image>
            <p className="font-bold text-xl">
              Your order was processed successfully !
            </p>
            <p className="font-semibold text-lg mt-6">
              Order id: <br />
              {order.order_id}{" "}
            </p>
            <div className="mt-6 flex-col place-content-between">
              <Link href="/account" passHref>
                <a className="text-blue-500">View Orders</a>
              </Link>
              <hr className="w-72 mx-auto my-8" />
              <Link href="/products" passHref>
                <a className="text-blue-500">Continue Shopping</a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

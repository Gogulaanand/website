import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Spin, Divider } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import AuthContext from "@/context/AuthContext";
import AppContext from "@/context/AppContext";

const useOrder = (session_id) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getToken, user } = useContext(AuthContext);
  const { updateCart } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      const fetchOrder = async () => {
        setLoading(true);
        try {
          const token = await getToken();
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
            updateCart({
              items: [],
              totalAmount: 0,
              totalQuantity: 0,
            });
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

  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />;

  return (
    <>
      <Head>
        <title>Payment success</title>
        <meta name="description" content="Thank you for the purchase" />
      </Head>
      <div className="lg:my-24 md:my-16 sm:my-12 h-screen w-4/5 text-center mx-auto">
        {loading && (
          <div className="mt-24">
            <Spin indicator={antIcon} />
            <h1 className="font-bold text-2xl mt-8">
              We&apos;re confirming your purchase !
            </h1>
          </div>
        )}
        {!loading && order && (
          <div className="mx-auto flex-col w-4/5 mt-4 text-center">
            <img
              src="/success-confetti.gif"
              alt="payment success confetti"
              className="mx-auto"
            ></img>
            <p className="font-bold text-xl">
              Your order was processed successfully !
            </p>
            <p className="font-semibold text-lg mt-6">
              Order id: <br />
              {order.order_id}{" "}
            </p>
            <div className="mt-6">
              <Link href="/account" passHref>
                <a className="text-blue-500">View Orders</a>
              </Link>
              <Divider />
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

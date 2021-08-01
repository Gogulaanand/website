import { useState, useEffect, useContext, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import AuthContext from "../context/AuthContext";
import AppContext from "../context/AppContext";

const useOrder = (session_id) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getToken, user } = useContext(AuthContext);
  const { updateCart } = useContext(AppContext);

  const fetchOrder = useCallback(async () => {
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
  }, [getToken, session_id, updateCart]);

  useEffect(() => {
    if (user) {
      fetchOrder();
    }
  }, [user, fetchOrder]);

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
          <>
            <Spin indicator={antIcon} />
            <h1 className="font-bold text-2xl">
              We&apos;re confirming your purchase!
            </h1>
          </>
        )}
        {!loading && order && (
          <h1 className="font-bold text-2xl">
            Your order was processed successfully! Order id: {order.order_id}
            <Link href="/account">View Orders</Link>
          </h1>
        )}
      </div>
    </>
  );
}

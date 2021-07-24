import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import AuthContext from "../context/AuthContext";

const useOrder = (session_id) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getToken, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const fetchOrder = async () => {
        setLoading(true);
        try {
          const token = await getToken();
          const res = await fetch(`${API_URL}/orders/confirm`, {
            method: "POST",
            body: JSON.stringify({ checkout_session: session_id }),
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();
          setOrder(data);
        } catch (err) {
          setOrder(null);
          throw new Error("Order confirmation failed");
        }
        setLoading(false);
      };
      fetchOrder();
    }
  }, [user, session_id, getToken]);

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
      <div>
        <h2>Hold on!</h2>
        {loading && <p>We&apos;re confirming your purchase!</p>}
        {!loading && order && (
          <p>
            Your order was processed successfully!{" "}
            <Link href="/account">View Orders</Link>
          </p>
        )}
      </div>
    </>
  );
}

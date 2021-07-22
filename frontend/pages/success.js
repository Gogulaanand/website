import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const useOrder = (session_id) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/confirm`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ checkout_session: session_id }),
          }
        );

        const data = await res.json();
        console.log(data);
        setOrder(data);
      } catch (err) {}
      setLoading(false);
    };
    fetchOrder();
  }, [session_id]);

  return { order, loading };
};

export default function success() {
  const router = useRouter();
  const { session_id } = router.query;

  const { order, loading } = useOrder(session_id);
  return (
    <>
      <Head>
        <title>Payment success</title>
        <meta type="description" content="Thank you for your purchase" />
      </Head>
      <h1>Success !!</h1>
      <h2>Thank you for your purchase</h2>

      {loading && <p>Loading...</p>}
      {order && <p>Your order number no is : {order.id}</p>}
    </>
  );
}

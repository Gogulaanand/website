import Head from "next/head";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";

const useOrders = (user, getToken) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          setLoading(true);
          const token = await getToken();
          const order_res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/orders`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await order_res.json();
          setOrders(data);
        } catch (err) {
          setOrders([]);
          throw new Error("Unable to fetch orders");
        }
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, getToken]);
  return { orders, loading };
};

export default function Account() {
  const { user, logoutUser, getToken } = useContext(AuthContext);

  const { orders, loading } = useOrders(user, getToken);

  if (!user) {
    return (
      <div>
        <p>Please login or register</p>
      </div>
    );
  }
  return (
    <>
      <div>
        <Head>
          <title>Sunfabb - Account</title>
          <meta
            type="description"
            content="Your sunfabb account section"
          ></meta>
        </Head>

        <h1>Account page</h1>

        <h3>Your orders</h3>

        {loading && <p>Loading your orders...</p>}
        {orders.map((order) => (
          <div key={order.id}>
            {new Date(order.createdAt).toLocaleDateString("en-EN")}{" "}
            {order.product.name} Rs.{order.total} {order.status}
          </div>
        ))}

        <hr />

        <p>Logged in as: {user}</p>
        <a href="#" onClick={logoutUser}>
          Logout
        </a>
      </div>
    </>
  );
}

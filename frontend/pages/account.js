import Head from "next/head";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import AuthContext from "@/context/AuthContext";

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
  }, [user]);
  return { orders, loading };
};

export default function Account() {
  const { user, logoutUser, getToken } = useContext(AuthContext);

  const { orders, loading } = useOrders(user, getToken);

  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />;

  if (!user) {
    return (
      <div>
        <Link href="/login" passHref>
          <a>Please login or register</a>
        </Link>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Account</title>
        <meta
          type="description"
          content="Your sunfabb account section with details of customer name, past orders, and logout option"
        ></meta>
      </Head>
      <div className="mx-auto h-screen w-4/5 text-center">
        <div className="lg:my-24 md:my-16 sm:my-12">
          <h1 className="font-2xl font-bold mt-12">Account page</h1>

          <h3 className="my-8 font-xl font-semibold">Your orders</h3>

          {loading && (
            <>
              <Spin indicator={antIcon} />
              <h1 className="font-bold text-lg">Loading your orders...</h1>
            </>
          )}
          {orders.map((order) => (
            <div key={order.id}>
              <span>
                {new Date(order.createdAt).toLocaleDateString("en-EN")}
              </span>
              <span>{order.total ? `Rs. ${order.total}` : null}</span>
              <span>{order.status}</span>
            </div>
          ))}
        </div>
        <p className="my-2 mx-4">Logged in as: {user}</p>
        <Button href="#" onClick={logoutUser} className="my-2 mx-4">
          Logout
        </Button>
      </div>
    </>
  );
}

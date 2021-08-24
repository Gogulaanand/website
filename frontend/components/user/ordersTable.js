import { useContext, useState, useEffect } from "react";
import { Table, Tag, Skeleton, Empty } from "antd";

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

export default function OrdersTable() {
  const { user, getToken } = useContext(AuthContext);

  const { orders, loading } = useOrders(user, getToken);

  const ordersData = orders.map((order, index) => {
    return {
      key: index,
      date: new Date(order.createdAt).toLocaleDateString("en-EN"),
      order_id: order.id,
      amount: order.total,
      status: [order.status],
    };
  });

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: function Date(text) {
        return <a>{text}</a>;
      },
    },
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: function Status(status) {
        return (
          <>
            {status.map((tag, index) => {
              let color = tag === "paid" ? "green" : "volcano";
              return (
                <Tag color={color} key={`${tag}_${index}`}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: function View() {
        return <a>View</a>;
      },
    },
  ];

  return (
    <>
      <div className="mx-auto flex-col w-4/5 text-center">
        <h3 className="my-4 font-xl font-semibold">Your orders</h3>
        <Table
          columns={columns}
          dataSource={loading ? [] : ordersData}
          locale={{ emptyText: loading ? <Skeleton active /> : <Empty /> }}
        />
      </div>
    </>
  );
}

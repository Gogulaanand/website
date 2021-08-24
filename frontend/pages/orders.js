import OrdersTable from "@/components/user/ordersTable";

export default function Order() {
  return (
    <>
      <OrdersTable columns={["order_id", "action"]} />
    </>
  );
}

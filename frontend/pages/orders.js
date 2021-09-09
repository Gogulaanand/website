import OrdersTable from "@/components/user/ordersTable";
import ErrorBoundary from "@/components/index/errorBoundary";

export default function Order() {
  return (
    <>
      <ErrorBoundary>
        <OrdersTable columns={["order_id", "action"]} />
      </ErrorBoundary>
    </>
  );
}

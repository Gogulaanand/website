import { useContext } from "react";
import Head from "next/head";
import AppContext from "@/context/AppContext";
import FilledCart from "@/components/cart/filledCart";
import EmptyCart from "@/components/cart/emptyCart";
import ErrorBoundary from "@/components/index/errorBoundary";

export default function Cart() {
  const { totalQuantity } = useContext(AppContext);
  return (
    <>
      <Head>
        <title>Cart</title>
        <meta
          type="description"
          content="Cart page which lists all of the sunfabb items that the customer intends to bug or order online and get it delivered"
        />
      </Head>
      {totalQuantity > 0 ? (
        <ErrorBoundary>
          <FilledCart />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary>
          <EmptyCart />
        </ErrorBoundary>
      )}
    </>
  );
}

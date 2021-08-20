import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="flex flex-col w-3/5 min-h-screen mx-auto">
      <div className="mx-auto mt-32 flex flex-col items-center">
        <h1 className="font-bold text-2xl mt-16 mb-8 text-center">
          Your cart is empty.
        </h1>
        <Link href="/products" passHref>
          <a
            className="cursor-pointer inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 hover:text-white focus:shadow-outline focus:outline-none rounded-xl"
            aria-label="Start Shopping"
            title="Start Shopping"
          >
            Continue Shopping
          </a>
        </Link>
      </div>
    </div>
  );
}

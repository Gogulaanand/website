import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="flex flex-col w-3/5 min-h-screen md:mt-24 mx-auto">
      <div className="mx-auto my-auto">
        <Link href="/products">
          <a
            className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 hover:text-white focus:shadow-outline focus:outline-none"
            aria-label="Start Shopping"
            title="Start Shopping"
            href="/products"
          >
            Start Shopping...
          </a>
        </Link>
      </div>
    </div>
  );
}

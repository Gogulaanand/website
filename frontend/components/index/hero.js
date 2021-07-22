import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="relative bg-white overflow-hidden">
        <div className="relative pt-6 container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="mt-10 mx-auto max-w-4xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28 sm:text-center">
            <h1 className="text-5xl tracking-tight leading-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-none md:text-5xl lg:text-6xl xl:text-7xl">
              Your one stop solution for
              <br className="hidden md:block" />{" "}
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 py-1">
                high quality fabrics
              </span>
            </h1>
            <p className="mt-12 text-xl sm:text-2xl leading-tight font-medium text-gray-700 max-w-4xl mx-auto ">
              We have decades of experience in manufacturing fabrics in large
              scale and delivering within India and overseas. We take pride in
              the quality of our products. Check out our array of existing
              products and contact us for bulk orders and custom orders.
            </p>
            <div className="pt-6 pb-24 sm:text-center mx-auto md:mt-8">
              <Link href="/products" passHref>
                <a className="inline-flex items-center justify-center h-12 px-8 py-3 border border-transparent text-base leading-6 font-semibold rounded-full text-white shadow-md bg-gray-800 hover:hoverbg-gray-900 focus:outline-none focus:border-blue-700 cursor-pointer hover:text-white transition duration-150 ease-in-out md:py-3 md:text-lg md:px-10">
                  Explore Products
                  <svg
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    height="1em"
                    width="1em"
                    className="-mr-1 ml-3"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </Link>
              <Link href="/#contact" passHref>
                <a
                  aria-label=""
                  className="inline-flex items-center justify-center text-base leading-6 font-semibold transition duration-150 ease-in-out md:py-3 md:text-lg px-3 md:px-10 text-gray-800 cursor-pointer hover:text-gray-800"
                >
                  Contact Us
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

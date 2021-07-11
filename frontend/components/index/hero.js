import Link from "next/link";
export default function Hero() {
  return (
    <div className="relative px-4 pt-16 mx-auto lg:py-32 md:px-8 xl:px-10 sm:max-w-xl md:max-w-full lg:h-screen">
      <div className="max-w-xl mx-auto lg:max-w-screen-xl">
        <div className="mb-16 lg:max-w-lg lg:mb-0 lg:mt-32">
          <div className="max-w-xl mb-6">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              The quick, brown fox
              <br className="hidden md:block" />
              jumps over{" "}
              <span className="inline-block text-deep-purple-accent-400">
                a lazy dog
              </span>
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae. explicabo.
            </p>
          </div>
          <div className="flex items-center">
            <Link href="/products" passHref>
              <a className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded-full shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none cursor-pointer">
                Explore
              </a>
            </Link>
            <Link href="/#contact" passHref>
              <a
                aria-label=""
                className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800 cursor-pointer"
              >
                Contact Us
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center h-full overflow-hidden lg:w-2/3 xl:w-1/2 lg:absolute lg:justify-start lg:bottom-0 lg:right-0 lg:items-center lg:mb-32">
        <img
          src="https://kitwind.io/assets/kometa/full-browser.png"
          className="object-cover object-top w-4/5 h-64 max-w-xl -mb-16 rounded shadow-2xl lg:ml-32 xl:ml-4 lg:-mb-24 xl:-mb-28 lg:h-auto lg:max-w-screen-md"
          alt=""
        />
      </div>
    </div>
  );
}

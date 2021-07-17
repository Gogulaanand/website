import Link from "next/link";
import Image from "next/image";
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
              <span className="inline-block text-transparent bg-clip-text bg-gradient-r from-gradientBlue via-gradientPink to-gradientRed">
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
              <a className="inline-flex items-center justify-center h-12 px-8 py-3 border border-transparent text-base leading-6 font-semibold rounded-full text-white shadow-md bg-deep-purple-accent-400 cursor-pointer hover:text-white transition duration-150 ease-in-out md:py-3 md:text-lg md:px-10">
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
                className="inline-flex items-center text-base leading-6 font-semibold transition duration-150 ease-in-out md:py-3 md:text-lg md:px-10 text-deep-purple-accent-400 cursor-pointer hover:text-deep-purple-accent-400"
              >
                Contact Us
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center h-full overflow-hidden lg:w-2/3 xl:w-1/2 lg:absolute lg:justify-start lg:bottom-0 lg:right-0 lg:items-center lg:mb-32">
        <Image
          src="/full-browser.jpeg"
          className="object-cover object-top w-4/5 h-64 max-w-xl -mb-16 rounded shadow-2xl lg:ml-32 xl:ml-4 lg:-mb-24 xl:-mb-28 lg:h-auto lg:max-w-screen-md"
          alt=""
          width={700}
          height={550}
        />
      </div>
    </div>
  );
}

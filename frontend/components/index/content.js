import Image from "next/image";
import Link from "next/link";
export default function Content() {
  return (
    <div className="lg:my-16 md:my-12 sm:my-8 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:w-4/5 md:px-24 lg:px-8 lg:py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex items-center justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
          <div className="flex flex-col items-end px-3">
            <div className="mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56 relative">
              <Image
                src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40 relative">
              <Image
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="px-3 w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80 relative">
            <Image
              alt=""
              layout="fill"
              objectFit="cover"
              src="https://images.pexels.com/photos/3182739/pexels-photo-3182739.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center md:-mx-4 lg:pl-8">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-accent-400">
            <svg className="text-teal-900 w-7 h-7" viewBox="0 0 24 24">
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                points=" 8,5 8,1 16,1 16,5"
                strokeLinejoin="round"
              />
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                points="9,15 1,15 1,5 23,5 23,15 15,15"
                strokeLinejoin="round"
              />
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                points="22,18 22,23 2,23 2,18"
                strokeLinejoin="round"
              />
              <rect
                x="9"
                y="13"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                width="6"
                height="4"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="max-w-xl mb-6">
            <h1 className="max-w-lg mb-6 font-sans font-bold tracking-tight leading-tight text-gray-900 text-5xl">
              Tell us about your
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                design & requirement
              </span>
            </h1>
            <p className="text-base text-gray-700 md:text-lg">
              We handle design, procuring high quality raw materials,
              manufacturing and shipping custom ordered fabrics in large scale.
              We cater to customers within and outside India.
            </p>
          </div>
          <div>
            <Link href="/products" passHref>
              <a
                aria-label="view products"
                title="Check out our products"
                className="inline-block text-base leading-6 font-semibold transition duration-150 ease-in-out md:py-3 md:text-lg text-gray-800 cursor-pointer hover:text-gray-800"
              >
                Check out our products
                <svg
                  className="inline-block w-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

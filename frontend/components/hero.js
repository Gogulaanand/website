import Image from "next/image";
import hand from "../media/ok-hand.png";

export default function Hero() {
  return (
    <div className="home flex-col justify-center h-screen">
      <div className="flex">
        <div className="lg:m-72 md:m-48 sm:m-32 flex-col relative">
          <p className="lg:text-6xl md:text-4xl sm:text-2xl animate-fadeInUp text-start bg-clip-text font-bold text-gradient bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600 text-transparent">
            Lorem ipsum dolor sit amet.
          </p>
          <p className="lg:text-3xl md:text-2xl sm:text-xl animate-fadeInUp text-start mt-7">
            Duis aute irure dolor in reprehenderit
          </p>
          <div
            className="flex cursor-pointer mt-16"
            onClick={() => {
              var elem = document.getElementById("home-gallery");
              elem.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <p className="lg:text-xl md:text-base sm:text-sm hover:underline animate-fadeInUp">
              Checkout products
            </p>
            <svg
              className="animate-bounce w-6 h-6 text-amber-900"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
        <div className="flex w-max h-max absolute lg:inset-y-0 lg:right-0 animate-fadeInUp">
          <Image
            src={hand}
            height={800}
            width={500}
            className="animate-fadeIn"
          ></Image>
        </div>
      </div>
    </div>
  );
}

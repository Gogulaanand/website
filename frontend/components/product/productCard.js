import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

const ProductCard = (props) => {
  return (
    <>
      <Link href={`/products/${props.data.id}`} passHref>
        <div className="relative overflow-hidden p-px transition-shadow duration-300 bg-white rounded-sm shadow-sm hover:scale-105 group hover:shadow-xl cursor-pointer">
          <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-indigo-600 group-hover:scale-x-100"></div>
          <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-indigo-600 group-hover:scale-y-100"></div>
          <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-indigo-600 group-hover:scale-x-100"></div>
          <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-indigo-600 group-hover:scale-y-100"></div>
          <div className="relative bg-white rounded-sm">
            <div className="object-cover w-full h-64 relative">
              <Image
                src={`${props.data.cover.url}`}
                layout="fill"
                objectFit="cover"
                alt={`Image of ${props.data.name}`}
              />
            </div>
            <div className="p-5 border border-t-0">
              <p
                aria-label="product"
                title={props.data.name}
                className="inline-block mb-3 text-2xl font-bold leading-5"
              >
                {props.data.name}
              </p>
              <p className="mb-2 text-gray-700">{props.data.description}</p>
              <p className="font-semibold text-lg">
                &#x20b9; {props.data.price}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default memo(ProductCard);

import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";

import AppContext from "../../context/AppContext";

export default function ProductCard(props) {
  const { enableCart, addItem } = useContext(AppContext);
  return (
    <>
      <div className="relative overflow-hidden p-px transition-shadow duration-300 bg-white rounded-sm shadow-sm hover:scale-105 group hover:shadow-xl">
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
              alt=""
            />
          </div>
          <div className="p-5 border border-t-0">
            <a
              href={`/products/${props.data.id}`}
              aria-label="product"
              title={props.data.name}
              className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
            >
              {props.data.name}
            </a>
            <p className="mb-2 text-gray-700">{props.data.description}</p>
            <Link href={`/products/${props.data.id}`} passHref>
              <a
                aria-label="view product"
                className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                View
              </a>
            </Link>
            {enableCart ? (
              <button
                aria-label="add to cart"
                className="absolute bottom-0 right-0 mb-4 mr-4 inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                onClick={() =>
                  addItem({
                    id: props.data.id,
                    price: props.data.price,
                  })
                }
              >
                Add to cart
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

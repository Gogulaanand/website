import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

const ProductCard = (props) => {
  return (
    <>
      <Link href={`/products/${props.data.id}`} passHref>
        <div className="relative overflow-hidden p-px transition-shadow duration-300 bg-white rounded-sm shadow-sm hover:scale-105 group hover:shadow-xl cursor-pointer">
          <div className="relative bg-white rounded-sm">
            <div className="object-cover relative">
              <Image
                src={`${props.data.cover.url}`}
                width={550}
                height={350}
                objectFit="cover"
                alt={`Image of ${props.data.name}`}
              />
            </div>
            <div className="p-5">
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

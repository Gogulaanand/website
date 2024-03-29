import { memo } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Link from "next/link";
import { Skeleton } from "antd";
import ItemControls from "@/components/cart/itemControls";

const QUERY = gql`
  {
    products {
      id
      name
      description
      price
      cover {
        name
        url
        formats
      }
    }
  }
`;

const CartItem = (props) => {
  var { loading, error, data } = useQuery(QUERY);

  if (error) return <p className="m-auto">Error fetching products</p>;
  if (loading)
    return (
      <Skeleton active avatar paragraph={{ rows: 4 }} className="w-full" />
    );
  if (data.products && data.products.length) {
    const item = data.products.find((i) => props.data.id === i.id);
    return (
      <>
        <div className="divide-y divide-gray-700">
          <div className="flex flex-col md:flex-row md:justify-between my-8">
            <Link href={`/products/${item.id}`} passHref>
              <img
                src={`${item.cover.url}`}
                className="object-cover h-48 w-48 cursor-pointer"
                alt={`Image of ${item.name}`}
              />
            </Link>
            <div className="md:px-5 pt-2">
              <Link href={`/products/${item.id}`} passHref>
                <a
                  aria-label="product"
                  title={item.name}
                  className="cursor-pointer inline-block mb-3 md:text-lg sm:text-md font-semibold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
                >
                  {item.name}
                </a>
              </Link>
              <p className="font-semibold">&#x20b9; {item.price}</p>
            </div>
            <ItemControls item={item} data={props.data} className="self-end" />
          </div>
        </div>
      </>
    );
  }
};

export default memo(CartItem);

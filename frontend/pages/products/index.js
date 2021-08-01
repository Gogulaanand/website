import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import dynamic from "next/dynamic";
import Head from "next/head";

import ProductCard from "../../components/product/productCard";
const Fetching = dynamic(() => import("../../components/svg/SvgFetching"));

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

export default function Products() {
  var { loading, error, data } = useQuery(QUERY);

  if (error) return <p className="m-auto">Error fetching products</p>;
  if (loading)
    return (
      <div className="h-screen">
        <Fetching />
      </div>
    );
  if (data.products && data.products.length) {
    return (
      <>
        <Head>
          <title>Products</title>
          <meta
            type="description"
            content="Products page of sunfabb listing all the products offered by the company and available to purchase online"
          />
        </Head>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
            {data.products.map((res) => (
              <ProductCard key={res.id} data={res} />
            ))}
          </div>
        </div>
      </>
    );
  }

  return <h1>Product Inventory seem to be empty at the moment !!</h1>;
}

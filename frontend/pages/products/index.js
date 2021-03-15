import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import dynamic from "next/dynamic";
const Fetching = dynamic(() => import("../../components/svg/SvgFetching"));
import ProductCard from "../../components/productCard";

const QUERY = gql`
  {
    products {
      id
      name
      description
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
  if (loading) return <Fetching />;
  if (data.products && data.products.length) {
    return (
      <>
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

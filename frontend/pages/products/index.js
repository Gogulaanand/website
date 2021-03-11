import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import dynamic from "next/dynamic";
const Fetching = dynamic(() => import("../../components/svg/SvgFetching"));

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
        <div className="mx-auto mt-36 grid grid-cols-3 grid-space-4 w-4/5">
          {data.products.map((res) => (
            <Card
              className="lg:w-80 md:w-64 sm:w-44 mb-32 ml-16 shadow-md animate-fadeInUp"
              key={res.id}
            >
              <Card.Img
                variant="top"
                src={`${process.env.NEXT_PUBLIC_API_URL}${res.cover.url}`}
                className="lg:w-80 lg:h-72 md:w-64 md:h-60 sm:w-44 sm:h-40"
              />
              <Card.Body>
                <Card.Title>{res.name}</Card.Title>
                <Card.Text>{res.description}</Card.Text>
                <Link
                  href={`/products/${res.id}`}
                  // as={`/products/${res.name.replace(/\s/g, "-")}`}
                  passHref
                >
                  <Button
                    className="mt-6 cursor-pointer"
                    variant="primary"
                    as="a"
                  >
                    View
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </>
    );
  }

  return <h1>Product Inventory seem to be empty at the moment !!</h1>;
}

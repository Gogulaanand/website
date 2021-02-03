import { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Loading from "../../components/product/loading";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

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
  useEffect(() => {
    AOS.init({
      duration: 750,
      useClassNames: true,
      initClassName: true,
      animatedClassName: "animated",
    });
  }, []);

  var { loading, error, data } = useQuery(QUERY);

  if (error) return <p className="m-auto">Error fetching products</p>;
  if (loading) return <Loading />;
  if (data.products && data.products.length) {
    return (
      <>
        <div className="mx-auto mt-36 grid grid-cols-3 grid-space-4 w-4/5">
          {data.products.map((res) => (
            <Card
              className="lg:w-80 md:w-64 sm:w-44 mb-32 ml-16"
              data-aos="animate-fadeInUp"
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
                <Link href={`/products?id=${res.id}`} passHref>
                  <Button className="mt-6">View</Button>
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

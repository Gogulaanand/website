import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

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

function ProductsList(props) {
  const { loading, error, data } = useQuery(QUERY);
  if (error) return <p className="m-auto">Error fetching products</p>;
  if (loading) return <h1 className="m-auto">Fetching...</h1>;
  if (data.products && data.products.length) {
    console.log("success");
  }
  return (
    <>
      <div className="mx-auto mt-36 grid grid-cols-3 grid-space-6 w-4/5">
        {data.products.map((res) => (
          <Card className="lg:w-80 md:w-64 sm:w-44 mb-32">
            <Card.Img
              variant="top"
              src={`${process.env.NEXT_PUBLIC_API_URL}${res.cover.url}`}
              className="lg:w-80 lg:h-72 md:w-64 md:h-60 sm:w-44 sm:h-40"
            />
            <Card.Body>
              <Card.Title>{res.name}</Card.Title>
              <Card.Text>{res.description}</Card.Text>
              <Button variant="primary">View</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

export default ProductsList;

import { gql, ApolloLink } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";

// Instantiate apollo client constructor
const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const client = new ApolloClient({
  // required constructor fields
  cache: cache,
  link: ApolloLink.from([errorLink, httpLink]),
  // optional constructor fields
  name: "react-web-client",
  version: "1.3",
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

// get_static_paths query & function
const GET_ALL_QUERY = gql`
  {
    products {
      id
    }
  }
`;
export async function getStaticPaths() {
  const paths = await client
    .query({
      query: GET_ALL_QUERY,
    })
    .then((data) => {
      const productsData = data.data.products;
      if (productsData.length) {
        return productsData.map((res) => {
          return { params: { id: res.id } };
        });
      }
    })
    .catch((err) => console.log(err));
  return {
    paths,
    fallback: false,
  };
}

// get_static_props query & function
const GET_ONE_QUERY = gql`
  query($id: ID!) {
    product(id: $id) {
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
export async function getStaticProps({ params }) {
  try {
    const res = await client.query({
      query: GET_ONE_QUERY,
      variables: { id: params.id },
    });
    return {
      props: res.data.product,
    };
  } catch (err) {
    console.log(err);
  }
}

export default function ProductDetail(props) {
  return (
    <>
      <div className="mx-auto w-4/5 mt-32">
        <div className="grid grid-cols-2 gap-6">
          <div className="productCarousel">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${props.cover.url}`}
              alt={`Image of ${props.name}`}
            />
          </div>
          <div className="productIntro flex-col">
            <h1>{props.name}</h1>
            <h2>{props.description}</h2>
          </div>
        </div>
      </div>
    </>
  );
}

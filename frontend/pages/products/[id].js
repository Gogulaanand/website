import { memo, useContext } from "react";
import { gql, ApolloLink } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import ImageGallery from "react-image-gallery";
import AppContext from "../../context/AppContext";

// Instantiate apollo client constructor
const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message }) => {
      throw new Error(message);
    });
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
      fetchPolicy: "cache-first",
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
    .catch((err) => Promise.reject(new Error(err)));
  return {
    paths,
    fallback: false,
  };
}

// get_static_props query & function
const GET_ONE_QUERY = gql`
  query ($id: ID!) {
    product(id: $id) {
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
    throw new Error(err);
  }
}

const ProductDetail = (props) => {
  const { enableCart, addItem } = useContext(AppContext);

  const images = [
    {
      original: `${props.cover.formats.medium.url}`,
      thumbnail: `${props.cover.formats.medium.url}`,
    },
    {
      original: `${props.cover.formats.medium.url}`,
      thumbnail: `${props.cover.formats.medium.url}`,
    },
  ];

  return (
    <>
      <div className="mx-auto w-4/5 mt-32 justify-center">
        <div className="lg:grid lg:grid-cols-2 lg:gap-6 h-screen">
          <div className="productCarousel">
            <ImageGallery
              items={images}
              lazyLoad={true}
              showNav={false}
              showPlayButton={false}
              thumbnailPosition="left"
              slideOnThumbnailOver={true}
            />
          </div>
          <div className="productIntro flex-col text-left lg:ml-16 md:ml-32 mt-12 sm:ml-24 lg:mt-2">
              <h2 className="mr-3">Price:</h2>
              <i className="fa fa-inr mt-1"></i>
              <p className="ml-1">{props.price}</p>
            </div>
            {enableCart ? (
              <button
                type="submit"
                onClick={() =>
                  addItem({
                    id: props.id,
                    price: props.price,
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
};

export default memo(ProductDetail);

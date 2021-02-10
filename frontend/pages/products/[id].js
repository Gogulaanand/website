import { gql, ApolloLink } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import ImageGallery from "react-image-gallery";

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
  const images = [
    {
      original: `${process.env.NEXT_PUBLIC_API_URL}${props.cover.formats.medium.url}`,
      thumbnail: `${process.env.NEXT_PUBLIC_API_URL}${props.cover.formats.medium.url}`,
    },
    {
      original: `${process.env.NEXT_PUBLIC_API_URL}${props.cover.formats.medium.url}`,
      thumbnail: `${process.env.NEXT_PUBLIC_API_URL}${props.cover.formats.medium.url}`,
    },
  ];
  return (
    <>
      <div className="mx-auto w-4/5 mt-32 justify-center">
        <div data-aos="fade-in" className="grid grid-cols-2 gap-6 h-screen">
          <div className="productCarousel">
            <ImageGallery
              items={images}
              lazyLoad={true}
              showNav={false}
              showPlayButton={false}
              thumbnailPosition="left"
            />
          </div>
          <div className="productIntro flex-col text-center">
            <h1 className="font-bold text-3xl">{props.name}</h1>
            <h2 className="mt-8 text-xl">{props.description}</h2>
            <h2 className="mt-8 text-xl">Price : Rs. X</h2>
          </div>
        </div>
        <div className="flex-col -mt-32 mb-32">
          <div className="grid grid-cols-6 gap-6">
            <p
              className="col-span-4 text-right text-xl self-center lg:leading-relaxed lg:tracking-wide"
              data-aos="fade-in"
              data-aos-duration="900"
              data-aos-delay="300"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${props.cover.formats.small.url}`}
              alt={`Image of ${props.name}`}
              className="col-span-2 ml-8"
              data-aos="fade-in"
              data-aos-duration="800"
              data-aos-delay="200"
            />
          </div>
        </div>
        <div className="flex-col mt-64 mb-48">
          <div className="grid grid-cols-6 gap-6">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${props.cover.formats.medium.url}`}
              alt={`Image of ${props.name}`}
              className="col-span-2"
              data-aos="fade-in"
              data-aos-duration="800"
              data-aos-delay="200"
            />
            <p
              className="ml-8 col-span-4 text-left text-xl self-center lg:leading-relaxed lg:tracking-wide"
              data-aos="fade-in"
              data-aos-duration="900"
              data-aos-delay="300"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

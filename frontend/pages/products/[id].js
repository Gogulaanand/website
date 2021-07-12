import { gql, ApolloLink } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import ImageGallery from "react-image-gallery";
import Image from "next/image";
import AppContext from "../../context/AppContext";
import { useContext } from "react";

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
    console.log(err);
  }
}

export default function ProductDetail(props) {
  const appContext = useContext(AppContext);

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
        <div
          data-aos="fade-in"
          className="lg:grid lg:grid-cols-2 lg:gap-6 h-screen"
        >
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
            <h1 className="font-bold text-3xl">{props.name}</h1>
            <h2 className="mt-8 text-xl">{props.description}</h2>
            <div className="mt-8 text-xl flex">
              <h2 className="mr-3">Price:</h2>
              <i className="fa fa-inr mt-1"></i>
              <p className="ml-1">{props.price}</p>
            </div>
            {appContext.enableCart ? (
              <button
                type="submit"
                className="my-8 py-3 px-5 inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 hover:text-white focus:shadow-outline focus:outline-none"
                onClick={() =>
                  appContext.addItem({
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
        <div className="flex-col lg:-mt-48 md:mt-8 lg:mb-32 mb-12">
          <div className="lg:grid lg:grid-cols-6 lg:gap-6">
            <p
              className="col-span-4 text-right md:text-xl text-base self-center lg:leading-relaxed lg:tracking-wide"
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
            <div className="col-span-2 lg:ml-8 mt-4 h-full w-full relative">
              <Image
                src={`${props.cover.formats.small.url}`}
                alt={`Image of ${props.name}`}
                layout="fill"
                objectFit="cover"
                data-aos="fade-in"
                data-aos-duration="800"
                data-aos-delay="200"
              />
            </div>
          </div>
        </div>
        <div className="flex-col mt-48 mb-48">
          <div className="lg:grid lg:grid-cols-6 lg:gap-6">
            <div className="col-span-2 relative">
              <Image
                src={`${props.cover.formats.small.url}`}
                alt={`Image of ${props.name}`}
                layout="fill"
                objectFit="cover"
                data-aos="fade-in"
                data-aos-duration="800"
                data-aos-delay="200"
              />
            </div>
            <p
              className="lg:ml-8 lg:mt-0 mt-4 col-span-4 text-left md:text-xl text-base self-center lg:leading-relaxed lg:tracking-wide"
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

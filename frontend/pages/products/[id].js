import { memo, useContext } from "react";
import Head from "next/head";
import { gql } from "apollo-boost";
import { motion } from "framer-motion";
import ImageGallery from "react-image-gallery";
import AppContext from "@/context/AppContext";
import client from "@/lib/apollo-client";

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
      originalAlt: `Image 1 of ${props.name}`,
      thumbnailAlt: `Image 1 of ${props.name}`,
    },
    {
      original: `${props.cover.formats.medium.url}`,
      thumbnail: `${props.cover.formats.medium.url}`,
      originalAlt: `Image 2 of ${props.name}`,
      thumbnailAlt: `Image 2 of ${props.name}`,
    },
  ];

  const variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <Head>
        <title>{props.name}</title>
        <meta
          name="description"
          content={`Product detail page of ${props.name} containing the name, description, price details and add to cart option for the user `}
        />
      </Head>
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
          <motion.div
            className="children productIntro flex-col text-left lg:ml-16 md:ml-32 mt-12 sm:ml-24 lg:mt-2"
            variants={variants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item} className="font-bold text-3xl">
              {props.name}
            </motion.div>
            <motion.div variants={item} className="mt-8 text-xl">
              {props.description}
            </motion.div>
            <motion.div variants={item} className="mt-8 text-xl flex">
              <h2 className="mr-3">Price:</h2>
              <p className="ml-1">&#x20b9; {props.price}</p>
            </motion.div>
            {enableCart ? (
              <motion.div variants={item}>
                <button
                  type="submit"
                  className="my-8 py-3 px-5 inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-200 hover:bg-deep-purple-accent-400 hover:text-white focus:shadow-outline focus:outline-none"
                  onClick={() =>
                    addItem({
                      id: props.id,
                      price: props.price,
                    })
                  }
                >
                  Add to cart
                </button>
              </motion.div>
            ) : (
              <></>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default memo(ProductDetail);

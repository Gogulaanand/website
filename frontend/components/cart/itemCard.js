import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Divider, Select } from "antd";
import { PlusOutlined, MinusOutlined, CloseOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
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

export default function CartItem(props) {
  var { loading, error, data } = useQuery(QUERY);
  const appContext = useContext(AppContext);

  const [count, setcount] = useState(props.data.quantity);

  const handleChange = (value) => {
    appContext.addItem({ id: props.data.id, quantity: value });
  };

  if (error) return <p className="m-auto">Error fetching products</p>;
  if (loading) return <Fetching />;
  if (data.products && data.products.length) {
    const item = data.products.find((i) => props.data.id === i.id);
    return (
      <>
        <div>
          <div className="grid grid-cols-12 my-8">
            <Link href={`/products/${item.id}`}>
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${item.cover.url}`}
                className="object-cover w-full h-64 cursor-pointer col-span-4"
                alt=""
              />
            </Link>
            <div className="p-5 col-span-3 justify-self-center my-auto">
              <a
                href={`/products/${item.id}`}
                aria-label="product"
                title={item.name}
                className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
              >
                {item.name}
              </a>
              {/* <p className="my-3 text-gray-700">{item.type}</p> */}
            </div>
            <div className="col-span-2 my-auto flex justify-center">
              <p className="mr-3">Qty: </p>
              <Select
                defaultValue={count}
                style={{ width: 60 }}
                onChange={handleChange}
                className="border-1 border-black focus:outline-none"
              >
                {[...Array(30)].map((_, i) => {
                  return (
                    <Option value={i + 1} key={i + 1}>
                      {i + 1}
                    </Option>
                  );
                })}
              </Select>
              {/* <MinusOutlined
                className="mt-3 mr-3"
                onClick={() => setcount(count - 1)}
              />
              <Input
                min={1}
                max={10000}
                onChange={handleChange}
                style={{ width: "30%" }}
                value={count}
              ></Input>
              <PlusOutlined
                className="mt-3 ml-3"
                onClick={() => setcount(count + 1)}
              /> */}
            </div>
            <p className="col-span-2 my-auto">{item.price}</p>
            <CloseOutlined
              className="my-auto col-span-1 justify-self-center"
              onClick={() => appContext.removeItem({ id: props.data.id })}
            />
          </div>
          <Divider />
        </div>
      </>
    );
  }
}

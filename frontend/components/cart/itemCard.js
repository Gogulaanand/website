import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Divider, InputNumber, Button, Popconfirm } from "antd";
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
      price
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
  const [disableMinus, setdisableMinus] = useState(count === 1);

  if (error) return <p className="m-auto">Error fetching products</p>;
  if (loading) return <Fetching />;
  if (data.products && data.products.length) {
    const item = data.products.find((i) => props.data.id === i.id);
    return (
      <>
        <div>
          <div className="md:grid md:grid-cols-12 flex flex-col my-8 md:static relative">
            <Link href={`/products/${item.id}`} passHref>
              <div className="object-cover md:w-full w-3/5 md:h-64 sm:h-32 cursor-pointer col-span-4 relative">
                <Image
                  src={`${item.cover.url}`}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
              </div>
            </Link>
            <div className="md:p-5 pt-2 col-span-3 justify-self-center my-auto">
              <Link href={`/products/${item.id}`} passHref>
                <a
                  aria-label="product"
                  title={item.name}
                  className="cursor-pointer inline-block mb-3 md:text-2xl sm:text-xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
                >
                  {item.name}
                </a>
              </Link>
            </div>
            <div className="md:col-span-2 md:my-auto flex md:justify-center md:static absolute top-full left-0">
              <Button
                disabled={disableMinus}
                icon={<MinusOutlined />}
                onClick={() => {
                  setcount(count - 1);
                  if (count - 1 === 1) setdisableMinus(true);
                  appContext.removeItem({
                    id: props.data.id,
                    price: item.price,
                  });
                }}
                type="text"
              ></Button>
              <InputNumber
                min={1}
                max={10000}
                style={{ width: "30%" }}
                value={count}
                bordered={false}
                className="md:ml-1 mt-1 md:static relative"
              ></InputNumber>
              <Button
                icon={<PlusOutlined />}
                className="md:static absolute left-1/4"
                type="text"
                onClick={() => {
                  setcount(count + 1);
                  setdisableMinus(false);
                  appContext.addItem({
                    id: props.data.id,
                    price: item.price,
                  });
                }}
              ></Button>
            </div>
            <p className="md:col-span-2 my-auto text-center font-semibold md:text-lg text-md md:static absolute inset-y-1/3 right-0">
              <i className="fa fa-inr"></i> {item.price * count}
            </p>
            <Popconfirm
              title="Are you sure to delete this item?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                setcount(0);
                appContext.deleteItem({ id: props.data.id });
              }}
            >
              <Button
                icon={<CloseOutlined />}
                type="text"
                className="my-auto md:col-span-1 justify-self-center md:static absolute bottom-0 right-0"
              ></Button>
            </Popconfirm>
          </div>
          <Divider />
        </div>
      </>
    );
  }
}

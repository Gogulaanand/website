import { useContext } from "react";
import Link from "next/link";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";

import AppContext from "@/context/AppContext";

export default function Cart(props) {
  const { cart, enableCart } = useContext(AppContext);
  return (
    <>
      {enableCart && !props.isMobile ? (
        <Link href="/cart" passHref>
          <a
            aria-label="Shopping cart"
            title="Shopping cart"
            className="font-medium text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
          >
            <Badge count={cart.totalQuantity} offset={[-2, 5]}>
              <ShoppingCartOutlined
                className="mx-2"
                style={{ fontSize: "2rem" }}
              />
            </Badge>
          </a>
        </Link>
      ) : null}
      {enableCart && props.isMobile ? (
        <Link href="/cart" passHref>
          <a
            aria-label="Shopping cart"
            title="Shopping cart"
            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            onClick={() => props.setMenuState(false)}
          >
            Cart
          </a>
        </Link>
      ) : null}
    </>
  );
}

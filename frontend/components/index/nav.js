import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/outline";
import { Badge } from "antd";

import AuthContext from "@/context/AuthContext";
import AppContext from "@/context/AppContext";

function Cart(props) {
  const { enableCart, totalQuantity, cartItems } = useContext(AppContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(
      cartItems.reduce((total, currentItem) => total + currentItem.quantity, 0)
    );
  }, [cartItems]);

  return (
    <>
      <AppContext.Consumer>
        {(context) => {
          return enableCart && !props.isMobile ? (
            <Link href="/cart" passHref>
              <a aria-label="Shopping cart" title="Shopping cart">
                <Badge count={count} offset={[0, 5]}>
                  <ShoppingCartIcon className="w-7 h-7" />
                </Badge>
              </a>
            </Link>
          ) : null;
        }}
      </AppContext.Consumer>
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

function UserControls(props) {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <>
          {props.isMobile && (
            <>
              <li>
                <Link href="/orders" passHref>
                  <a
                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                    aria-label="Account"
                    title="Account"
                    onClick={() => props.setMenuState(false)}
                  >
                    Orders
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/" passHref>
                  <a
                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                    aria-label="Logout"
                    title="Logout"
                    onClick={() => {
                      props.setMenuState(false);
                      logoutUser();
                    }}
                  >
                    Logout
                  </a>
                </Link>
              </li>
            </>
          )}
          {!props.isMobile && (
            <Link href="/account" passHref>
              <a
                aria-label="Account"
                title="Account"
                className="hover:text-gray-800"
              >
                <UserIcon className="w-6 h-6 cursor-pointer" />
              </a>
            </Link>
          )}
        </>
      ) : (
        <>
          {props.isMobile && (
            <Link href="/login" passHref>
              <a
                className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                aria-label="Sign up"
                title="Sign up"
                onClick={() => props.setMenuState(false)}
              >
                Register / Sign in
              </a>
            </Link>
          )}
          {!props.isMobile && (
            <Link href="/login" passHref>
              <a
                className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                aria-label="Sign Up"
                title="Sign Up"
              >
                Sign Up
              </a>
            </Link>
          )}
        </>
      )}
    </>
  );
}

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="flex items-center justify-between">
        <Link href="/" passHref>
          <a
            aria-label="Sunfabb"
            title="Sunfabb"
            className="inline-flex items-center"
          >
            <svg
              className="w-8 text-deep-purple-accent-400"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="currentColor"
              fill="none"
            >
              <rect x="3" y="1" width="7" height="12" />
              <rect x="3" y="17" width="7" height="6" />
              <rect x="14" y="1" width="7" height="6" />
              <rect x="14" y="11" width="7" height="12" />
            </svg>
            <h1 className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              SUNFABB
            </h1>
          </a>
        </Link>
        <ul className="flex hidden items-center space-x-8 lg:flex z-10">
          <li>
            <Link href="/" passHref>
              <a
                aria-label="Home"
                title="Home"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/products" passHref>
              <a
                aria-label="Our products"
                title="Our products"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Products
              </a>
            </Link>
          </li>
          <li>
            <Link href="/#contact" passHref>
              <a
                aria-label="Contact us"
                title="Contact us"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Contact us
              </a>
            </Link>
          </li>
        </ul>
        <ul className="flex items-center hidden space-x-8 lg:flex z-10">
          <li>
            <Cart />
          </li>
          <li>
            <UserControls />
          </li>
        </ul>
        <div className="lg:hidden flex">
          <Cart />
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 ml-3 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full z-10">
              <div className="p-5 bg-white border rounded shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Link href="/" passHref>
                      <a
                        aria-label="Sunfabb"
                        title="Sunfabb"
                        className="inline-flex items-center"
                      >
                        <svg
                          className="w-8 text-deep-purple-accent-400"
                          viewBox="0 0 24 24"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          stroke="currentColor"
                          fill="none"
                        >
                          <rect x="3" y="1" width="7" height="12" />
                          <rect x="3" y="17" width="7" height="6" />
                          <rect x="14" y="1" width="7" height="6" />
                          <rect x="14" y="11" width="7" height="12" />
                        </svg>
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                          Company
                        </span>
                      </a>
                    </Link>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4">
                    <li>
                      <Link href="/" passHref>
                        <a
                          aria-label="Home"
                          title="Home"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Home
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/products" passHref>
                        <a
                          aria-label="Our products"
                          title="Our products"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Products
                        </a>
                      </Link>
                    </li>

                    <li>
                      <Link href="/#contact" passHref>
                        <a
                          aria-label="Contact us"
                          title="Contact us"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Contact us
                        </a>
                      </Link>
                    </li>

                    <li>
                      <Cart isMobile={true} setMenuState={setIsMenuOpen} />
                    </li>

                    <UserControls
                      isMobile={true}
                      setMenuState={setIsMenuOpen}
                    />
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

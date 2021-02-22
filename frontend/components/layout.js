import React, { useContext } from "react";
import Link from "next/link";
import { logout } from "../lib/auth";
import AppContext from "../context/AppContext";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function Layout() {
  const { user, setUser } = useContext(AppContext);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <>
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start">
              <a href="/">
                <span className="sr-only">Sunfabb</span>
                <img
                  src="/sun.svg"
                  alt="logo"
                  className="lg:w-16 lg:h-16 md:w-12 md:h-12 sm:w-8 sm:h-8"
                />
              </a>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <button
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open menu</span>

                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <nav className="hidden md:flex space-x-10 lg:flex justify-center flex-1">
              <Link href="/">
                <a className="text-base font-medium text-gray-700 hover:text-gray-900">
                  Home
                </a>
              </Link>

              <Link href="/products">
                <a className="text-base font-medium text-gray-700 hover:text-gray-900">
                  Products
                </a>
              </Link>

              <Link href="/#contact" scroll={false}>
                <a className="text-base font-medium text-gray-700 hover:text-gray-900">
                  Contact
                </a>
              </Link>
              {user ? (
                <DropdownButton
                  title={user.username}
                  id="dropdown-user-button"
                  className="text-base font-medium text-gray-700 hover:text-gray-900"
                >
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </DropdownButton>
              ) : (
                <Link href="/login">
                  <a className="text-base font-medium text-gray-700 hover:text-gray-900">
                    Login
                  </a>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

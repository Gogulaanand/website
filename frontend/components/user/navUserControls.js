import { useContext } from "react";
import Link from "next/link";
import { UserOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";

import AuthContext from "@/context/AuthContext";

export default function UserControls(props) {
  const { user, logoutUser } = useContext(AuthContext);

  const menu = (
    <Menu>
      <Menu.Item>
        <Link href="/account" passHref>
          <a
            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            aria-label="Account"
            title="Account"
          >
            Account
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/" passHref>
          <a
            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            aria-label="Logout"
            title="Logout"
            onClick={logoutUser}
          >
            Logout
          </a>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {user ? (
        <>
          {props.isMobile && (
            <>
              <li>
                <Link href="/account" passHref>
                  <a
                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                    aria-label="Account"
                    title="Account"
                    onClick={() => props.setMenuState(false)}
                  >
                    Account
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
            <Dropdown overlay={menu} placement="bottomRight">
              <UserOutlined
                className="ant-dropdown-link text-2xl"
                onClick={(e) => e.preventDefault()}
              />
            </Dropdown>
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

import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import { Menu, Layout } from "antd";
import {
  TruckIcon,
  ChevronRightIcon,
  LogoutIcon,
  UserIcon,
  HomeIcon,
} from "@heroicons/react/outline";

import AuthContext from "@/context/AuthContext";

const OrdersTable = dynamic(import("@/components/user/ordersTable"));
const UserDetails = dynamic(import("@/components/user/userDetails"));
const Modal = dynamic(import("@/components/user/modal"));
const { Content, Sider } = Layout;

export default function Account() {
  const { user, logoutUser } = useContext(AuthContext);
  const [selectedMenuItem, setselectedMenuItem] = useState("m1");

  const componentsSwitch = (key) => {
    switch (key) {
      case "m1":
        return <OrdersTable />;
      case "m2":
        return <UserDetails />;
      case "m4":
        return (
          <Modal
            title="Are you sure you want to logout ?"
            action={logoutUser}
            buttonText="logout"
          />
        );
      default:
        break;
    }
  };

  const menuItem = [
    { name: "Order", Icon: TruckIcon },
    { name: "Personal data", Icon: UserIcon },
    { name: "Addresses", Icon: HomeIcon },
    { name: "Sign out", Icon: LogoutIcon },
  ];

  if (!user) {
    return (
      <div className="mx-auto mt-24 flex-col w-4/5 text-center h-screen">
        <Link href="/login" passHref>
          <a className="text-blue-500 text-2xl">Please login or register</a>
        </Link>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Account</title>
        <meta
          type="description"
          content="Your sunfabb account section with details of customer name, past orders, and logout option"
        ></meta>
      </Head>
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 h-screen">
        <div className="lg:my-18 md:my-12 sm:my-8">
          <h1 className="mb-5 font-semibold text-xl">My account</h1>
          <Content>
            <Layout className="site-layout-background">
              <Sider className="site-layout-background" width={200}>
                <Menu
                  style={{ height: "100%" }}
                  mode="inline"
                  selectedKeys={selectedMenuItem}
                  onClick={(e) => setselectedMenuItem(e.key)}
                >
                  {menuItem.map((item, idx) => {
                    return (
                      <>
                        <Menu.Item key={`m${idx + 1}`}>
                          <div className="flex justify-between">
                            <div className="flex">
                              <item.Icon className="w-5 h-5 my-auto mr-2" />{" "}
                              <span>{item.name}</span>{" "}
                            </div>
                            <ChevronRightIcon className="w-4 h-4 my-auto" />
                          </div>{" "}
                        </Menu.Item>
                      </>
                    );
                  })}
                </Menu>
              </Sider>
              <Content style={{ padding: "0 24px", minHeight: 280 }}>
                {componentsSwitch(selectedMenuItem)}
              </Content>
            </Layout>
          </Content>
        </div>
      </div>
    </>
  );
}

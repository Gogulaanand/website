import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";
import { Button, Menu, Layout } from "antd";

import AuthContext from "@/context/AuthContext";
import OrdersTable from "@/components/user/ordersTable";

const { Content, Sider } = Layout;

export default function Account() {
  const { user, logoutUser } = useContext(AuthContext);
  const [selectedMenuItem, setselectedMenuItem] = useState("m1");

  const componentsSwitch = (key) => {
    switch (key) {
      case "m1":
        return <h1>Account</h1>;
      case "m2":
        return <OrdersTable />;
      case "m3":
        return (
          <>
            <Button href="#" onClick={logoutUser} className="my-2 mx-4">
              Logout
            </Button>
          </>
        );
      default:
        break;
    }
  };

  if (!user) {
    return (
      <div className="mx-auto mt-24 flex-col w-4/5 text-center h-screen">
        <Link href="/login" passHref>
          <a className="text-blue-500">Please login or register</a>
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
        <div className="lg:my-24 md:my-16 sm:my-12">
          <Content>
            <Layout className="site-layout-background">
              <Sider className="site-layout-background" width={200}>
                <Menu
                  style={{ height: "100%" }}
                  mode="inline"
                  selectedKeys={selectedMenuItem}
                  onClick={(e) => setselectedMenuItem(e.key)}
                >
                  <Menu.Item key="m1">
                    <span>Account</span>
                  </Menu.Item>
                  <Menu.Item key="m2">
                    <span>Orders</span>
                  </Menu.Item>
                  <Menu.Item key="m3">
                    <span>Logout</span>
                  </Menu.Item>
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

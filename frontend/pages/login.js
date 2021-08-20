import dynamic from "next/dynamic";
import Head from "next/head";

const Login = dynamic(() => import("@/components/user/login"));

export default function User() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Login into your sunfabb account by registering via email or google single sign on"
        />
      </Head>
      <div className="h-screen w-screen flex">
        <div className="mx-auto lg:mt-48 md:mt-32 sm:mt-24 h-3/5 xl:w-3/12 lg:w-3/12 md:w-5/12 sm:w-3/5">
          <div className="mb-12 text-center">
            <h1 className="text-2xl mb-4 mt-32 md:mt-2">
              Sign into your account
            </h1>
          </div>
          <Login />
        </div>
      </div>
    </>
  );
}

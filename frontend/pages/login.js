import { useState, useContext } from "react";
import Head from "next/head";
import { Divider } from "antd";

import AuthContext from "@/context/AuthContext";
import SvgGoogle from "@/components/svg/SvgGoogle";
import SvgArrowPointingToRight from "@/components/svg/SvgArrowPointingToRight";

export default function User() {
  const [email, setEmail] = useState("");
  const { loginUser, oauthLogin } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(email);
  };

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
          <form onSubmit={handleSubmit} className="w-full">
            <div>
              <label htmlFor="email" className="font-medium text-gray-700">
                Email address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="you@company.com"
                className="mt-1 block w-full rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              />
            </div>
            <div className="text-base leading-6 font-semibold text-white shadow-md bg-gray-800 hover:hoverbg-gray-900 focus:outline-none cursor-pointer hover:text-white transition duration-150 ease-in-out w-full text-white px-4 py-2 rounded-lg mt-9 text-center flex hover:scale-110 relative">
              <button className="w-full" type="submit">
                Email a Login Link
              </button>
              <SvgArrowPointingToRight className="w-5 h-6 fill-current stroke-current text-white absolute inset-y-0 right-0 my-2 mr-3" />
            </div>
            <Divider>or</Divider>
            <SvgGoogle onClick={oauthLogin} className="w-full cursor-pointer" />
          </form>
        </div>
      </div>
    </>
  );
}

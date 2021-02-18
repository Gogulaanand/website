import React, { useContext, useState } from "react";
import { registerUser } from "../lib/auth";
import { useFormik } from "formik";
import AppContext from "../context/AppContext";
import SvgArrowPointingToRight from "../components/icons/SvgArrowPointingToRight";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const appContext = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      consolelog(values);
      if (loading) return;
      setLoading(true);
      registerUser(values.username, values.email, values.password);
      resetForm({});
      setloading(false);
    },
  });

  return (
    <>
      <div className="h-screen w-screen flex">
        <div className="mx-auto lg:mt-64 md:mt-48 sm:mt-32 h-3/5 lg:w-1/5 md:3/5 sm:4/5">
          <form onSubmit={formik.handleSubmit} className="w-full">
            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              />
            </div>
            <div className="lg:mt-8 md:mt-6 sm:mt-4">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              />
            </div>
            <div className="lg:mt-8 md:mt-6 sm:mt-4">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                autoComplete="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              />
            </div>
            <div className="bg-blue-400 w-full text-white px-4 py-2 rounded-md mt-9 text-center flex hover:scale-110 relative">
              <button onClick={formik.handleSubmit} className="w-full">
                Signup
              </button>
              <SvgArrowPointingToRight className="w-5 h-6 fill-current stroke-current text-white absolute inset-y-0 right-0 my-2 mr-3" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import { registerUser } from "../lib/auth";
import { useFormik } from "formik";
import SvgArrowPointingToRight from "./svg/SvgArrowPointingToRight";
import { toaster } from "evergreen-ui";

export default function Register() {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (loading) return;
      setLoading(true);
      registerUser(values.username, values.email, values.password)
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            toaster.success("Activation email sent !", {
              description: "Please check your inbox",
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          toaster.danger("Something went wrong, pls try after sometime!", {
            description:
              "If the issue persists, pls write to us at abc@gmail.com",
            duration: 10,
          });
        });
      resetForm({});
      setloading(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <div>
        <label htmlFor="username" className="text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          autoComplete="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          className="mt-1 block w-full rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        />
      </div>
      <div className="lg:mt-8 md:mt-6 sm:mt-4">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          type="text"
          id="email"
          name="email"
          autoComplete="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="mt-1 block w-full rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        />
      </div>
      <div className="lg:mt-8 md:mt-6 sm:mt-4">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="mt-1 block w-full rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        />
      </div>
      <div className="bg-indigo-400 w-full text-white px-4 py-2 rounded-lg mt-9 text-center flex hover:scale-110 relative">
        <button onClick={formik.handleSubmit} className="w-full">
          Signup
        </button>
        {loading ? (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <SvgArrowPointingToRight className="w-5 h-6 fill-current stroke-current text-white absolute inset-y-0 right-0 my-2 mr-3" />
        )}
      </div>
    </form>
  );
}

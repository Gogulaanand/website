import { useState, useContext } from "react";
import { loginUser } from "../../lib/auth";
import { useFormik } from "formik";
import { toaster } from "evergreen-ui";
import AppContext from "../../context/AppContext";
import dynamic from "next/dynamic";

const SvgArrowPointingToRight = dynamic(() =>
  import("../svg/SvgArrowPointingToRight")
);
const SvgLoading = dynamic(() => import("../svg/SvgLoading"));

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const appContext = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (loading) return;
      setLoading(true);
      loginUser(values.username, values.password)
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            toaster.success("Login successful");
            appContext.setUser(res.data.user);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          toaster.danger("Login unsuccessful!");
        });
      resetForm({});
      setLoading(false);
    },
  });

  const handlePasswordView = () => {
    setshowPassword(!showPassword);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <div>
        <label htmlFor="username" className="font-medium text-gray-700">
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
        <label htmlFor="password" className="font-medium text-gray-700">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          autoComplete="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="mt-1 block w-full rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        />
      </div>
      <div className="lg:mt-4 md:mt-3 sm:mt-2">
        <input
          type="checkbox"
          className="lg:mr-3 md:mr-2 sm:mr-1 rounded-md text-black bg-gray-200 border-transparent focus:border-gray-500 border-2 focus:ring-black"
          onChange={handlePasswordView}
        />
        <span className="font-medium text-gray-700">Show password</span>
      </div>
      <div className="bg-indigo-400 w-full text-white px-4 py-2 rounded-lg mt-9 text-center flex hover:scale-110 relative">
        <button onClick={formik.handleSubmit} className="w-full">
          Login
        </button>
        {loading ? (
          <SvgLoading />
        ) : (
          <SvgArrowPointingToRight className="w-5 h-6 fill-current stroke-current text-white absolute inset-y-0 right-0 my-2 mr-3" />
        )}
      </div>
    </form>
  );
}

import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import dynamic from "next/dynamic";
import { Divider } from "antd";

const SvgArrowPointingToRight = dynamic(() =>
  import("../svg/SvgArrowPointingToRight")
);
const SvgGoogle = dynamic(() => import("../svg/SvgGoogle"));

export default function Login() {
  const [email, setEmail] = useState("");
  const { loginUser, oauthLogin } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(email);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div>
        <label htmlFor="email" className="font-medium text-gray-700">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email Address"
          className="mt-1 block w-full rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        />
      </div>
      <div className="text-base leading-6 font-semibold text-white shadow-md bg-gray-800 hover:hoverbg-gray-900 focus:outline-none cursor-pointer hover:text-white transition duration-150 ease-in-out w-full text-white px-4 py-2 rounded-lg mt-9 text-center flex hover:scale-110 relative">
        <button className="w-full" type="submit">
          Login
        </button>
        <SvgArrowPointingToRight className="w-5 h-6 fill-current stroke-current text-white absolute inset-y-0 right-0 my-2 mr-3" />
      </div>
      <Divider>or</Divider>
      <SvgGoogle onClick={oauthLogin} className="w-full cursor-pointer" />
    </form>
  );
}

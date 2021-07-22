import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import dynamic from "next/dynamic";

const SvgArrowPointingToRight = dynamic(() =>
  import("../svg/SvgArrowPointingToRight")
);

export default function Login() {
  const [email, setEmail] = useState("");
  const { loginUser } = useContext(AuthContext);

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
      <div className="bg-indigo-400 w-full text-white px-4 py-2 rounded-lg mt-9 text-center flex hover:scale-110 relative">
        <button className="w-full" type="submit">
          Login
        </button>
        <SvgArrowPointingToRight className="w-5 h-6 fill-current stroke-current text-white absolute inset-y-0 right-0 my-2 mr-3" />
      </div>
    </form>
  );
}

import React, { useState } from "react";
import dynamic from "next/dynamic";
const Login = dynamic(() => import("../components/user/login"));
const Register = dynamic(() => import("../components/user/register"));

export default function User() {
  const [login, setlogin] = useState(true);

  const handleSwitch = () => setlogin(!login);

  return (
    <>
      <div className="h-screen w-screen flex">
        <div className="mx-auto lg:mt-48 md:mt-32 sm:mt-24 h-3/5 lg:w-1/5 md:w-2/5 sm:w-3/5">
          <div className="mb-12 text-center">
            <h1 className="text-2xl mb-4">
              {login ? "Login" : "Create account"}
            </h1>
            <p>
              {login ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={handleSwitch}
                className="underline text-blue-500 hover:text-blue-600"
              >
                {login ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
          {login ? <Login /> : <Register />}
        </div>
      </div>
    </>
  );
}

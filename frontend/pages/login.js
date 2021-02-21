import React, { useState } from "react";
import dynamic from "next/dynamic";
const Login = dynamic(() => import("../components/login"));
const Register = dynamic(() => import("../components/register"));

export default function User() {
  const [login, setlogin] = useState(true);

  const handleSwitch = () => setlogin(!login);

  return (
    <>
      <div className="h-screen w-screen flex">
        <div className="mx-auto lg:mt-48 md:mt-32 sm:mt-24 h-3/5 lg:w-1/5 md:3/5 sm:4/5">
          {login ? (
            <div className="mb-12 text-center">
              <h1 className="text-2xl mb-4">Login</h1>
              <p>
                Don't have an account?{" "}
                <button
                  onClick={handleSwitch}
                  className="underline text-blue-500"
                >
                  Sign up
                </button>
              </p>
            </div>
          ) : (
            <div className="mb-12 text-center">
              <h1 className="text-2xl mb-4">Create account</h1>
              <p>
                Already have an account?{" "}
                <button
                  onClick={handleSwitch}
                  className="underline text-blue-500"
                >
                  Sign in
                </button>
              </p>
            </div>
          )}
          {login ? <Login /> : <Register />}
        </div>
      </div>
    </>
  );
}

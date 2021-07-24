import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";

export default function OauthSuccess() {
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState(false);
  const { checkUserLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const token = checkUserLoggedIn();
    if (token) {
      setLoginStatus(true);
      setTimeout(() => router.push("/"), 2000);
    }
  }, []);

  return (
    <>
      <div className="h-screen w-screen flex">
        <div className="mx-auto lg:mt-48 md:mt-32 sm:mt-24 h-3/5 lg:w-1/5 md:w-2/5 sm:w-3/5">
          <div className="mb-12 text-center">
            {loginStatus && <h1>Login Successful. Please wait...</h1>}
            {!loginStatus && <h1>your are not logged in</h1>}
          </div>
        </div>
      </div>
    </>
  );
}

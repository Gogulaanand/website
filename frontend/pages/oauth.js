import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { RefreshIcon } from "@heroicons/react/outline";

import AuthContext from "@/context/AuthContext";

export default function OauthSuccess() {
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setLoginStatus(true);
      setTimeout(() => router.push("/"), 1000);
    }
  }, [user, router]);

  return (
    <>
      <div className="h-screen w-screen flex">
        <div className="mx-auto lg:mt-48 md:mt-32 sm:mt-24 h-3/5 lg:w-1/5 md:w-2/5 sm:w-3/5">
          <div className="mb-12 text-center">
            {loginStatus && (
              <h1 className="text-2xl">
                Login Successful. Redirecting to homepage...
              </h1>
            )}
            {!loginStatus && (
              <RefreshIcon className="mx-auto animate-spin w-12 h-12" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

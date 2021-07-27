import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function OauthSuccess() {
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState(false);
  const { user } = useContext(AuthContext);
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />;

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
            {!loginStatus && <Spin indicator={antIcon} />}
          </div>
        </div>
      </div>
    </>
  );
}

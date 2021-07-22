import { createContext, useState, useEffect } from "react";
import router, { useRouter } from "next/router";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";

const AuthContext = createContext();
let magic;

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY, {
      extensions: [new OAuthExtension()],
    });

    checkUserLoggedIn();
  }, []);

  const loginUser = async (email) => {
    try {
      await magic.auth.loginWithMagicLink({ email });
      setUser(email);
      router.push("/");
    } catch (err) {
      setUser(null);
      console.log(err);
    }
  };

  const logoutUser = async () => {
    try {
      await magic.user.logout();
      setUser(null);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const checkUserLoggedIn = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        const { email } = await magic.user.getMetadata();
        setUser(email);
        const token = getToken();
        console.log("token", token);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getToken = async () => {
    try {
      const token = await magic.user.getIdToken();
      return token;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, getToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

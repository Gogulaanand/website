import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
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

    const render = async () => {
      if (window.location.pathname === "/oauth") {
        try {
          const result = await magic.oauth.getRedirectResult();
          const profile = JSON.stringify(result.oauth.userInfo, undefined, 2);
          if (profile.email) {
            setUser(profile.email);
            router.push("/");
          }
        } catch {
          window.location.href = window.location.origin;
          throw new Error("Oauth login failed");
        }
      }

      checkUserLoggedIn();
    };
    render();
  }, []);

  const loginUser = async (email) => {
    try {
      await magic.auth.loginWithMagicLink({ email });
      setUser(email);
      router.push("/");
    } catch (err) {
      setUser(null);
      throw new Error("Email login failed");
    }
  };

  const oauthLogin = async (e) => {
    e.preventDefault();

    // Start the Google OAuth 2.0 flow!
    await magic.oauth.loginWithRedirect({
      provider: "google",
      redirectURI: `${window.location.origin}/oauth`,
    });
  };

  const logoutUser = async () => {
    try {
      await magic.user.logout();
      setUser(null);
      router.push("/");
    } catch (err) {
      throw new Error("User logout failed");
    }
  };

  const checkUserLoggedIn = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        const { email } = await magic.user.getMetadata();
        setUser(email);
        getToken();
      }
    } catch (err) {
      throw new Error("User is not logged in");
    }
  };

  const getToken = async () => {
    try {
      return await magic.user.getIdToken();
    } catch (err) {
      throw new Error("Authenticate current session failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        oauthLogin,
        logoutUser,
        getToken,
        checkUserLoggedIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

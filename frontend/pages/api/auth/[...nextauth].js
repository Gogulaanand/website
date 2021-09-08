import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";
import { Magic } from "magic-sdk";

const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY);

const options = {
  providers: [
    // Providers.Email({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        didToken: { label: "Magic token", type: "text" },
        async authorize({ didToken }, req) {
          magic.token.validate(didToken);
          const metaData = await magic.user.getMetadataByToken(didToken);
          return { ...metaData };
        },
      },
      // async authorize(credentials, req) {
      //   const res = await fetch(
      //     `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`,
      //     {
      //       method: "POST",
      //       body: JSON.stringify(credentials),
      //       headers: { "Content-type": "application/json" },
      //     }
      //   );

      //   const user = await res.json();
      //   if (res.ok && user) {
      //     return user;
      //   }
      //   return null;
      // },
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
  ],
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  session: {
    jwt: true,
  },
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      // console.log("user outside signin callback", user);
      // console.log("account outside signin callback", account);
      // console.log("profile outside signin callback", profile);
      // console.log("email outside signin callback", email);
      // console.log("credentials outside signin callback", credentials);
    },
    redirect: async ({ url, baseUrl }) => {
      return baseUrl;
    },
    session: async (session, user) => {
      session.jwt = user.jwt;
      session.id = user.id;
      return Promise.resolve(session);
    },
    jwt: async (token, user, account) => {
      console.log("token", token);
      console.log("user", user);
      console.log("account", account);
      const isSignIn = user ? true : false;
      if (isSignIn && account.type !== "email") {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
        );
        const data = await response.json();
        token.jwt = data.jwt;
        token.id = data.user.id;
      } else if (isSignIn) {
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, {
            email: user.email || token.email || account.providerAccountId,
          })
          .then((res) => {
            console.log(res);
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
            throw new Error(err);
          });
      }
      return Promise.resolve(token);
    },
  },
  debug: false,
  theme: "light",
  pages: {
    signIn: "/login",
  },
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;

import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-type": "application/json" },
          }
        );

        const user = await res.json();
        if (res.ok && user) {
          return user;
        }
        return null;
      },
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
      }
      return Promise.resolve(token);
    },
  },
  debug: false,
  pages: {
    // signIn: "/auth/signin",
  },
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;

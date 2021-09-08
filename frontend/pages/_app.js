import Head from "next/head";
import dynamic from "next/dynamic";
import { ApolloProvider } from "@apollo/react-hooks";
import { ToastProvider } from "react-toast-notifications";
import { Provider } from "next-auth/client";
import ErrorBoundary from "@/components/index/errorBoundary";
import { AppProvider } from "@/context/AppContext";
import Compose from "@/context/combineProviders";
import withData from "@/lib/apollo";
import "../styles/globals.sass";
import Nav from "@/components/index/nav";
const Footer = dynamic(() => import("@/components/index/footer"));

function MyApp({ Component, pageProps, apollo }) {
  return (
    <>
      <Head>
        <title>Sunfabb</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="company name: Sunfabb. High Quality bedspreads, bed sheets, pillow covers, scarf, hand keys, kerchief manufactured and priced reasonable but of best quality unmatched by others in the market"
        ></meta>
      </Head>
      <Compose
        components={[Provider, AppProvider, ApolloProvider, ToastProvider]}
        client={apollo}
        session={pageProps.session}
      >
        {/* <ErrorBoundary> */}
        <Nav />
        <Component {...pageProps} />
        <Footer />
        {/* </ErrorBoundary> */}
      </Compose>
    </>
  );
}

export default withData(MyApp);

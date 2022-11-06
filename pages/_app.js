import "../styles/globals.css";
import { Provider, createClient } from "urql";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

  return (
    <Provider value={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;

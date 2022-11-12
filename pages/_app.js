import "../styles/globals.css";
import { Provider, createClient } from "urql";
import Layout from "../components/layout/Layout";
// context
import { ProductContextProvider } from "../lib/context";

function MyApp({ Component, pageProps }) {
  const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

  return (
    <ProductContextProvider>
      <Provider value={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ProductContextProvider>
  );
}

export default MyApp;

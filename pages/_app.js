import "../styles/globals.css";
import { Provider, createClient } from "urql";
import Layout from "../components/layout/Layout";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "@auth0/nextjs-auth0";

// context
import { ProductContextProvider } from "../lib/context";

function MyApp({ Component, pageProps }) {
  const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

  return (
    <UserProvider>
      <ProductContextProvider>
        <Provider value={client}>
          <Layout>
            <ToastContainer
              position="top-center"
              autoClose={1500}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ProductContextProvider>
    </UserProvider>
  );
}

export default MyApp;

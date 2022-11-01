import "../styles/globals.css";
import { Provider, createClient } from "urql";

function MyApp({ Component, pageProps }) {
  const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

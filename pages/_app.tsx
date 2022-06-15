import "css/tailwind.css";
import "css/styles.css";

export default function App({ Component, pageProps, err }: any) {
  return <Component {...pageProps} err={err} />;
}

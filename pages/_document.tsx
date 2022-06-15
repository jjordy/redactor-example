import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      </Head>
      <body className="bg-gray-50/10">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

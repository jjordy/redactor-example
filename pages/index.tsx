import Head from "next/head";
import type { Collection } from "services/Collection/types";
import Image from "next/image";
import Link from "next/link";
import Navigation from "shared/Navigation";
import { NextPageContext } from "next";

export default function IndexPage({
  collections,
}: {
  collections: Collection[];
}) {
  return (
    <>
      <Head>
        <title>Redactor Demo (Next.js)</title>
      </Head>
      <Navigation title="Home" />
      <div className="container mx-auto pt-8">
        <div className="grid grid-cols-3 gap-8">
          {collections?.map((collection) => (
            <div key={collection.id}>
              <h1 className="text-4xl font-medium">{collection.name}</h1>
              <hr className="my-8" />
              {collection.images[0] && (
                <Link href={`/${collection.id}`}>
                  <a>
                    <Image
                      width={collection.images[0].width}
                      height={collection.images[0].height}
                      src={collection.images[0].url}
                      alt={collection.images[0].alt}
                    />
                  </a>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/**
 * By exporting a function getServerSideProps
 * You can make a server side request during the Server Side render
 * If you have data you need for the initial render this is a good way to get it
 * It is safe to import database code and use it in this function
 * next.js is smart enough to split your bundle to ensure
 * that this is only available on the server
 * Think of this as an equivlent of something you might do when rendering a pug view
 * in the default express framework
 */
export async function getServerSideProps(ctx: NextPageContext) {
  const { query } = ctx;
  const req = await fetch("http://localhost:3000/api/collection");
  const data = await req.json();
  return {
    // this function must always return an object with the key props
    props: {
      collections: data?.collections,
    },
  };
}

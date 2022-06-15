import { HomeIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";
import Button from "./Elements/Button";

export default function NotFound({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-screen h-screen bg-slate-300 flex items-center justify-center">
      <div className="bg-white shadow-2xl max-w-xl w-full p-4 rounded flex flex-col">
        <h1 className="text-4xl font-semibold tracking-tighter text-center">
          404 Not Found
        </h1>
        <hr className="my-4" />
        {!children ? (
          <p className="font-medium mt-4 mb-8">
            The page was not found please click the link below to return the the
            homepage and select another collection.
          </p>
        ) : (
          children
        )}
        <Link href="/" passHref>
          <Button as={"a"} variant="error" className="justify-center">
            Go Home
            <HomeIcon className="w-5 h-5 ml-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

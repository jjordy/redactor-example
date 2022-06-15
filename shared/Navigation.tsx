import Link from "next/link";

export default function Navigation({ title = "Redactor" }) {
  return (
    <div className="flex items-center shadow-xl h-20 px-6">
      <Link href="/">
        <a className="font-medium text-3xl uppercase tracking-tighter flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          Redcator
        </a>
      </Link>
      <div className="mr-auto"></div>
      <h4 className="text-2xl font-light mr-8">{title}</h4>
    </div>
  );
}

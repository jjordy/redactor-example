import {
  HandIcon,
  PencilIcon,
  XCircleIcon,
  DownloadIcon,
} from "@heroicons/react/outline";
import { useAtomValue } from "jotai";
import { canvasAtom } from "lib/state";

export default function Toolbar({ setMode, clearAnnotations, mode }: any) {
  const canvas = useAtomValue(canvasAtom);
  return (
    <div className="text-4xl w-24 bg-white shadow-2xl border-t-2">
      <ul className="w-full text-center p-2">
        <li>
          <button
            onClick={() => setMode("select")}
            title="Select Mode"
            className={`p-4 rounded ${
              mode === "select" ? "bg-indigo-500/50" : "transparent"
            }`}
          >
            <HandIcon className="w-6 h-6" />
          </button>
        </li>
        <li>
          <button
            onClick={() => setMode("draw")}
            title="Annotate Mode"
            className={`p-4 rounded ${
              mode === "draw" ? "bg-indigo-500/50" : "transparent"
            }`}
          >
            <PencilIcon className="w-6 h-6" />
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              clearAnnotations();
              canvas?.remove(...canvas.getObjects());
            }}
            title="Clear Annotations"
            className={`p-4 rounded`}
          >
            <XCircleIcon className="w-6 h-6" />
          </button>
        </li>
        <li>
          <button
            onClick={() => console.log("Save Annotation")}
            className={`p-4 rounded`}
          >
            <DownloadIcon className="w-6 h-6" />
          </button>
        </li>
      </ul>
    </div>
  );
}

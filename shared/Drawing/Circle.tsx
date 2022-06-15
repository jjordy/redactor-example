import { fabric } from "fabric";
import { useEffect } from "react";

type RectProps = {
  canvas?: fabric.Canvas;
  top: number;
  left: number;
  width: number;
  height: number;
  fill?: string;
  onMove?: (shape: any) => void;
  name: string;
};

export default function Circle({
  canvas,
  onMove = () => {},
  ...rest
}: RectProps) {
  useEffect(() => {
    const rect = new fabric.Circle({
      ...rest,
    });
    canvas?.add(rect);
    return () => {
      canvas?.remove(rect);
    };
  }, [canvas, onMove, rest]);
  return null;
}

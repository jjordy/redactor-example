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

export default function Rect({
  canvas,
  onMove = () => {},
  ...rest
}: RectProps) {
  useEffect(() => {
    const rect = new fabric.Rect({
      ...rest,
    });
    if (canvas) {
      canvas?.add(rect);
    }
    return () => {
      canvas?.remove(rect);
    };
  }, [canvas, onMove, rest]);
  return null;
}

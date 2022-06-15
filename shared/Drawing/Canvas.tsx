import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { PropsWithChildren } from "react";
import { nanoid } from "nanoid";
import { useCallback } from "react";
import { useAtom } from "jotai";
import { canvasAtom } from "lib/state";

type CanvasProps = {
  width: number;
  height: number;
  scale: number;
  backgroundUrl?: string | null;
  onAddShape: (shape: {
    width: number;
    height: number;
    top: number;
    left: number;
    name: string;
  }) => void;
  onRemoveShape: (shape: any) => void;
  handleShapeModified: (shape: any) => void;
  mode: string;
} & PropsWithChildren;

export default function Canvas({
  width,
  height,
  children,
  backgroundUrl = null,
  scale = 1,
  onAddShape = () => {},
  onRemoveShape = () => {},
  handleShapeModified = () => {},
  mode,
}: CanvasProps) {
  // track mouse up|down status
  const [isDown, setIsDown] = useState(false);
  // keep track of an in progress annotation
  const [pos, setPos] = useState({ width: 0, height: 0, top: 0, left: 0 });
  // store our canvas reference in state so we can access it after initalization
  const [canvasState, setCanvasState] = useAtom(canvasAtom);
  // a reference to our html canvas element for us to reference from react.
  const ref = useRef<HTMLCanvasElement>(null);
  /**
   * handle the fabric.js mouse down evt
   */
  const downHandler = useCallback(
    (evt: any) => {
      if (evt.target) {
        return;
      }
      setIsDown(true);
      setPos({ ...pos, top: evt.pointer.y, left: evt.pointer.x });
    },
    [pos]
  );
  /**
   * handle the fabric.js mouse up evt
   */
  const upHandler = useCallback(
    (evt: any) => {
      if (evt.target) {
        return;
      }
      if (isDown) {
        onAddShape({
          ...pos,
          width: Math.abs(evt.pointer.x - pos.left),
          height: Math.abs(evt.pointer.y - pos.top),
          name: nanoid(),
        });
      }
      setIsDown(false);
    },
    [isDown, pos, onAddShape]
  );
  /**
   * Intialize the fabric.js canvas
   * set background image and set canvas state.
   */
  useEffect(() => {
    const options: fabric.ICanvasOptions = {
      height: height * scale,
      width: width * scale,
    };
    const canvas = new fabric.Canvas(ref.current, options);
    if (backgroundUrl) {
      fabric.Image.fromURL(backgroundUrl, function (img) {
        img.scale(scale);
        // canvas.clear();
        canvas.setBackgroundImage(img, () => {
          setCanvasState(canvas);
        });
        canvas.renderAll();
      });
    } else {
      setCanvasState(canvas);
    }
    return () => {
      canvas.dispose();
    };
  }, [width, height, scale, backgroundUrl]);

  useEffect(() => {
    return () => {
      canvasState?.removeListeners();
    };
  }, []);
  /**
   * Setup event handlers for fabric.js events
   */
  useEffect(() => {
    if (mode === "draw") {
      canvasState?.on("mouse:down", (evt: fabric.IEvent) => downHandler(evt));
      canvasState?.on("mouse:up", (evt: fabric.IEvent) => upHandler(evt));
    }
    canvasState?.on("object:modified", (evt: fabric.IEvent) =>
      handleShapeModified(evt)
    );
    // There is no dependency array heres ON PURPOSE
    // we need to update these references each time the component renders
    // each event handler callback should be wrapped in useCallback
  });

  useEffect(() => {
    const handler = (evt: KeyboardEvent) => {
      if (evt.code === "Delete") {
        if (canvasState?.getActiveObject()) {
          onRemoveShape(canvasState?.getActiveObject());
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [canvasState, onRemoveShape]);

  const childrenWithCanvas = React.Children.map(children, (child) => {
    return React.cloneElement(child as React.ReactElement, {
      canvas: canvasState,
    });
  });
  return (
    <div>
      <canvas ref={ref} />
      {canvasState && childrenWithCanvas}
    </div>
  );
}

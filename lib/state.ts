import { atom } from "jotai";
import { fabric } from "fabric";

export const canvasAtom = atom<fabric.Canvas | null>(null);

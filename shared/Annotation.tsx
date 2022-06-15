import { Annotation as AnnotationType } from "services/Collection/types";
import Circle from "./Drawing/Circle";
import Rect from "./Drawing/Rect";

type AnnotationProps = {
  type: "rect" | "circle";
};

export default function Annotation({
  type = "rect",
  ...rest
}: AnnotationProps) {
  switch (type) {
    case "rect":
      return <Rect {...(rest as AnnotationType)} />;
    case "circle":
      return <Circle {...(rest as AnnotationType)} />;
  }
  return null;
}

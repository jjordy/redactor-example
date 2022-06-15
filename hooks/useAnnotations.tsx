import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Annotation } from "services/Collection/types";

type UseAnnotationsProps = {
  initialValues?: Annotation[];
  selectedImageId?: string | number;
};

export default function useAnnotations({
  initialValues = [],
  selectedImageId
}: UseAnnotationsProps) {
  // keep track of all annotations for the selected image.
  const [annotations, setAnnotations] = useState<any>(initialValues);
  const [isDirty, setIsDirty] = useState(false);
  const idRef = useRef(null);
  // update the annotations on initialValues change
  useEffect(() => {
    if (selectedImageId !== idRef?.current) {
      console.log('Updated Annotations from initialValues')
      setAnnotations(initialValues);
      //@ts-expect-error
      idRef.current = selectedImageId;
    }
  }, [initialValues, selectedImageId]);
  const removeAnnotation = (shape: any) => {
    const filtered = annotations.filter(
      (annotation: any) => annotation.name !== shape.name
    );
    setIsDirty(true);
    setAnnotations(filtered);
  };

  const modifyAnnotation = (evt: fabric.IEvent) => {
    let newPos = {
      width: evt.target?.width,
      height: evt?.target?.height,
      left: evt.target?.left,
      top: evt.target?.top,
      angle: evt.target?.angle,
      name: evt?.target?.name,
    };
    if (evt.target && evt.target.name) {
      const filtered = annotations?.filter(
        (anno: any) => anno.name !== evt?.target?.name
      );
      if (evt.target.scaleX && newPos.width) {
        newPos.width = newPos.width * evt.target.scaleX;
      }
      if (evt.target.scaleY && newPos.height) {
        newPos.height = newPos.height * evt.target.scaleY;
      }
      setAnnotations([...filtered, { ...newPos }]);
      setIsDirty(true);
    }
  };
  const addAnnotation = (annotation: any) => {
    setAnnotations([...annotations, annotation]);
    setIsDirty(true);
  };

  const clearAnnotations = () => {
    setAnnotations([]);
    setIsDirty(false);
  }
  return {
    modifyAnnotation,
    removeAnnotation,
    annotations,
    addAnnotation,
    isDirty,
    clearAnnotations,
  };
}

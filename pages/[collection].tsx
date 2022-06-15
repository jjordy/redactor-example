import Head from "next/head";
import type { Collection, Image as ImageType } from "services/Collection/types";
import { NextPageContext } from "next";
import { useCallback, useState } from "react";
import Toolbar from "shared/Toolbar";
import Navigation from "shared/Navigation";
import Canvas from "shared/Drawing/Canvas";
import Annotation from "shared/Annotation";
import useAnnotations from "hooks/useAnnotations";
import Alert from "shared/Elements/Alert";
import CollectionService from "services/Collection";
import NotFound from "shared/NotFound";
import { ClipboardIcon } from "@heroicons/react/outline";

export default function CollectionPage({
  collection,
}: {
  collection: Collection;
}) {
  // keep state for selected image use first image as default.
  const [selectedImage, setSelectedImage] = useState<ImageType>(
    collection?.images?.[0]
  );
  const {
    modifyAnnotation,
    addAnnotation,
    annotations,
    removeAnnotation,
    isDirty,
    clearAnnotations,
  } = useAnnotations({
    initialValues: selectedImage?.annotations || [],
    selectedImageId: selectedImage?.id,
  });
  // current selected tool
  const [mode, setMode] = useState("select");
  const handleSetMode = useCallback((mode: string) => setMode(mode), []);

  if (!collection) {
    return <NotFound />;
  }

  return (
    <>
      <Head>
        <title>Redactor Demo (Next.js)</title>
      </Head>
      <div className="max-h-fit">
        <Navigation title={collection.name} />
        <div className="flex bg-slate-200">
          <div>
            <div className=" flex">
              <Toolbar
                clearAnnotations={() => {}}
                setMode={handleSetMode}
                mode={mode}
              />
              <div className="relative">
                <Alert
                  active={isDirty}
                  className="bg-indigo-500/75 absolute"
                  style={{ width: selectedImage?.width * 0.25 }}
                >
                  Unsaved Changes
                </Alert>
              </div>

              {selectedImage && (
                <div
                  style={{
                    width: selectedImage.width * 0.25,
                    height: selectedImage.height * 0.25,
                  }}
                >
                  <Canvas
                    mode={mode}
                    backgroundUrl={selectedImage?.url}
                    onAddShape={addAnnotation}
                    handleShapeModified={modifyAnnotation}
                    onRemoveShape={removeAnnotation}
                    width={selectedImage.width}
                    height={selectedImage.height}
                    scale={0.25}
                  >
                    {annotations.map((annotation: any, id: number) => (
                      <Annotation
                        {...annotation}
                        key={`annotation_shape_${id}`}
                        onMove={modifyAnnotation}
                      />
                    ))}
                  </Canvas>
                </div>
              )}
            </div>
            <div className="flex w-full flex-no-wrap px-28 items-center h-48 bg-gray-200 overflow-x-auto">
              {collection.images.map((image) => (
                <img
                  src={image.url}
                  alt={image.alt}
                  key={image.id}
                  onClick={() => {
                    clearAnnotations();
                    setSelectedImage(image);
                  }}
                  className={`h-36 w-auto mr-8 shadow-xl ${
                    image.id === selectedImage.id
                      ? " outline outline-4 outline-offset-4 outline-indigo-500"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="w-full flex items-stretch">
            <div className="h-auto bg-white m-4 w-full shadow-xl">
              <div className="px-4 py-2 bg-gray-50 text-gray-500 font-medium uppercase flex items-center">
                Review Panel
                <ClipboardIcon className="w-5 h-5 ml-4" />
              </div>
            </div>
          </div>
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
  const {
    res,
    query: { collection },
  } = ctx;
  const data = await CollectionService.getById(collection as string);
  if (!data && res) {
    res.statusCode = 404;
  }
  return {
    // this function must always return an object with the key props
    props: {
      collection: data ?? null,
    },
  };
}

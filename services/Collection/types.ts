
export type Annotation = {
  top: number;
  left: number;
  width: number;
  height: number;
  name: string;
  angle?: number;
  data?: Record<string, any>
};

export type Image = {
  url: string;
  width: number;
  height: number;
  alt?: string;
  id: string;
  blur_hash?: string;
  color?: string;
  annotations?: Annotation[];
};

export type Collection = {
  id: string;
  name: string;
  images: Image[];
};

type Property = {
  type: string;
  title?: string;
  properties?: Record<string, Property>;
  items?: {
    $ref: string;
  }
  required?: string[]
};

export type FormSchema = {
  $schema: string;
  type: string;
  properties: Record<string, Property>;
  required?: string[];
  $defs?: Record<string, Property>
};

export type CollectionData = {
  collections: Collection[];
  schema: FormSchema;
};

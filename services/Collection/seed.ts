import { nanoid } from "nanoid";
import { CollectionData } from "./types";

const seed = async (): Promise<CollectionData | undefined> => {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=office&orientation=landscape&client_id=${process.env.UNSPLASH_API_KEY}`
    );
    const data = await res.json();
    return {
      collections: [
        {
          id: nanoid(),
          name: "Office Collection (Unsplash)",
          images: data?.results.map((result: any) => ({
            width: result?.width,
            height: result.height,
            blur_hash: result?.blur_hash,
            color: result?.color,
            alt: result?.alt_description,
            id: result?.id,
            url: result?.urls?.raw,
          })),
        },
      ],
      schema: {
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
        properties: {
          firstName: {
            type: "string",
            title: "First Name",
          },
          lastName: {
            type: "string",
            title: "Last Name",
          },
          age: {
            type: "integer",
            title: "Age",
          },
          address: {
            type: "object",
            title: "Address",
            properties: {
              address1: {
                type: "string",
                title: "Address One",
              },
              address2: {
                type: "string",
                title: "Address Two (Optional)",
              },
              city: {
                type: "string",
                title: "City",
              },
              state: {
                type: "string",
                title: "State",
              },
              zipcode: {
                type: "integer",
                title: "Zip Code",
              },
            },
            required: ["address1", "city", "state", "zipcode"],
          },
          games: {
            title: "Select some of your favorite games",
            type: "array",
            items: {
              $ref: "#/$defs/game",
            },
          },
        },
        $defs: {
          game: {
            type: "object",
            required: ["year", "title"],
            properties: {
              year: {
                type: "integer",
                title: "Release Year",
              },
              title: {
                type: "string",
                title: "Title",
              },
            },
          },
        },
        required: ["firstName", "age"],
      },
    };
  } catch (err) {
    console.log(err);
  }
};

export default seed;

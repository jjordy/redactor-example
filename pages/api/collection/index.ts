import APIRouteBuilder from "lib/api/APIRouteBuilder";
import CollectionService from "services/Collection";
import type { Collection } from "services/Collection/types";
import { nanoid } from "nanoid";

const router = new APIRouteBuilder();

router.get(async (req, res) => {
  const collections = await CollectionService.get();
  res.json({ collections });
});

router.post(async (req, res) => {
  const collection: Collection = { ...req.body, id: nanoid() };
  await CollectionService.create(collection);
  res.json({ collection });
});

export default router.build();

import APIRouteBuilder from "lib/api/APIRouteBuilder";
import CollectionService from "services/Collection";

const router = new APIRouteBuilder();

type Query = {
  id?: string;
};

router.get(async (req, res) => {
  const { query }: { query: Query } = req;
  const collection = await CollectionService.getById(query.id as string);
  if (!collection) {
    return res.status(404).json({ message: "Not Found" });
  }
  res.json({ collection });
});

router.put(async (req, res) => {
  const {
    query: { id },
    body,
  } = req;
  await CollectionService.update(id as string, body);
  res.status(204).end();
});

router.delete(async (req, res) => {
  const {
    query: { id },
  } = req;
  await CollectionService.delete(id as string);
  res.status(204).end();
});

export default router.build();

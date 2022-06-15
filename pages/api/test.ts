import MetaSummaryService from "services/MetaSummary";

export default async function (req, res) {
  const collections = await MetaSummaryService.get();
  res.json({ collections });
}

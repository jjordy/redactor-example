import { join, dirname } from "path";
import { JSONFile } from "lowdb";
import { fileURLToPath } from "url";
import { LowWithLodash } from "utils";
import seed from "./seed";
import type { CollectionData, Collection } from "./types";
import Debugger from "debug";

const debug = Debugger("nirvana-stack:collection_database");
const __dirname = dirname(fileURLToPath(import.meta.url));
// Use JSON file for storage
const file = join(__dirname, "..", "..", "data", "collection.json");
const adapter = new JSONFile<CollectionData>(file);
const db = new LowWithLodash(adapter);

async function init() {
  try {
    await db.read();
    const data = await seed();
    if (data) {
      db.data ||= data;
    }

    await db.write();
  } catch (err) {
    debug(err);
  }
}

init();

const CollectionService = {

  get: async () => {
    await db.read();
    return db.chain.get("collections").value();
  },

  getById: async (id: string) => {
    await db.read();
    return db.chain.get("collections").find({ id }).value();
  },
  create: async (data: any) => {
    await db.read();
    if (db.data?.collections) {
      db.data.collections.push(data);
    }
    await db.write();
  },
  delete: async (id: string) => {
    await db.read();
    db.chain.get("collections").remove({ id: id }).value();
    await db.write();
  },
  update: async (id: string, data: Collection) => {
    await db.read();
    db.chain.get("collections").find({ id }).assign(data).value();
    await db.write();
  },
};

export default CollectionService;

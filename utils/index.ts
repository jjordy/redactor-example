import lodash from "lodash";
import { Low } from "lowdb";

export const noop = () => {};

export class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<this["data"]> = lodash.chain(this).get("data");
}

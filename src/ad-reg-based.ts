import { AdFilter } from "./ad-filter";
import { AdJoined } from "./ad-joined";
import { AdOrder } from "./ad-order";
import { Registry } from "qin_soul";

export class AdRegBased {
    registry: Registry;
    joins?: AdJoined[];
    filters?: AdFilter[];
    orders?: AdOrder[];
}

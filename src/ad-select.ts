import { Typed } from "qin_soul";
import { AdFilter } from "./ad-filter";
import { AdJoined } from "./ad-joined";
import { AdOrder } from "./ad-order";
import { Registry } from "qin_soul";

export type AdSelect = {
    registier: Registry;
    fields?: Typed[];
    joins?: AdJoined[];
    filters?: AdFilter[];
    orders?: AdOrder[];
    offset?: number;
    limit?: number;
};

import { AdFilter } from "./ad-filter";
import { AdRegistry } from "./ad-registry";

export type AdDelete = {
    registier: AdRegistry;
    filters: AdFilter[];
};

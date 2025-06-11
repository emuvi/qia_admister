import { AdFilter } from "./ad-filter";
import { AdRegistry } from "./ad-registry";
import { AdValued } from "./ad-valued";

export type AdUpdate = {
    registier: AdRegistry;
    valueds: AdValued[];
    filters?: AdFilter[];
    limit?: number;
};

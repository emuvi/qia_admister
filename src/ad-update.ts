import { Registry, Valued } from "qin_soul";
import { AdFilter } from "./ad-filter";

export type AdUpdate = {
    registier: Registry;
    valueds: Valued[];
    filters?: AdFilter[];
    limit?: number;
};

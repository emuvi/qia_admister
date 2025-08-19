import { AdFilter } from "./ad-filter";
import { Registry } from "qin_soul";

export type AdDelete = {
    registier: Registry;
    filters: AdFilter[];
};

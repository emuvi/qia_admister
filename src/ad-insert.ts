import { AdRegistry } from "./ad-registry";
import { AdToGetID } from "./ad-to-get-id";
import { AdValued } from "./ad-valued";

export type AdInsert = {
    registier: AdRegistry;
    valueds: AdValued[];
    toGetID: AdToGetID;
};

import { AdFilter } from "./ad-filter";
import { AdTableHead } from "./ad-table-head";
import { AdModule } from "./ad-tools";

export type AdJoined = {
    module: AdModule;
    registry?: AdTableHead;
    alias?: string;
    filters?: AdFilter[];
    ties?: AdJoinedTies;
};

export enum AdJoinedTies {
    INNER = "INNER",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    FULL = "FULL",
    CROSS = "CROSS",
}

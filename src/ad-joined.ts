import { AdFilter } from "./ad-filter";
import { TableHead } from "qin_soul";
import { AdModule } from "./ad-tools";

export type AdJoined = {
    module: AdModule;
    registry?: TableHead;
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

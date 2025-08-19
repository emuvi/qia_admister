import { Valued } from "qin_soul";
import { AdLinked } from "./ad-linked";

export type AdFilter = {
    seems?: AdFilterSeems;
    likes?: AdFilterLikes;
    valued?: Valued;
    linked?: AdLinked;
    ties?: AdFilterTies;
};

export enum AdFilterSeems {
    SAME = "SAME",
    DIVERSE = "DIVERSE",
}

export enum AdFilterLikes {
    EQUALS = "EQUALS",
    BIGGER = "BIGGER",
    LESSER = "LESSER",
    BIGGER_EQUALS = "BIGGER_EQUALS",
    LESSER_EQUALS = "LESSER_EQUALS",
    STARTS_WITH = "STARTS_WITH",
    ENDS_WITH = "ENDS_WITH",
    CONTAINS = "CONTAINS",
}

export enum AdFilterTies {
    AND = "AND",
    OR = "OR",
}

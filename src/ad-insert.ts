import { Registry, ToGetID, Valued } from "qin_soul";

export type AdInsert = {
    registier: Registry;
    valueds: Valued[];
    toGetID: ToGetID;
};

import { QinAsset, QinComboItem, QinComboSet, QinMutants, QinStringSet, QinSuggestionSet } from "qin_case";
import { TableHead, Valued } from "qin_soul";
import { AdField } from "./ad-field";
import { AdFilter } from "./ad-filter";
import { AdNames } from "./ad-names";

export type AdSetup = {
    module: AdModule;
    scopes: AdScope[];
    filters?: AdFilter[];
    fixed?: Valued[];
};

export enum AdScope {
    ALL = "ALL",
    INSERT = "INSERT",
    SEARCH = "SEARCH",
    NOTICE = "NOTICE",
    RELATE = "RELATE",
    MUTATE = "MUTATE",
    DELETE = "DELETE",
}

export type AdModule = {
    appName: string;
    title: string;
    icon: QinAsset;
    tableHead?: TableHead;
};

function isSameModule(one: AdModule, two: AdModule): boolean {
    return one?.appName == two?.appName && one?.title == two?.title;
}

function newAdSetupOption(module: AdModule, scopes: AdScope[], filters?: AdFilter[], fixed?: Valued[]) {
    let result = {};
    result[AdNames.AdSetup] = newAdSetup(module, scopes, filters, fixed);
    return result;
}

function newAdSetup(module: AdModule, scopes: AdScope[], filters?: AdFilter[], fixed?: Valued[]): AdSetup {
    return {
        module,
        scopes,
        filters,
        fixed,
    };
}

function newAdFieldInteger(name: string, title: string): AdField {
    return new AdField({
        key: false,
        name: name,
        title: title,
        kind: QinMutants.INTEGER,
    });
}

function newAdFieldNumeric(name: string, title: string): AdField {
    return new AdField({
        key: false,
        name: name,
        title: title,
        kind: QinMutants.NUMERIC,
    });
}

function newAdFieldString(name: string, title: string, maxLength: number): AdField {
    return new AdField({
        key: false,
        name: name,
        title: title,
        kind: QinMutants.STRING,
        options: {
            maxLength: maxLength,
        } as QinStringSet,
    });
}

function newAdFieldSuggestion(name: string, title: string, maxLength: number, items: string[]): AdField {
    return new AdField({
        key: false,
        name: name,
        title: title,
        kind: QinMutants.SUGGESTION,
        options: {
            maxLength: maxLength,
            items: items,
        } as QinSuggestionSet,
    });
}

function newAdFieldDate(name: string, title: string): AdField {
    return new AdField({
        key: false,
        name: name,
        title: title,
        kind: QinMutants.DATE,
    });
}

function newAdFieldCombo(name: string, title: string, items: QinComboItem[]): AdField {
    return new AdField({
        key: false,
        name: name,
        title: title,
        kind: QinMutants.COMBO,
        options: {
            items: items,
        } as QinComboSet,
    });
}

function newAdFieldBoolean(name: string, title: string): AdField {
    return newAdFieldCombo(name, title, [
        {
            title: "",
            value: "",
        },
        {
            title: "Sim",
            value: "S",
        },
        {
            title: "Não",
            value: "N",
        },
    ]);
}

function newAdFieldAtivo(): AdField {
    return newAdFieldBoolean("ativo", "Ativo");
}

export const AdTools = {
    isSameModule,
    newAdSetup,
    newAdSetupOption,
    newAdFieldInteger,
    newAdFieldNumeric,
    newAdFieldString,
    newAdFieldSuggestion,
    newAdFieldDate,
    newAdFieldCombo,
    newAdFieldBoolean,
    newAdFieldAtivo,
};

import { QinAsset, QinBase, QinButton, QinColumn, QinCombo, QinComboItem, QinIcon, QinLine, QinScroll, QinChars } from "qin_case";
import { AdField } from "./ad-field";
import { AdRegister } from "./ad-register";
import { Filter, FilterLikes, FilterSeems, FilterTies } from "qin_soul";

export class AdRegSearch extends QinScroll {
    private _reg: AdRegister;
    private _lines = new QinColumn();
    private _clauses = new Array<SearchClause>();

    public idSelected: string;
    public lastSelected: string;

    public constructor(register: AdRegister) {
        super();
        this._reg = register;
        this.idSelected = register.identifier + "-LastSearchSelected";
        this.lastSelected = this.qinpel.window.loadConfig(this.idSelected);
        this._lines.install(this);
        const first = new SearchClause(this);
        this._clauses.push(first);
        first.install(this._lines);
    }

    public get reg(): AdRegister {
        return this._reg;
    }

    public addField(field: AdField) {
        this._clauses.forEach((clause) => {
            clause.addField({
                title: field.title,
                value: field.name,
                selected: field.name === this.lastSelected,
            });
        });
    }

    public addClause(after: SearchClause) {
        const clause = new SearchClause(this);
        this._reg.model.fieldList.forEach((field) => {
            clause.addField({
                title: field.title,
                value: field.name,
                selected: field.name === this.lastSelected,
            });
        });
        const index = this._clauses.indexOf(after);
        this._clauses.splice(index + 1, 0, clause);
        this.rebuild();
        clause.focus();
    }

    public delClause(clause: SearchClause) {
        if (this._clauses.length > 1) {
            const index = this._clauses.indexOf(clause);
            this._clauses.splice(index, 1);
            this.rebuild();
        } else {
            this._clauses[0].clean();
        }
    }

    private rebuild() {
        this._lines.unInstallChildren();
        this._clauses.forEach((clause) => {
            clause.install(this._lines);
        });
    }

    public getFilters(): Filter[] {
        let results: Filter[] = null;
        this._clauses.forEach((clause) => {
            let filter = clause.getFilter();
            if (filter) {
                if (!results) {
                    results = [];
                }
                results.push(filter);
            }
        });
        return results;
    }

    public clean(): void {
        if (this._clauses.length > 1) {
            this._clauses.splice(1, this._clauses.length - 1);
            this.rebuild();
        }
        this._clauses[0].clean();
    }
}

class SearchClause extends QinLine {
    private _dad: AdRegSearch;

    private _qinSame = new SearchSeems();
    private _qinField = new QinCombo();
    private _qinLikes = new SearchCondition();
    private _qinValue = new QinChars();
    private _qinTies = new SearchTies();

    private _qinAdd = new QinButton({ icon: new QinIcon(QinAsset.FacePlus) });
    private _qinDel = new QinButton({ icon: new QinIcon(QinAsset.FaceMinus) });

    public constructor(dad: AdRegSearch) {
        super();
        this._dad = dad;
        this._qinSame.install(this);
        this._qinField.install(this);
        this._qinLikes.install(this);
        this._qinValue.install(this);
        this._qinTies.install(this);
        this._qinAdd.install(this);
        this._qinDel.install(this);
        this._qinField.addItem({ title: "", value: "" });
        this._qinField.addOnChanged((result) => {
            if (this._dad.lastSelected !== result) {
                this._dad.lastSelected = result;
                this.qinpel.window.saveConfig(this._dad.idSelected, result);
            }
        });
        this._qinAdd.addActionMain((_) => {
            this._dad.addClause(this);
        });
        this._qinDel.addActionMain((_) => {
            this._dad.delClause(this);
        });
        this.styleAsPaddingBottom(4);
        this.styleAsBorderBottom(2, "#bbb");
        this.styleAsMarginBottom(4);
    }

    public addField(item: QinComboItem) {
        this._qinField.addItem(item);
    }

    public clean() {
        this._qinSame.value = FilterSeems.IS;
        this._qinLikes.value = FilterLikes.EQUALS;
        this._qinValue.value = null;
        this._qinTies.value = FilterTies.AND;
    }

    public getFilter(): Filter {
        let fieldName = this._qinField.value;
        if (!fieldName) {
            return null;
        }
        const field = this._dad.reg.model.getFieldByName(fieldName);
        if (!field) {
            return null;
        }
        if (!this._qinValue.value) {
            return null;
        }
        return {
            seems: this._qinSame.value as FilterSeems,
            likes: this._qinLikes.value as FilterLikes,
            valued: {
                name: field.typed.alias || field.typed.name,
                type: field.typed.type,
                data: this._qinValue.value,
            },
            ties: this._qinTies.value as FilterTies,
        };
    }

    public override focus(): QinBase {
        if (!this._qinField.value) {
            this._qinField.focus();
        } else {
            this._qinValue.focus();
        }
        return this;
    }
}

class SearchSeems extends QinCombo {
    public constructor() {
        super();
        this.addItem({ title: "==", value: FilterSeems.IS });
        this.addItem({ title: "!=", value: FilterSeems.NOT });
        this.styleAsMaxWidth(64);
    }
}

class SearchCondition extends QinCombo {
    public constructor() {
        super();
        this.addItem({ title: "=", value: FilterLikes.EQUALS });
        this.addItem({ title: ">", value: FilterLikes.BIGGER });
        this.addItem({ title: "<", value: FilterLikes.LESSER });
        this.addItem({ title: ">=", value: FilterLikes.BIGGER_EQUALS });
        this.addItem({ title: "<=", value: FilterLikes.LESSER_EQUALS });
        this.addItem({ title: "$_", value: FilterLikes.STARTS_WITH });
        this.addItem({ title: "_$", value: FilterLikes.ENDS_WITH });
        this.addItem({ title: "_$_", value: FilterLikes.CONTAINS, selected: true });
        this.styleAsMaxWidth(64);
    }
}

class SearchTies extends QinCombo {
    public constructor() {
        super();
        this.addItem({ title: "&&", value: FilterTies.AND });
        this.addItem({ title: "||", value: FilterTies.OR });
        this.styleAsMaxWidth(64);
    }
}

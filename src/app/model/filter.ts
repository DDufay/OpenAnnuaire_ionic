export class Filter {
    name: string;
    values: string[] = [];
    needName: boolean;
    multiple = true;
    operator: string;

    constructor(name: string, needName: boolean, multiple: boolean, operator: string) {
        this.name = name;
        this.needName = needName;
        this.multiple = multiple;
        this.operator = operator;
    }

    addValue(value: string) {
        if (this.multiple) {
            this.values.push(value);
        } else if (value.trim()) {
            this.values = [value];
        } else {
            this.values = [];
        }
    }

    removeValue(value: string) {
        this.values.splice(this.values.indexOf(value), 1);
    }

    removeValues() {
        this.values = [];
    }

    getFormattedValues() {
        return this.values.map(value => {
            return this.needName ? this.name + this.operator + value : value;
        });
    }
}

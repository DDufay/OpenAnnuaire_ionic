export class Company {
    siren: string;
    name: string;
    address: string;
    postal_code: string;
    city: string;
    category: string;
    activity: string;
    effectif: string;
    startDate: string;
    coordinates: {};
    libapet: string;

    constructor(siren, name, address, postal_code, city, category, activity, effectif, startDate, coordinates, libapet) {
        this.siren = siren;
        this.name = name;
        this.address = address;
        this.postal_code = postal_code;
        this.city = city;
        this.category = category;
        this.activity = activity;
        this.effectif = effectif;
        this.startDate = startDate;
        this.coordinates = coordinates;
        this.libapet = libapet;
    }

    getExportData() {
        return {
            siren: this.siren ? this.siren : '',
            name: this.name ? this.name : '',
            address: this.address ? this.address : '',
            postal_code: this.postal_code ? this.postal_code : '',
            city: this.city ? this.city : '',
            category: this.category ? this.category : '',
            activity: this.activity ? this.activity : '',
            effectif: this.effectif ? this.effectif : '',
            startDate: this.startDate ? this.startDate : '',
        };
    }
}

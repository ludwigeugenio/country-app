export interface Country {
    name: {
        common: string,
        official: string,
        nativeName: {
            spa: {
                official: string,
                common: string
            }
        }
    },
    region: string,
    area: number,
    independent: boolean
}

export interface CountryHook {
    countryList: Country[],
    changeOrder: Function,
    changeRegion: Function,
    changeArea: Function,
    changeAttr: Function,
    changeAreaCondition: Function
}

export enum AttribOptions {
    NAME = "name",
    AREA = "area",
    REGION = "region"
}
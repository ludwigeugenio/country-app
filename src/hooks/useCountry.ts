import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { countryActionCreators, State } from "../state";
import { Country, CountryHook, AttribOptions } from "../types/index"


export default function useCountry(): CountryHook {
    const dispatch = useDispatch();
    const { getCountries } = bindActionCreators(countryActionCreators, dispatch);

    const countries = useSelector((state: State) => state.country.countries);

    const [areaMap, setAreaMap] = useState<Record<string, number>>({})
    const [countryList, setCountryList] = useState<Country[]>(countries);
    const [order, setOrder] = useState<string>("asc");
    const [attr, setAttr] = useState<AttribOptions>(AttribOptions.NAME);
    const [area, setArea] = useState<number | null>(null);
    const [areaCondition, setAreaCondition] = useState<string>(">");
    const [region, setRegion] = useState<Country["region"]>("all")

    useEffect(() => {
        const newAreaMap: Record<string, number> = {};
        countries.forEach(country => {
            newAreaMap[country.name.common] = country.area
        })
        setAreaMap(newAreaMap);
    }, [countries])

    useEffect(() => {
        getCountries();
    }, [])

    const filterAndSortCountries = () => {
        let sortedList = [...countries];

        sortedList = sortedList.sort((a, b) => {
            const isAsc = order === "asc"
            switch (attr) {
                case AttribOptions.NAME:
                    return isAsc ? a.name.common.localeCompare(b.name.common) : b.name.common.localeCompare(a.name.common)
                case AttribOptions.AREA:
                    return isAsc ? a.area - b.area : b.area - a.area
                default:
                    return isAsc ? a[attr].localeCompare(b[attr]) : b[attr].localeCompare(a[attr])
            }
        });

        if (area || region !== "all")
            sortedList = sortedList.filter(country => {
                let validArea: boolean = true;
                let validRegion: boolean = true;
                if (area) validArea = areaCondition === ">" ? area > country.area : area < country.area;
                if (region !== "all") validRegion = region === country.region;

                return validArea && validRegion
            })

        setCountryList(sortedList);
    }

    useEffect(filterAndSortCountries, [countries, order, attr, area, areaCondition, region])

    const changeOrder = (order: string) => {
        setOrder(order);
    }

    const changeArea = (countryName: string) => {
        setArea(areaMap[countryName]);
    }

    const changeRegion = (region: string) => {
        setRegion(region)
    }

    const changeAttr = (attr: AttribOptions) => {
        setAttr(attr)
    }

    const changeAreaCondition = (condition: string) => {
        setAreaCondition(condition);
    }

    return {
        countryList,
        changeOrder,
        changeRegion,
        changeArea,
        changeAttr,
        changeAreaCondition
    }
}
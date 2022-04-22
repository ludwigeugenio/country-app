import { Dispatch } from "redux";
import { Country } from "../../types/index"
import { CountryActions } from "../actions/countryActions";
import { CountryActionTypes } from "../action-types/countryActionTypes";
import axios from "axios";

export const getCountries = () => {
    return (dispatch: Dispatch<CountryActions>) => {
        let url = "https://restcountries.com/v3.1/all?fields=name,region,area";
        return axios.get(url).then(res => {
            const countries: Country[] = res.data;
            dispatch({
                type: CountryActionTypes.SET_COUNTRIES,
                payload: countries
            })
        })
    }
}
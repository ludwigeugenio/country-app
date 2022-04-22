import { CountryActionTypes } from "../action-types/countryActionTypes";
import { Country } from "../../types/index"

interface SetCountryAction {
    type: CountryActionTypes.SET_COUNTRIES
    payload: Country[]
}

export type CountryActions = SetCountryAction
import { CountryActionTypes } from "../action-types/countryActionTypes";
import { CountryActions } from "../actions/countryActions";
import { Country } from "../../types/index"

type CountryReducerState = {
    countries: Country[]
}

const initialState = {
    countries: []
};

const reducer = (state: CountryReducerState = initialState, action: CountryActions) => {
    switch (action.type) {
        case CountryActionTypes.SET_COUNTRIES:
            const newState = { ...state };
            newState.countries = action.payload
            return newState
        default:
            return state
    }
}

export default reducer;
import { CountryHook, AttribOptions } from "../../types/index"
import Select from "../Select";

interface Props {
    countryHook: CountryHook,
}

const CountryFilter: React.FC<Props> = ({ countryHook }) => {
    const regions = ["All", "Africa", "Asia", "Americas", "Europe", "Oceania"];

    const { changeRegion, changeOrder, changeArea, changeAttr, changeAreaCondition } = countryHook;

    const handleRegionChange: React.ChangeEventHandler<HTMLSelectElement> = async (e) => {
        changeRegion(e.target.value)
    }

    const handleOrderChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        changeOrder(e.target.value);
    }

    const handleOrderByAttr: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        changeAttr(e.target.value);
    }

    const handleAreaChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        changeArea(e.target.value);
    }

    const handleAreaConditionChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        changeAreaCondition(e.target.value);
    }


    return <div className="row">
        <div className="row">
            <div className="two columns">
                Region
            </div>
            <div className="three columns">
                <div className="six columns">
                    Order
                </div>
                <div className="six columns">
                    By
                </div>
            </div>
            <div className="three columns">
                <div className="six columns">
                    Area
                </div>
                <div className="six columns">
                    Condition
                </div>
            </div>
        </div>
        <div className="row">
            <div>
                <Select
                    className="two columns"
                    onChange={handleRegionChange}
                    defaultValue="All"
                    options={regions.map(region => ({ label: region, value: region }))}
                />
            </div>
            <div className="three columns">
                <div className="row">
                    <Select
                        className="six columns"
                        onChange={handleOrderChange}
                        defaultValue="asc"
                        options={["asc", "desc"].map(option => ({ label: option, value: option }))}
                    />
                    <Select
                        className="six columns"
                        onChange={handleOrderByAttr}
                        defaultValue={AttribOptions.NAME}
                        options={
                            (Object.keys(AttribOptions) as Array<keyof typeof AttribOptions>)
                                .map(attr => ({ label: AttribOptions[attr], value: AttribOptions[attr] }))
                        }
                    />
                </div>
            </div>
            <div className="three columns">
                <Select
                    className="six columns"
                    onChange={handleAreaChange}
                    defaultValue={""}
                    options={["none", "Lithuania"].map(option => ({ label: option, value: option }))}
                />
                <Select
                    className="six columns"
                    onChange={handleAreaConditionChange}
                    defaultValue=">"
                    options={[">", "<"].map(option => ({ label: option, value: option }))}
                />
            </div>

        </div>
    </div>
}

export default CountryFilter;
import { Country } from "../../types/index";
import styles from "../../styles/CountryCard.module.css";

interface Props {
    country: Country
}

const CountryCard: React.FC<Props> = ({ country }) => {
    const { name, region, area } = country;
    return <div className={styles.card}>
        <p>Name: {name.common}</p>
        <p>Region: {region}</p>
        <p>Area: {area}</p>
    </div>
}

export default CountryCard;
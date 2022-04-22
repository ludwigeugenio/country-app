import { useMemo } from "react";
import { CountryFilter, CountryCard } from "../components/country";
import useCountry from "../hooks/useCountry";
import usePagination from "../hooks/usePagination";
import styles from "../styles/CountryList.module.css";

const CountryList = () => {
  const countryHook = useCountry();
  const { countryList } = countryHook;
  const { paginatedData, currentPage, pages, pagesToShow, next, previous, jumpToPage, nextSet, isLastSet } = usePagination(countryList);

  const dataToRender = useMemo(() => paginatedData, [paginatedData])

  return <div className="container">
    <CountryFilter countryHook={countryHook} />
    <div className={styles["country-container"]}>
      {dataToRender.map(country =>
        <CountryCard key={country.name.common} country={country} />
      )}
    </div>
    <div className="row">
      <button className="two columns" onClick={previous} disabled={currentPage === 1}>Previous</button>
      <div className="eight columns">
        {pagesToShow.map(page =>
          <button key={page} className={`two columns ${page === currentPage && 'button-primary'}`} onClick={() => jumpToPage(page)}>{page}</button>
        )}
        {!isLastSet &&
          <button className="two columns" onClick={nextSet}>...</button>
        }
      </div>
      <button className="two columns" onClick={next} disabled={currentPage === pages}>Next</button>
    </div>
  </div >

}

export default CountryList;
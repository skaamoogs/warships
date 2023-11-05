import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";

import styles from "./App.module.scss";
import { IShip } from "./interfaces";
import { ShipList } from "./components/ship-list/ship-list";
import { GET_SHIPS } from "./apollo-client/queries";
import Pagination from "./components/pagination/pagination";
import { getUniqueValues } from "./utils/helpers";
import { Select } from "./components/select/select";

interface IFilters {
  level?: string;
  nation?: string;
  type?: string;
}

const SHIPS_PER_PAGE = 10;

function App() {
  const { loading, error, data } = useQuery<{ vehicles: IShip[] }>(GET_SHIPS);

  const [filters, setFilters] = useState<IFilters>({});
  const [filteredShips, setFilteredShips] = useState<IShip[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const maxPages = useMemo(
    () => Math.ceil(filteredShips.length / SHIPS_PER_PAGE),
    [filteredShips.length]
  );
  const [nations, levels, types] = useMemo(
    () => [
      getUniqueValues(data?.vehicles.map((v) => v.nation.title) ?? [], true),
      getUniqueValues(data?.vehicles.map((v) => v.level, true) ?? [], true),
      getUniqueValues(
        data?.vehicles.map((v) => v.type.title, true) ?? [],
        true
      ),
    ],
    [data]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    if (data) {
      let filteredData: IShip[] = data.vehicles;

      if (filters.level) {
        filteredData = filteredData.filter(
          (ship) => String(ship.level) === filters.level
        );
      }
      if (filters.nation) {
        filteredData = filteredData.filter(
          (ship) => ship.nation.title === filters.nation
        );
      }
      if (filters.type) {
        filteredData = filteredData.filter(
          (ship) => ship.type.title === filters.type
        );
      }

      setFilteredShips(filteredData);
    }
  }, [data, filters]);

  const indexOfLastShip = currentPage * SHIPS_PER_PAGE;
  const indexOfFirstShip = indexOfLastShip - SHIPS_PER_PAGE;
  const currentShips = filteredShips.slice(indexOfFirstShip, indexOfLastShip);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= maxPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading)
    return (
      <div className={styles.wrapper}>
        <div className={styles.loader}></div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>World of Warships</h1>
      <div className={styles.filters}>
        <Select
          value={filters.level}
          defaultOption="All levels"
          options={levels}
          onChange={(e) =>
            setFilters({
              ...filters,
              level: (e.target as HTMLSelectElement).value,
            })
          }
        />
        <Select
          value={filters.nation}
          defaultOption="All nations"
          options={nations}
          onChange={(e) =>
            setFilters({
              ...filters,
              nation: (e.target as HTMLSelectElement).value,
            })
          }
        />
        <Select
          value={filters.type}
          defaultOption="All types"
          options={types}
          onChange={(e) =>
            setFilters({
              ...filters,
              type: (e.target as HTMLSelectElement).value,
            })
          }
        />
      </div>
      {!!maxPages ? (
        <>
          <ShipList ships={currentShips} />
          <Pagination
            maxPages={maxPages}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      ) : (
        <p className={styles.text}>No results</p>
      )}
    </div>
  );
}

export default App;

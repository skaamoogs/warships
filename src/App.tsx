import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import styles from "./App.module.scss";
import { IShip } from "./interfaces";
import { ShipList } from "./components/ship-list/ship-list";
import { GET_SHIPS } from "./apollo-client/queries";

interface IFilters {
  level: string;
  nation: string;
  type: string;
}

function App() {
  const { loading, error, data } = useQuery(GET_SHIPS);
  console.log(data);
  const [filters, setFilters] = useState<IFilters>({
    level: "",
    nation: "",
    type: "",
  });
  const [filteredShips, setFilteredShips] = useState<IShip[]>([]);

  useEffect(() => {
    if (data) {
      let filteredData: IShip[] = data.vehicles;

      if (filters.level) {
        filteredData = filteredData.filter(
          (ship) => ship.level === filters.level
        );
      }
      if (filters.nation) {
        filteredData = filteredData.filter(
          (ship) => ship.nation.name === filters.nation
        );
      }
      if (filters.type) {
        filteredData = filteredData.filter(
          (ship) => ship.type.name === filters.type
        );
      }

      setFilteredShips(filteredData);
    }
  }, [data, filters]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <h1>World of Warships</h1>
      <div className={styles.filters}>
        <h2>Filters</h2>
        <select
          className={styles.select}
          value={filters.level}
          onChange={(e) => setFilters({ ...filters, level: e.target.value })}
        >
          <option value="">All Levels</option>
        </select>
        <select
          className={styles.select}
          value={filters.nation}
          onChange={(e) => setFilters({ ...filters, nation: e.target.value })}
        >
          <option value="">All Nations</option>
        </select>
        <select
          className={styles.select}
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">All Types</option>
        </select>
      </div>
      <ShipList
        ships={filteredShips.length > 0 ? filteredShips : data.vehicles}
      />
    </div>
  );
}

export default App;

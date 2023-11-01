import { IShip } from "../../interfaces";
import styles from "./ship-list.module.scss";

interface IShipListProps {
  ships: IShip[];
}

export const ShipList = ({ ships }: IShipListProps) => {
  return (
    <div className={styles.container}>
      {ships.map((ship, index) => (
        <div className={styles.ship} key={index}>
          <h2 className={styles.ship__title}>{ship.title}</h2>
          <p className={styles.ship__text}>Description: {ship.description}</p>
          <p className={styles.ship__text}>Level: {ship.level}</p>
          <p className={styles.ship__text}>Nation: {ship.nation.title}</p>
          <p className={styles.ship__text}>Type: {ship.type.title}</p>
          <img
            className={styles.ship__image}
            src={ship.icons.medium}
            alt={ship.title}
          />
        </div>
      ))}
    </div>
  );
};

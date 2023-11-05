import { HTMLProps } from "react";
import styles from "./select.module.scss";

export interface ISelect extends HTMLProps<HTMLSelectElement> {
  defaultOption: string;
  options: number[] | string[];
}

export const Select = ({
  value,
  onChange,
  defaultOption,
  options,
}: ISelect) => {
  return (
    <select className={styles.select} value={value} onChange={onChange}>
      <option value="">{defaultOption}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
};

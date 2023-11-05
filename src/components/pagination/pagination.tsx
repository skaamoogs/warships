import { useMemo } from "react";
import styles from "./pagination.module.scss";
import { getArrayFromNumRange } from "../../utils/helpers";

interface IPaginationProps {
  maxPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const MAX_VISIBLE_PAGES = 4;

const Pagination = ({ currentPage, maxPages, paginate }: IPaginationProps) => {
  const firstVisiblePage = useMemo(
    () =>
      Math.floor((currentPage - 1) / MAX_VISIBLE_PAGES) * MAX_VISIBLE_PAGES + 1,
    [currentPage]
  );
  const lastVisiblePage = Math.min(
    firstVisiblePage + MAX_VISIBLE_PAGES,
    maxPages + 1
  );

  const pageNumbers: number[] = useMemo(
    () => getArrayFromNumRange(firstVisiblePage, lastVisiblePage, 1),
    [firstVisiblePage, lastVisiblePage]
  );

  return (
    <ul className={styles.pagination}>
      <li className={styles.pagination__item}>
        <button
          className={styles.pagination__button}
          onClick={() => paginate(1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
      </li>
      <li className={styles.pagination__item}>
        <button
          className={styles.pagination__button}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
      </li>
      {pageNumbers.map((number) => (
        <li className={styles.pagination__item} key={number}>
          <button
            className={
              number === currentPage
                ? `${styles.pagination__button} ${styles.pagination__button_active}`
                : styles.pagination__button
            }
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        </li>
      ))}
      <li className={styles.pagination__item}>
        <button
          className={styles.pagination__button}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === maxPages}
        >
          {">"}
        </button>
      </li>
      <li className={styles.pagination__item}>
        <button
          className={styles.pagination__button}
          onClick={() => paginate(maxPages)}
          disabled={currentPage === maxPages}
        >
          {">>"}
        </button>
      </li>
    </ul>
  );
};

export default Pagination;

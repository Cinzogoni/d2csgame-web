import styles from "../PriceRangeFilter/PriceRangeFilter.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { useState, useEffect } from "react";

interface PriceRangeFilterType {
  range: [number, number];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function PriceRangeFilter({ range, handleChange }: PriceRangeFilterType) {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("price")}>
        <h4>{range[0].toLocaleString()}</h4>
      </div>

      <div className={cx("price")}>
        <h4 className={cx("price")}>{range[1].toLocaleString()}</h4>
      </div>

      <div className={cx("price-bar")}>
        <input
          className={cx("range-slider")}
          type="range"
          min="0"
          max="2000000"
          step="1000"
          value={range[0]}
          name="min"
          onChange={handleChange}
        />
        <input
          className={cx("range-slider")}
          type="range"
          min="0"
          max="2000000"
          step="1000"
          value={range[1]}
          name="max"
          onChange={handleChange}
        />

        <div
          className={cx("range-highlight")}
          style={{
            left: `${(range[0] / 2000000) * 50}%`,
            width: `${50 + ((range[1] - range[0]) / 2000000) * 50}%`,
          }}
        />
        <div />
      </div>
    </div>
  );
}

export default PriceRangeFilter;

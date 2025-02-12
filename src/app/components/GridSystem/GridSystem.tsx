import styles from "../GridSystem/GridSystem.module.scss";
import classNames from "classnames/bind";
import { ReactNode, memo } from "react";

interface GridSystemProps {
  children?: ReactNode;
  gridClass?: string;
  wideClass?: string;
  rowClass?: string;
  colClass?: string;
  colL?: string;
  colML?: string;
  colM?: string;
  colSM?: string;
  colS?: string;
  colMo?: string;
  colMi?: string;
}

const cx = classNames.bind(styles);

function GridSystem({
  children,
  gridClass,
  wideClass,
  rowClass,
  colClass,
  colL,
  colML,
  colM,
  colSM,
  colS,
  colMo,
  colMi,
}: GridSystemProps) {
  const classes = cx(
    gridClass,
    wideClass,
    rowClass,
    colClass,
    colL,
    colML,
    colM,
    colSM,
    colS,
    colMo,
    colMi
  );

  return <div className={classes}>{children}</div>;
}

export default memo(GridSystem);

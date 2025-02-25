import styles from "./UserName.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function UserName() {
  return <div className={cx("wrapper")}></div>;
}

export default UserName;

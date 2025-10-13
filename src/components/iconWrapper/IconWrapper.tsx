import styles from "./IconWrapper.module.scss";
import { IIconWrapper } from "./IIconWrapper";

const IconWrapper = ({
  children,
  onClick,
  size = "medium",
  hoverEffect = true,
  className = "",
}: IIconWrapper) => {
  const sizeClass = styles[`size-${size}`];

  return (
    <div
      className={`${styles["icon-wrapper"]} ${sizeClass} ${
        hoverEffect ? styles["hover-effect"] : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default IconWrapper;

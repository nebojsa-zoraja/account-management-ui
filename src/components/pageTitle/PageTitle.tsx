import { Dispatch, SetStateAction } from "react";
import { ReactComponent as BackSvg } from "../../svg/back.svg";
import styles from "./PageTitle.module.scss";
import { useNavigate } from "react-router-dom";
import { buttonIcons } from "../../utils/icons/managementIconArray";
import IconWrapper from "../iconWrapper/IconWrapper";

interface IPageTitle {
  page: string;
  name?: string;
  isEditAvailable?: boolean;
  isAddNewAvailable?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  hasBack?: boolean;
}

const PageTitle = ({
  page,
  name,
  isEditAvailable = false,
  isAddNewAvailable = true,
  setIsOpen,
  hasBack = false,
}: IPageTitle) => {
  const navigate = useNavigate();

  return (
    <div className={styles["title-wrapper"]}>
      <div className={styles["title-section"]}>
        {hasBack && (
          <IconWrapper onClick={() => navigate(-1)}>
            <BackSvg className={styles["back-icon"]} />
          </IconWrapper>
        )}
        <div className={styles["title"]}>
          {page}: {name && name}
        </div>
      </div>
      <div className={styles["button-section"]}>
        {buttonIcons(styles, setIsOpen, isEditAvailable, isAddNewAvailable).map(
          ({ id, Component, onClick, className, display }) =>
            display && (
              <IconWrapper key={id} onClick={onClick} size="small">
                <Component className={className} />
              </IconWrapper>
            )
        )}
      </div>
    </div>
  );
};

export default PageTitle;

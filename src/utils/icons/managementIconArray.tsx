import { Dispatch, SetStateAction } from "react";
import { ReactComponent as EditSvg } from "../../svg/edit.svg";
import { ReactComponent as AddNewSvg } from "../../svg/add-new.svg";

export const buttonIcons = (
  styles: StylesType,
  setIsOpen: Dispatch<SetStateAction<boolean>> | undefined,
  displayEdit: boolean | undefined,
  displayAddNew: boolean | undefined
) => [
  {
    id: "edit",
    Component: EditSvg,
    onClick: () => setIsOpen && setIsOpen((x) => !x),
    className: styles["edit-icon"],
    display: displayEdit,
  },
  {
    id: "add-new",
    Component: AddNewSvg,
    onClick: () => setIsOpen && setIsOpen((x) => !x),
    className: styles["add-new-icon"],
    display: displayAddNew,
  },
];

type StylesType = {
  readonly [key: string]: string;
};

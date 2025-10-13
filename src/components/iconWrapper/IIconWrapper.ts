import { MouseEvent, ReactElement } from "react";

export interface IIconWrapper {
  children: ReactElement;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  size?: "small" | "medium" | "large";
  hoverEffect?: boolean;
  className?: string;
}

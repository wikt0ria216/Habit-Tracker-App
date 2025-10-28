import { ReactNode } from "react";

export interface MenuOption {
  id: string;
  label: string;
  onSelect: () => void;
  icon?: ReactNode;
}

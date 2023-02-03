import { ReactNode } from "react";

export interface SnackbarProps {
  title?: string;
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
}

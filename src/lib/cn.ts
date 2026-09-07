import clsx, { type ClassValue } from "clsx";

/** Single class-composition helper for the whole system. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

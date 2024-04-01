import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeAndSeparate(str: string): string {
  let newStr = str.split("-");
  for (let i = 0; i < newStr.length; i++) {
    newStr[i] = newStr[i][0].toUpperCase() + newStr[i].substring(1);
  }
  return newStr.join(" ");
}

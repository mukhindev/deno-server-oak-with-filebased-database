import {
  bgYellow,
  bgGreen,
  bgRed,
  bgCyan,
  black,
  green,
  red,
} from "https://deno.land/std/fmt/colors.ts";

export const success = (str: string | number) => {
  return bgGreen(black(str.toString()));
};

export const warning = (str: string | number) => {
  return bgYellow(black(str.toString()));
};

export const error = (str: string | number) => {
  return bgRed(black(str.toString()));
};

export const info = (str: string | number) => {
  return bgCyan(black(str.toString()));
};

export const textSuccess = (str: string | number) => {
  return green(str.toString());
};

export const textError = (str: string | number) => {
  return red(str.toString());
};

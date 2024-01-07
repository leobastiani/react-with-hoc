export type WithComponentOptions = {
  hiddenByDefault?: boolean;
} & (
  | {
      pick?: string[];
      omit?: undefined;
    }
  | {
      omit?: string[];
      pick?: undefined;
    }
);

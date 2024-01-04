import { withPropMultiple } from "./withPropMultiple";
import { withPropSingleByFactory } from "./withPropSingleByFactory";
import { withPropSingleByValue } from "./withPropSingleByValue";

// @ts-expect-error it's valid
export const withProp: typeof withPropMultiple &
  typeof withPropSingleByFactory &
  typeof withPropSingleByValue = (
  ...args:
    | Parameters<typeof withPropMultiple>
    | Parameters<typeof withPropSingleByFactory>
    | Parameters<typeof withPropSingleByValue>
) => {
  if (args.length === 1) {
    return withPropMultiple(...args);
  }
  if (args.length === 3) {
    return withPropSingleByFactory(...args);
  }
  return withPropSingleByValue(...args);
};

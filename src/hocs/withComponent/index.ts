import { withComponentMultiple } from "./withComponentMultiple";
import { withComponentSingle } from "./withComponentSingle";

// @ts-expect-error it's fine
export const withComponent: typeof withComponentSingle &
  typeof withComponentMultiple = (
  ...args:
    | Parameters<typeof withComponentSingle>
    | Parameters<typeof withComponentMultiple>
) => {
  if (args.length === 3) {
    return withComponentSingle(...args);
  }
  // @ts-expect-error it's fine
  return withComponentMultiple(...args);
};

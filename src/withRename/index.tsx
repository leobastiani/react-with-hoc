import { withRenameMultiple } from "./withRenameMultiple";
import { withRenameSingle } from "./withRenameSingle";

export const withRename: typeof withRenameSingle & typeof withRenameMultiple = (
  ...args:
    | Parameters<typeof withRenameSingle>
    | Parameters<typeof withRenameMultiple>
) => {
  if (args.length === 2) {
    return withRenameSingle(...args);
  }
  return withRenameMultiple(...args);
};

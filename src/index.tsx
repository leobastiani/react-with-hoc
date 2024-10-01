// Hocs
export { withBody } from "./hocs/withBody";
export { withDefault } from "./hocs/withDefault";
export { withDefaults } from "./hocs/withDefaults";
export { withDisplayName } from "./hocs/withDisplayName";
export { withFactory } from "./hocs/withFactory";
export { withForEach } from "./hocs/withForEach";
export { withHocs } from "./hocs/withHocs";
export { withIf } from "./hocs/withIf";
export { withOmit } from "./hocs/withOmit";
export { withOverride } from "./hocs/withOverride";
export { withOverrides } from "./hocs/withOverrides";
export { withPick } from "./hocs/withPick";
export { withRename } from "./hocs/withRename";
export { withRenames } from "./hocs/withRenames";
export { withSpread } from "./hocs/withSpread";
export { withState } from "./hocs/withState";
export { withWrapper } from "./hocs/withWrapper";

// Types
export type { DependencyNames } from "./types/DependencyNames";
export type {
  Call,
  Fn,
  FromSchema,
  HasAllPropsFn,
  IfThenFn,
  IntersectionFn,
  KeepNeversFn,
  OmitFn,
  PartialOnUndefined,
  PickFn,
  Pipe,
  ReplaceFn,
  SetOptionalFn,
  Simplify,
  ToSchema,
  UnionFn,
} from "./types/Fn";
export type { Hoc } from "./types/Hoc";
export type { PartialComponent } from "./types/PartialComponent";

// Utils
export { componentDisplayName } from "./utils/componentDisplayName";
export type { HocNameFactory } from "./utils/hocNameForWithStyle";
export {
  createHocNameFunction,
  defaultHocName,
} from "./utils/hocNameForWithStyle";
export type { GetHocArgs, HocDefinition, NewHocReturn } from "./utils/newHoc";
export { newHoc } from "./utils/newHoc";

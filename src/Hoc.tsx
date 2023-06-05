import { Call, Fn } from "hotscript";
import { ComponentType, FunctionComponent } from "react";
import { SimplifyComponentProps } from "./@types/NormalizeObject";

export type Hoc<FnApplier extends Fn> = FnApplier &
  (<Props extends {}>(
    Component: ComponentType<Props>
  ) => FunctionComponent<SimplifyComponentProps<Call<FnApplier, Props>>>);

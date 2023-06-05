import { Call, Fn } from "hotscript";
import { ComponentType, FunctionComponent } from "react";
import { NormalizeObject } from "./@types/NormalizeObject";

export type Hoc<FnApplier extends Fn> = FnApplier &
  (<Props extends {}>(
    Component: ComponentType<Props>
  ) => FunctionComponent<NormalizeObject<Call<FnApplier, Props>>>);

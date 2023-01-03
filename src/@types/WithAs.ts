import { SpreadObject } from "./SpreadObject";

export type WithAs<
  T extends {},
  ComponentKey extends string = "Component"
> = SpreadObject<
  T,
  {
    [key in ComponentKey]: React.ElementType<T>;
  }
>;

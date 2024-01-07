import React, { ComponentType, isValidElement } from "react";

export function getTargetByProps({
  props,
  name,
  TargetComponent,
  options,
}: {
  props: any;
  name: string;
  TargetComponent: ComponentType;
  options: any;
}): any {
  if (typeof props[name] === "function") {
    return props[name](TargetComponent);
  }
  if (
    typeof props[name] === "object" &&
    props[name] !== null &&
    !isValidElement(props[name])
  ) {
    return function FromPropObject(myProps: any): any {
      return <TargetComponent {...myProps} {...props[name]} />;
    };
  }
  if (options.hiddenByDefault) {
    if (props[name] === true) {
      return TargetComponent;
    }
    if (!props[name]) {
      return function Null() {
        return null;
      };
    }
  }
  if (name in props) {
    return function FromProp(): any {
      return props[name];
    };
  }

  return TargetComponent;
}

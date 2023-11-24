/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ComponentType,
  FunctionComponent,
  isValidElement,
  useMemo,
} from "react";
import { Fn, FromSchema, Pipe, ReplaceFn, ToSchema } from "../Fn";
import { Hoc } from "../Hoc";
import { componentDisplayName } from "../lib/componentDisplayName";
import { newHoc } from "../newHoc";
import { WithComponent } from "../types/WithComponent";

interface WithComponentFn<
  Name extends string,
  PropsSchema extends [string | number | symbol, any]
> extends Fn {
  return: Pipe<
    this["arg0"],
    [ReplaceFn<[Name, WithComponent<FromSchema<PropsSchema>> | undefined]>]
  >;
}

type WithComponentHoc = <Name extends string, Props extends object>(
  name: Name,
  body: ComponentType<Props>,
  options?: { hiddenByDefault?: boolean } & (
    | { pick?: string[]; omit?: undefined }
    | { omit?: string[]; pick?: undefined }
  )
) => Hoc<[WithComponentFn<Name, ToSchema<Props>>]>;

function parsePropsByPick(props: any, pick: Set<string>): any {
  const ret: any = {};
  for (const key in props) {
    if (pick.has(key)) {
      ret[key] = props[key];
    }
  }
  return ret;
}

function parsePropsByOmit(props: any, omit: Set<string>): any {
  const ret: any = {};
  for (const key in props) {
    if (omit.has(key)) {
      continue;
    }
    ret[key] = props[key];
  }
  return ret;
}

export const withComponentSingle = newHoc<WithComponentHoc>(
  function withComponent(
    Component: ComponentType,
    name: string,
    TargetComponent: ComponentType,
    options: any = {}
  ): FunctionComponent {
    if (process.env.NODE_ENV !== "production") {
      if (options.omit && options.pick) {
        throw new Error(
          "Don't use withComponent with pick and omit at the same time"
        );
      }
    }

    let set: Set<string>;
    if (options.pick) {
      set = new Set(options.pick);
    } else if (options.omit) {
      set = new Set(options.omit);
    }

    const parseProps = ((): any => {
      if (options.pick) {
        return (props: any) => parsePropsByPick(props, set);
      } else if (options.omit) {
        return (props: any) => parsePropsByOmit(props, set);
      }
      return (props: any) => props;
    })();

    return function WithComponent(props: any): JSX.Element {
      const TargetByProps = useMemo(
        () => getTargetByProps({ props, name, TargetComponent, options }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props[name]]
      );
      const CurrTarget = (myProps: any): any => (
        <TargetByProps {...parseProps(props)} {...myProps} />
      );
      if (process.env.NODE_ENV !== "production") {
        componentDisplayName.set(`${name}.withComponent`, CurrTarget);
      }

      return (
        <Component
          {...props}
          {...{
            [name]: CurrTarget,
          }}
        />
      );
    };
  }
);

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

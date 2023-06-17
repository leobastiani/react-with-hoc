/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ComposeLeft, Objects } from "hotscript";
import { ComponentType, Fragment, FunctionComponent, useMemo } from "react";
import { isElement } from "react-is";
import { PartialBy } from "./@types/PartialBy";
import { PartialComponent } from "./@types/PartialComponent";
import { WithComponent } from "./@types/WithComponent";
import { Hoc } from "./Hoc";
import { componentDisplayName } from "./componentDisplayName";
import { newHoc } from "./newHoc";

type WithComponentHoc = <
  Name extends string,
  TargetComponent extends ComponentType<any>
>(
  name: Name,
  component: TargetComponent,
  options?: { hiddenByDefault?: boolean } & (
    | { pick?: string[] }
    | { omit?: string[] }
  )
) => Hoc<
  ComposeLeft<
    [
      Objects.Update<
        Name,
        WithComponent<
          TargetComponent extends ComponentType<infer P> ? P : never
        >
      >,
      PartialBy<Name>
    ]
  >
>;

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

export const withComponent = newHoc(function withComponent(
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
}) as WithComponentHoc;

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
    !isElement(props[name])
  ) {
    // eslint-disable-next-line react/display-name
    return (myProps: any): any => (
      <TargetComponent {...myProps} {...props[name]} />
    );
  }
  if (options.hiddenByDefault) {
    if (!props[name]) {
      // eslint-disable-next-line react/display-name
      return (): any => <></>;
    } else if (props[name] === true) {
      return TargetComponent;
    }
  }
  if (name in props) {
    return (): any => props[name];
  }

  return TargetComponent;
}

function ButtonComponent(props: { size: "lg" | "md" | "xs" }): JSX.Element {
  return <button>{props.size}</button>;
}
function ButtonComponent2(props: {
  size: "lg" | "md" | "xs";
  disabled?: boolean;
}): JSX.Element {
  return <button>{props.size}</button>;
}
function ButtonComponent3(props: {
  size: "lg" | "md" | "xs";
  disabled: boolean;
}): JSX.Element {
  return <button>{props.size}</button>;
}
function Example({
  Button,
}: {
  Button: PartialComponent<typeof ButtonComponent>;
}): JSX.Element {
  return <Button />;
}

const withedComponent = withComponent("Button", ButtonComponent);
const NewExample = withedComponent(Example);
<NewExample Button={{ size: "lg" }} />;
<NewExample Button={null} />;
<NewExample Button={false} />;
<NewExample Button={true} />;
<NewExample Button={() => ButtonComponent2} />;
<NewExample Button={() => ButtonComponent} />;
<NewExample Button={(Button) => Button} />;
// @ts-expect-error
<NewExample Button={() => ButtonComponent3} />;
// @ts-expect-error
<NewExample Button={() => Fragment} />;
const NoneComponent: React.FC = () => <></>;
<NewExample Button={() => NoneComponent} />;
<NewExample Button={10} />;
<NewExample Button={<ButtonComponent size="lg" />} />;

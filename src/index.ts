import {
  ComponentType,
  Dispatch,
  FunctionComponent,
  SetStateAction,
} from 'react';
import { CamelCase } from 'type-fest';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HOCs {}

export declare const someProp: unique symbol;

export function functionWithName<
  Name extends string,
  T extends (...args: any[]) => any,
>(name: Name, fn: T): T & { name: Name } & { [someProp]: number } {
  // @ts-expect-error name is not a property of the function
  return {
    [name](...args: any) {
      return fn.call(this, ...args);
    },
  }[name];
}

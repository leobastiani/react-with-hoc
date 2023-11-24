/* eslint-disable @typescript-eslint/explicit-function-return-type */

type Repeat5<T extends any[]> = [...T, ...T, ...T, ...T, ...T];
type Repeat10<T extends any[]> = [...Repeat5<T>, ...Repeat5<T>];
type Repeat25<T extends any[]> = [
  ...Repeat10<T>,
  ...Repeat10<T>,
  ...Repeat5<T>
];
type Repeat50<T extends any[]> = [...Repeat25<T>, ...Repeat25<T>];
type Repeat75<T extends any[]> = [...Repeat50<T>, ...Repeat25<T>];
type Repeat100<T extends any[]> = [...Repeat75<T>, ...Repeat25<T>];
type Repeat125<T extends any[]> = [...Repeat100<T>, ...Repeat25<T>];
type Repeat150<T extends any[]> = [...Repeat125<T>, ...Repeat25<T>];
type Repeat175<T extends any[]> = [...Repeat150<T>, ...Repeat25<T>];
type Repeat200<T extends any[]> = [...Repeat175<T>, ...Repeat25<T>];
type Repeat225<T extends any[]> = [...Repeat200<T>, ...Repeat25<T>];
type Repeat250<T extends any[]> = [...Repeat225<T>, ...Repeat25<T>];
type Repeat275<T extends any[]> = [...Repeat250<T>, ...Repeat25<T>];
type Repeat300<T extends any[]> = [...Repeat275<T>, ...Repeat25<T>];
type Repeat325<T extends any[]> = [...Repeat300<T>, ...Repeat25<T>];
type Repeat350<T extends any[]> = [...Repeat325<T>, ...Repeat25<T>];
type Repeat375<T extends any[]> = [...Repeat350<T>, ...Repeat25<T>];
type Repeat400<T extends any[]> = [...Repeat375<T>, ...Repeat25<T>];
type Repeat425<T extends any[]> = [...Repeat400<T>, ...Repeat25<T>];
type Repeat450<T extends any[]> = [...Repeat425<T>, ...Repeat25<T>];
type Repeat475<T extends any[]> = [...Repeat450<T>, ...Repeat25<T>];
type Repeat500<T extends any[]> = [...Repeat475<T>, ...Repeat25<T>];
type Repeat525<T extends any[]> = [...Repeat500<T>, ...Repeat25<T>];
type Repeat550<T extends any[]> = [...Repeat525<T>, ...Repeat25<T>];
type Repeat575<T extends any[]> = [...Repeat550<T>, ...Repeat25<T>];
type Repeat600<T extends any[]> = [...Repeat575<T>, ...Repeat25<T>];
type Repeat625<T extends any[]> = [...Repeat600<T>, ...Repeat25<T>];
type Repeat650<T extends any[]> = [...Repeat625<T>, ...Repeat25<T>];
type Repeat675<T extends any[]> = [...Repeat650<T>, ...Repeat25<T>];
type Repeat700<T extends any[]> = [...Repeat675<T>, ...Repeat25<T>];
type Repeat725<T extends any[]> = [...Repeat700<T>, ...Repeat25<T>];
type Repeat750<T extends any[]> = [...Repeat725<T>, ...Repeat25<T>];
type Repeat775<T extends any[]> = [...Repeat750<T>, ...Repeat25<T>];
type Repeat800<T extends any[]> = [...Repeat775<T>, ...Repeat25<T>];
type Repeat825<T extends any[]> = [...Repeat800<T>, ...Repeat25<T>];
type Repeat850<T extends any[]> = [...Repeat825<T>, ...Repeat25<T>];
type Repeat875<T extends any[]> = [...Repeat850<T>, ...Repeat25<T>];
type Repeat900<T extends any[]> = [...Repeat875<T>, ...Repeat25<T>];
type Repeat925<T extends any[]> = [...Repeat900<T>, ...Repeat25<T>];
type Repeat950<T extends any[]> = [...Repeat925<T>, ...Repeat25<T>];

export function halfStress<T>(t: T): Repeat475<[T]>;
export function halfStress(...t: any[]) {
  return t;
}

export function stress<T>(t: T): Repeat950<[T]>;
export function stress<T, U>(t: T, u: U): Repeat475<[T, U]>;
export function stress(...t: any[]) {
  return t;
}

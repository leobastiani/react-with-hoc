/* eslint-disable @typescript-eslint/explicit-function-return-type */

type Repeat10<T> = [T, T, T, T, T, T, T, T, T, T];
type Repeat50<T> = [
  ...Repeat10<T>,
  ...Repeat10<T>,
  ...Repeat10<T>,
  ...Repeat10<T>,
  ...Repeat10<T>
];
export function repeat10<T>(t: T) {
  return new Array<T>(10).fill(t) as Repeat10<T>;
}
export function repeat50<T>(t: T) {
  return new Array<T>(50).fill(t) as Repeat50<T>;
}

type Repeat100<T> = [...Repeat50<T>, ...Repeat50<T>];
export function repeat100<T>(t: T) {
  return new Array<T>(100).fill(t) as Repeat100<T>;
}

type Repeat150<T> = [...Repeat100<T>, ...Repeat50<T>];
export function repeat150<T>(t: T) {
  return new Array<T>(150).fill(t) as Repeat150<T>;
}

type Repeat200<T> = [...Repeat150<T>, ...Repeat50<T>];
export function repeat200<T>(t: T) {
  return new Array<T>(200).fill(t) as Repeat200<T>;
}

type Repeat250<T> = [...Repeat200<T>, ...Repeat50<T>];
export function repeat250<T>(t: T) {
  return new Array<T>(250).fill(t) as Repeat250<T>;
}

type Repeat300<T> = [...Repeat250<T>, ...Repeat50<T>];
export function repeat300<T>(t: T) {
  return new Array<T>(300).fill(t) as Repeat300<T>;
}

type Repeat350<T> = [...Repeat300<T>, ...Repeat50<T>];
export function repeat350<T>(t: T) {
  return new Array<T>(350).fill(t) as Repeat350<T>;
}

type Repeat400<T> = [...Repeat350<T>, ...Repeat50<T>];
export function repeat400<T>(t: T) {
  return new Array<T>(400).fill(t) as Repeat400<T>;
}

type Repeat450<T> = [...Repeat400<T>, ...Repeat50<T>];
export function repeat450<T>(t: T) {
  return new Array<T>(450).fill(t) as Repeat450<T>;
}

type Repeat500<T> = [...Repeat450<T>, ...Repeat50<T>];
export function repeat500<T>(t: T) {
  return new Array<T>(500).fill(t) as Repeat500<T>;
}

type Repeat550<T> = [...Repeat500<T>, ...Repeat50<T>];
export function repeat550<T>(t: T) {
  return new Array<T>(550).fill(t) as Repeat550<T>;
}

type Repeat600<T> = [...Repeat550<T>, ...Repeat50<T>];
export function repeat600<T>(t: T) {
  return new Array<T>(600).fill(t) as Repeat600<T>;
}

type Repeat650<T> = [...Repeat600<T>, ...Repeat50<T>];
export function repeat650<T>(t: T) {
  return new Array<T>(650).fill(t) as Repeat650<T>;
}

type Repeat700<T> = [...Repeat650<T>, ...Repeat50<T>];
export function repeat700<T>(t: T) {
  return new Array<T>(700).fill(t) as Repeat700<T>;
}

type Repeat750<T> = [...Repeat700<T>, ...Repeat50<T>];
export function repeat750<T>(t: T) {
  return new Array<T>(750).fill(t) as Repeat750<T>;
}

type Repeat800<T> = [...Repeat750<T>, ...Repeat50<T>];
export function repeat800<T>(t: T) {
  return new Array<T>(800).fill(t) as Repeat800<T>;
}

type Repeat850<T> = [...Repeat800<T>, ...Repeat50<T>];
export function repeat850<T>(t: T) {
  return new Array<T>(850).fill(t) as Repeat850<T>;
}

type Repeat900<T> = [...Repeat850<T>, ...Repeat50<T>];
export function repeat900<T>(t: T) {
  return new Array<T>(900).fill(t) as Repeat900<T>;
}

type Repeat950<T> = [...Repeat900<T>, ...Repeat50<T>];
export function repeat950<T>(t: T) {
  return new Array<T>(950).fill(t) as Repeat950<T>;
}

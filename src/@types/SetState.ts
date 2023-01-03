import { Dispatch, SetStateAction } from "react";

export type SetState<PropValue> = Dispatch<SetStateAction<PropValue>>;

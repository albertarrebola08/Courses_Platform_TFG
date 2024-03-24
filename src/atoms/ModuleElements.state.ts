import { atom } from "recoil";
// para el albert del futuro: https://recoiljs.org/docs/introduction/getting-started
export const ModuleInfoState = atom({
  key: "ModuleInfoState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

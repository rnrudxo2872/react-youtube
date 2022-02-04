import { atom } from "recoil";
import DParser from "../services/domParser";

export const DparserAtom = atom({
  key: "domParser",
  default: new DParser(),
});

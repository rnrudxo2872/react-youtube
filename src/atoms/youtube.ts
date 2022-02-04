import { atom } from "recoil";
import Youtube from "../services/youtube";

export const youtubeAtom = atom({
  key: "youtubeAtom",
  default: new Youtube(),
});

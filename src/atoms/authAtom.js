import { atom } from "recoil";

const authAtom = atom({
  key: "auth",
  default: "login",
});

export default authAtom;

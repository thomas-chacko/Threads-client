import { atom } from "recoil";

const userAtom = atom({
  key: "user",
  default: JSON.parse(sessionStorage.getItem("user")),
});

export default userAtom;

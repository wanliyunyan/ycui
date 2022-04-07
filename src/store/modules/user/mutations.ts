import { IUserState } from "./state";
import { IUser } from "@/api/user/type";

export const mutations = {
  setUser: (state: IUserState, payload: IUser): void => {
    state.user = payload;
  },
};

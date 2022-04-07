import { IUser } from "@/api/user/type";

export type IUserState = {
  user: IUser;
};

export const state: IUserState = {
  user: {
    agent_id: "",
    id: "",
    last_login: "",
    loginname: "",
    menu: {
      name: "",
      icon: "",
      children: {},
    },
    merchant_id: "",
    operator_id: "",
    permission: { role: {}, photo: 0, realname: "" },
    photo: 0,
    realname: "",
    role: { id: "", type: 0, name: "", code: "" },
    school_id: "",
    schools: undefined,
    token: "",
  },
};

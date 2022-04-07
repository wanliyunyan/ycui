import { IAsyncRouteState } from "@/store/modules/async-route/state";
import { IUserState } from "@/store/modules/user/state";

export interface IStore {
  asyncRoute: IAsyncRouteState;
  login: IUserState;
}

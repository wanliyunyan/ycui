import { isNavigationFailure, Router } from "vue-router";
import store from "@/store";
// import NProgress from "nprogress"; // progress bar
// import { ACCESS_TOKEN } from "@/store/mutation-types";
// import { storage } from "@/utils/Storage";
// import { debounce } from "lodash-es";

// NProgress.configure({ showSpinner: false }); // NProgress Configuration

const allowList = ["index", "index-home", "login", "error", "error-404"]; // no redirect whitelist
// const noOpen = ["index", "user", "error", "error-404"]; // no redirect whitelist

const loginRoutePath = "/user";
export const defaultRoutePath = "/index";

// 是否需要从后端获取菜单
// const isGetMenus = debounce(
//   ({ to, from, next, hasRoute }) => {
//     store
//       .dispatch("asyncRoute/generateRoutes")
//       .then(() => {
//         // 根据roles权限生成可访问的路由表
//         // 动态添加可访问路由表
//         if (allowList.includes(to.name as string)) return;
//
//         if (!hasRoute) {
//           // 请求带有 redirect 重定向时，登录自动重定向到该地址
//           const redirect = decodeURIComponent((from.query.redirect || "") as string);
//           if (to.path === redirect) {
//             next({ ...to, replace: true });
//           } else {
//             // 跳转到目的路由
//             next({ ...to, replace: true });
//           }
//         }
//       })
//       .catch(() => next({ path: defaultRoutePath }));
//   },
//   1800,
//   { leading: true }
// );

export function createRouterGuards(router: Router) {
  router.beforeEach((to, from, next) => {
    // const token = localStorage.getItem("openid"); // TODO
    const token = "storage.get(ACCESS_TOKEN)";
    // const token = undefined;
    if (token) {
      if (to.name === "login") {
        // if (localStorage.getItem("userId")) {
        //   next({ path: defaultRoutePath });
        // } else {
        //   next();
        // }

        next();
      } else {
        const hasRoute = router.hasRoute(to.name!);
        // 防抖获取菜单 TODO 暂时不需要
        // isGetMenus({ to, from, next, hasRoute });

        if (allowList.includes(to.name as string) || hasRoute) {
          // 在免登录名单，直接进入
          next();
        }

        if (to.path.includes("noOpen")) {
          // Toast("未开放");
        }
      }
    } else {
      // not user
      if (allowList.includes(to.name as string)) {
        // 在免登录名单，直接进入
        next();
      } else {
        next({ path: loginRoutePath, query: { redirect: to.fullPath }, replace: true });
      }
    }
  });

  router.afterEach((to, from, failure) => {
    document.title = (to?.meta?.title as string) || document.title;
    if (isNavigationFailure(failure)) {
      console.log("failed navigation", failure);
    }
    // 在这里设置需要缓存的组件名称
    const { keepAliveComponents } = store.state.asyncRoute;
    const currentComName = to.matched.find((item) => item.name === to.name)?.components?.default
      .name;
    if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
      // 需要缓存的组件
      keepAliveComponents.push(currentComName);
    } else if (!to.meta?.keepAlive) {
      // 不需要缓存的组件 暂时注释掉

      const index = keepAliveComponents.findIndex((name) => name === currentComName);
      if (index !== -1) {
        keepAliveComponents.splice(index, 1);
      }

      // TODO 暂时这么写
      if (to.name === currentComName) {
        const indexCurrentComName = keepAliveComponents.findIndex((name) => name === from.name);
        if (indexCurrentComName !== -1) {
          keepAliveComponents.splice(indexCurrentComName, 1);
        }
        // keepAliveComponents.splice(0, keepAliveComponents.length);
      }
    }
    store.commit("asyncRoute/setKeepAliveComponents", keepAliveComponents);
    // NProgress.done(); // finish progress bar
  });

  router.onError((error) => {
    console.log(error, "路由错误");
  });
}

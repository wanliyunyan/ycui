/** 最后再核对版本
 * @description 请求封装，对外暴露了get、post、put、del四个方法及axios实例
 */
import axios from "axios";
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";

import { handleData } from "@/utils/utils";
import { promiseApi, IOption, ApiReturnType } from "@/api/BasicResponseModel";
import { RequestEnum } from "@/enums/httpEnum";

const instance: AxiosInstance = axios.create();

const fetch = <T>(
  url: string,
  options: IOption,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ApiReturnType<T>>> => {
  const { method = "get", param } = options;
  switch (method.toLowerCase()) {
    case "get":
      return instance.get(url, config);
    case "delete":
      return instance.delete(url, config);
    case "head":
      return instance.head(url, config);
    case "post":
      return instance.post(url, param, config);
    case "put":
      return instance.put(url, param, config);
    case "patch":
      return instance.patch(url, param, config);
    default:
      return instance(options);
  }
};

/**
 * @description 请求
 * @param url
 * @param options
 * @param config
 */
const request = async <T>(
  url: string,
  options: IOption,
  config?: AxiosRequestConfig
): promiseApi<T> => handleData<T>(await fetch<T>(url, options, config));

/**
 * @description get请求
 * @param url
 * @param param
 * @param config
 */
export const get = <T>(
  url: string,
  param?: Record<string, unknown>,
  config?: AxiosRequestConfig
): promiseApi<T> => request<T>(url, { ...param, method: RequestEnum.GET }, config);

/**
 * @description post请求
 * @param url
 * @param param
 * @param config
 */
export const post = <T>(
  url: string,
  param?: Record<string, unknown>,
  config?: AxiosRequestConfig
): promiseApi<T> => request<T>(url, { ...param, method: RequestEnum.POST }, config);

/**
 * @description put请求
 * @param url
 * @param param
 * @param config
 */
export const put = <T>(
  url: string,
  param?: Record<string, unknown>,
  config?: AxiosRequestConfig
): promiseApi<T> => request<T>(url, { ...param, method: RequestEnum.PUT }, config);

/**
 * @description del请求
 * @param url
 * @param param
 * @param config
 */
export const del = <T>(
  url: string,
  param?: Record<string, unknown>,
  config?: AxiosRequestConfig
): promiseApi<T> => request<T>(url, { ...param, method: RequestEnum.DELETE }, config);

// http request 拦截器
instance.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, status } = response;
    const msg = data?.msg || data?.data;

    if (status >= 200 && status < 300) {
      return response;
    }

    return response;
  },
  (err) => {
    return err;
  }
);

export default instance;

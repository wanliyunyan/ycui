// 声明正常返回值类型
export interface NormalReturnType<T = any> {
  data: T;
  code: number;
  msg: string;
}

// 声明基础返回值类型
interface BaseReturnType {
  success: boolean;
}

// 声明返回值类型，仅限于 handleData 方法
export type ApiReturnType<T = any> = NormalReturnType<T> & BaseReturnType;

// 声明返回值promise类型，用于定义请求
export type promiseApi<T> = Promise<ApiReturnType<T>>;

// 列表页返回值需要的数据格式
export interface BasicPage<K> {
  pageData: K[];
  total?: number;
  totalMoney?: string;
}

// 请求页面的基础参数
export interface IRequestBasePageParams {
  pageNum: number;
  pageSize: number;
}

export interface IOption {
  method: "GET" | "DELETE" | "HEAD" | "POST" | "PUT" | "PATCH";
  param?: Record<string, unknown>;
}

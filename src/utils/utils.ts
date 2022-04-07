import type { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { FORMAT_DATETIME } from "@/common/constants";
import { ApiReturnType } from "@/api/BasicResponseModel";

/**
 * @description blob格式转file
 * @param file 文件 any类型为了不报错
 */
export const blobToFile = (file: any): File =>
  new window.File([file], file.name, { type: file.type });

/**
 * @description blob格式转base64
 * @param blob 文件
 */
export const blobToBase64 = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      resolve(e.target?.result);
    };
    // readAsDataURL
    fileReader.readAsDataURL(blob);
    fileReader.onerror = () => {
      reject(new Error("blobToBase64 error"));
    };
  });
};

/**
 * @description 处理数据
 * @param result 请求返回值
 * @return Error 或者 对象 Promise<AxiosResponse<T>>
 */
export const handleData = <T>(
  result: AxiosResponse<ApiReturnType<T>>
): ApiReturnType<T> | never => {
  if (result) {
    const { status, data } = result;

    if (!status) {
      throw new Error(result.toString());
    }

    return { ...data, success: data?.code === 200 };
  }
  throw new Error("未知错误，没有获取到任何返回值");
};

/**
 * @description 获取格式化时间
 * @param param 时间
 * @param format 时间
 * @return 格式化后的时间 默认到时分秒
 */
export const getDateTime = (
  param: string | number | Date | undefined,
  format = FORMAT_DATETIME
): string => {
  if (dayjs(param).isValid()) {
    return dayjs(param).format(format);
  }
  return "";
};

/**
 * @description 通过字典map获取column 为 van-picker组件赋值
 * @param param 字典map
 */
export const getColumnByMap = (
  param: Record<string | number, string | number>
): (string | number)[] => {
  return Object.keys(param).map((key) => param[key]);
};

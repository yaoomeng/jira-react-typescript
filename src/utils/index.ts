import { useEffect, useState } from "react";

// 排除空和undefined  但是注意要去除掉0
export const isFalsy = (value: any) => {
  return value === 0 ? false : !value;
};
// 删除对象中属性值为空的项
export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore：无法被执行的代码的错误
    const value = result[key];
    if (isFalsy(value)) {
      // 对象属性删除
      // @ts-ignore：无法被执行的代码的错误
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value: any, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    // 每次在value变化时，设置一个定时器
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    // 每次在上一个useEffect处理完之后再运行
    return () => {
      clearTimeout(timeout);
    };
  }, [delay, value]);
  return debounceValue;
};

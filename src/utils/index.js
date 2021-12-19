// 排除空和undefined  但是注意要去除掉0
export const isFalsy = (value) => {
  return value === 0 ? false : !value;
};
// 删除对象中属性值为空的项
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      // 对象属性删除
      delete result[key];
    }
  });
  return result;
};

export const emptyOrNull = (obj: object) => {
  if (Object.keys(obj).length === 0) return null;
  return obj;
};

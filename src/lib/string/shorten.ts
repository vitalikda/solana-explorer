export const shorten = (str: string, chars = [6, 4] as [number, number]) => {
  if (!str) return "";

  if (str.length <= chars[0] + chars[1]) return str;

  return `${str.slice(0, chars[0])}...${str.slice(-chars[1])}`;
};

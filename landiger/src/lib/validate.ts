export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
// Vietnamese mobile numbers: 0 or +84 followed by 3/5/7/8/9 and 8 more digits.
export const isPhone = (v: string) => /^(0|\+84)(3|5|7|8|9)\d{8}$/.test(v.replace(/[\s.-]/g, ''));
export const isFilled = (v: string, min = 2) => v.trim().length >= min;

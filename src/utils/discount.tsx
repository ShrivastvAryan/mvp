export const calculateDiscount = (mrp: number, price: number): number => {
  if (mrp <= 0) return 0;
  return ((mrp - price) / mrp) * 100;
};
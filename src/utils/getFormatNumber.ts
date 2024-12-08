export const getFormatNumber = (options: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat('en-US', options);
};
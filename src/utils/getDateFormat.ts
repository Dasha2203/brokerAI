export const getDateFormat = (date: string) => {
  const formater = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return formater.format(new Date(date));
};

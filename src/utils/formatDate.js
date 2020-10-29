const locale = "pt-BR";

export default date => {
  if (!date) return null;
  if (date instanceof Date) {
    return date.toLocaleDateString(locale);
  }
  return new Date(date).toLocaleDateString(locale, { timeZone: "UTC" });
};

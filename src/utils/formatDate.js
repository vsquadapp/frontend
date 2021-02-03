const locale = "pt-BR";

export default (date, showHours = false) => {
  const config = {};
  if (showHours) {
    config.hour = "2-digit";
    config.minute = "2-digit";
  }
  if (!date) return null;
  if (date instanceof Date) {
    return date.toLocaleDateString(locale, config);
  }
  config.timeZone = "UTC";
  return new Date(date).toLocaleDateString(locale, config);
};

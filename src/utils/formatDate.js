const locale = "pt-BR";

export default (date, showHours = false) => {
  const config = {};
  if (!date) return null;
  if (date instanceof Date) {
    return date.toLocaleDateString(locale, config);
  }
  config.timeZone = "UTC";

  const resultDate = new Date(date);

  if (showHours) {
    config.hour = "2-digit";
    config.minute = "2-digit";
    resultDate.setHours(resultDate.getHours() - 3);
  }

  return resultDate.toLocaleDateString(locale, config);
};

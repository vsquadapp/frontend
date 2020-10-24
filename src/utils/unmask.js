export default value => {
  const removeDots = value.replace(/\./g, "");
  const removeCommas = removeDots.replace(/,/g, "");
  const intValue = parseInt(removeCommas);
  return intValue;
};

const isInValid = (value) => {
  return value === undefined || value === null || value.toString().trim().length === 0;
};
module.exports = {isInValid}
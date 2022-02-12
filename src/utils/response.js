export const generateResponse = (data, meta) => ({
    values: data,
    meta,
  });
export const generateError = err => ({
    values: err.message,
    meta: err,
});
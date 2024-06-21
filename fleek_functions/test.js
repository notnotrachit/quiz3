export const main = (params) => {
  const { method, path } = params;
  return `Hello World wow, ${method} request to ${path}`;
};

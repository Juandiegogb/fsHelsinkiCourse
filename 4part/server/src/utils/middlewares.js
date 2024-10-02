export const errorHandler = (error, req, res, next) => {
  console.error("custom middleware", error);
  
};

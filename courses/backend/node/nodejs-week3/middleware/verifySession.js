export const verifySession = (request, response, next) => {
  if (!request.session.userId) {
    return response.status(401).json({
      error: "Not authenticated. Please login first",
    });
  }

  next();
};

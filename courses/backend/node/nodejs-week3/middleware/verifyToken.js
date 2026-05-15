import jwt from "jsonwebtoken";

export const verifyToken = (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response.status(401).json({
        error: "Missing or invalid authorization header",
      });
    }

    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, "your-secret-key");

    request.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return response.status(401).json({
        error: "Token has expired",
      });
    }

    console.error("Token verification error:", error);
    return response.status(401).json({
      error: "Invalid token",
    });
  }
};

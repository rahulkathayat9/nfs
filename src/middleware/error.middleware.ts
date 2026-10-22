import type { ErrorRequestHandler } from "express";

const errorMiddleware: ErrorRequestHandler = ({ err, req, res, next }) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

export default errorMiddleware;

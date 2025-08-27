import type { RequestHandler } from "express";
import type { RouteParams } from "../types/index.ts";

const catchAsync = (fn: RouteParams): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;

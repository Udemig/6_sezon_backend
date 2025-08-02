import type { NextFunction, Request, Response } from "express";

export type RouteParams = (req: Request, res: Response, next: NextFunction) => Promise<void>;

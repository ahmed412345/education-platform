import type { Request, Response, NextFunction } from "express";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const wrapperFun = (func: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => func(req, res, next).catch(next);

export { wrapperFun };

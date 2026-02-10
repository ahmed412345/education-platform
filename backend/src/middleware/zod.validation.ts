import type { Response, Request, NextFunction } from "express";

import type { ZodSchema } from "zod";

import { AppError } from "../utils/appErorr.js";

const zodValidate = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const message = result.error.issues
                .map(issue => {
                    const field = issue.path.join(".");
                    //this is condition if there is no field just put the message
                    return field ? field + " : " + issue.message : issue.message;
                })
                .join(" | ");
            return next(new AppError(message, 400, true));
        }

        req.body = result.data;
        next();
    };
};

export { zodValidate };

import type { Request, Response, NextFunction } from "express";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message);

    // Check if headers were already sent to avoid "Headers already sent" error
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.statusCode || 500).json({
        status: "Error",
        message: err.message,
        isExpected: err.isExpected,
        fieldName: err.fieldName,
    });
};

export default errorMiddleware;

import { Request, Response, NextFunction } from 'express';

export function allowAccess(allowedRoles: string[]) {
    return (req: any, res: Response, next: NextFunction) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Forbidden: You don't have enough permissions"
            });
        }
        next();
    };
}

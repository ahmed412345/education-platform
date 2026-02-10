import type { ZodSchema } from "zod";
import { fieldMsg } from "./fieldMsg";
export const zodValidate = (schema: ZodSchema, data: any): boolean => {
    const result = schema.safeParse(data);

    if (!result.success) {
        const { path, message } = result.error.issues[0];

        const elId = path[0] as string;

        if (elId) {
            fieldMsg(elId, message);
        }
        throw new Error(message);
    }
    return data;
};

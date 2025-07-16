import { Injectable } from "@nestjs/common";
import { ZodType } from "zod/v3";

@Injectable()
export class ValidationService {
	async validate<T>(zodType: ZodType<T>, data: T): Promise<T> {
		const validate = await zodType.safeParseAsync(data);
		if (!validate.success) {
			throw new Error(validate.error.message);
		}
		return validate.data;
	}
}

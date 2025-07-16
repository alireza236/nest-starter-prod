import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { ZodType, ZodSchema } from "zod/v3";

@Injectable()
export class ValidationGuard<T extends ZodType<ZodSchema>>
	implements CanActivate
{
	constructor(private readonly schema: T) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request = context.switchToHttp().getRequest();
		await this.schema.parseAsync(request.body);
		return true;
	}
}

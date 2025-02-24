import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { ZodSchema, ZodType } from "zod";

@Injectable()
export class ValidationGuard implements CanActivate {
	constructor(private readonly schema: ZodSchema<ZodType>) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request = context.switchToHttp().getRequest();
		await this.schema.parseAsync(request.body);
		return true;
	}
}

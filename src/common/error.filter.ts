import {
	HttpException,
	ArgumentsHost,
	ExceptionFilter,
	HttpStatus,
	BadRequestException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Response, Request } from "express";
import { ZodError } from "zod/v3";

export class ErrorFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const response: Response = host.switchToHttp().getResponse();
		const request: Request = host.switchToHttp().getRequest();

		if (exception instanceof HttpException) {
			response.status(exception.getStatus()).json({
				errors: exception.getResponse(),
				path: request.url,
				timestamp: new Date().toISOString(),
			});
		} else if (exception instanceof BadRequestException) {
			response.status(exception.getStatus()).json({
				errors: exception.getResponse(),
				path: request.url,
				timestamp: new Date().toISOString(),
			});
		} else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
			response.json({
				errors: exception.name,
				message: exception.message,
			});
		} else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
			response.json({
				error_code: exception.code,
				errors: exception.name,
				message: exception.message,
			});
		} else if (exception instanceof ZodError) {
			response.status(400).json({
				errors: exception.errors.map(({ message, path, code }) => ({
					message,
					path,
					code,
				})),
				path: request.url,
			});
		} else if (exception instanceof Error) {
			response.json({
				errors: exception.name,
				message: exception.message,
				cause: exception.stack,
				path: request.url,
			});
		} else {
			response.status(500).json({
				errors: "Intenal server Error",
				status_code: HttpStatus.INTERNAL_SERVER_ERROR,
			});
		}
	}
}

import {
	Body,
	Controller,
	HttpCode,
	Post,
	Req,
	Res,
	UseGuards,
} from "@nestjs/common";
import { Response, Request } from "express";

import { AuthService } from "@/auth/auth.service";
import { AuthValidation } from "@/auth/auth.validation";
import { ValidationGuard } from "@/common/validation.guard";
import { RegisterUserRequest } from "@/models/auth.model";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("/register")
	@UseGuards(new ValidationGuard(AuthValidation.REGISTER))
	@HttpCode(201)
	async register(
		@Body() request: RegisterUserRequest,
		@Res({ passthrough: true }) response: Response,
		@Req() req: Request,
	) {
		const result = await this.authService.register(request);

		console.log(req.headers["x-requested-with"]);

		response.json({
			message: result.message,
			status: result.status,
		});
	}
}

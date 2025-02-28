import { Injectable, Logger } from "@nestjs/common";

import { RegisterSchema } from "@/auth/auth.validation";
import { ValidationService } from "@/common/validation.service";
import { RegisterUserRequest } from "@/models/auth.model";
import { WebResponse } from "@/models/web.model";
import { UserService } from "@/user/user.service";

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);
	constructor(
		private readonly userService: UserService,
		private readonly validationService: ValidationService,
	) {}

	async register(
		request: RegisterUserRequest,
	): Promise<WebResponse<{ message: string; status: string }>> {
		const validate = await this.validationService.validate(
			RegisterSchema,
			request,
		);

		this.logger.log(`validate ${JSON.stringify(validate)}`);
		return {
			data: {
				message: "confirmation email has been send",
				status: "success",
			},
			metas: {
				"X-Request-ID": "123",
			},
		};
	}
}

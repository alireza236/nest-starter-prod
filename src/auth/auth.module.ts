import { Module } from "@nestjs/common";

import { AuthController } from "@/auth/auth.controller";
import { AuthService } from "@/auth/auth.service";
import { UserService } from "@/user/user.service";

@Module({
	controllers: [AuthController],
	providers: [AuthService, UserService],
})
export class AuthModule {}

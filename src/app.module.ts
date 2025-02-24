import { Module } from "@nestjs/common";

import { AuthModule } from "@/auth/auth.module";
import { CommonModule } from "@/common/common.module";
import { UserModule } from "@/user/user.module";

@Module({
	imports: [CommonModule, AuthModule, UserModule],
})
export class AppModule {}

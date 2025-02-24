import { Injectable, Logger } from "@nestjs/common";

import { PrismaService } from "@/common/prisma.service";

@Injectable()
export class UserService {
	private readonly logger = new Logger(UserService.name);
	constructor(private readonly prismaService: PrismaService) {}
}

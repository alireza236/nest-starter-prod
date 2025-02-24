import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { PrismaClient } from "@prisma/client";
import { LoggerModule } from "nestjs-pino";
import pino from "pino";

import { ErrorFilter } from "@/common/error.filter";
import { PrismaService } from "@/common/prisma.service";
import { ValidationService } from "@/common/validation.service";
import { configuration } from "@/config/configuration";
import { validationSchema } from "@/config/validation.config";

@Global()
@Module({
	imports: [
		LoggerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				pinoHttp: {
					logger: pino({
						name: config.getOrThrow<string>("APP_NAME"),
						level:
							config.getOrThrow<string>("NODE_ENV") !== "production"
								? "debug"
								: "info",
						timestamp: pino.stdTimeFunctions.isoTime,
						serializers: {
							err: pino.stdSerializers.err,
							req: pino.stdSerializers.req,
							res: pino.stdSerializers.res,
						},
						transport:
							config.getOrThrow<string>("NODE_ENV") !== "production"
								? {
										target: "pino-pretty",
										options: {
											colorize: true,
										},
									}
								: undefined,
					}),
				},
			}),
		}),
		ConfigModule.forRoot({
			envFilePath: `${process.cwd()}/src/config/env/${process.env.NODE_ENV}.env`,
			load: [configuration],
			validationSchema: validationSchema,
			isGlobal: true,
		}),
	],
	providers: [
		PrismaService,
		PrismaClient,
		ValidationService,
		{
			provide: APP_FILTER,
			useClass: ErrorFilter,
		},
	],
	exports: [PrismaService, ValidationService],
})
export class CommonModule {}

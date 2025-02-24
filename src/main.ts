if (process.env.NODE_ENV === "production") {
	require("module-alias/register");
}

import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import helmet from "helmet";
import { Logger } from "nestjs-pino";

import { AppModule } from "@/app.module";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		bufferLogs: true,
	});

	const configService = app.get(ConfigService);

	app.enableCors({
		origin: configService.getOrThrow<string>("FRONTEND_URL"),
	});

	app.use(cookieParser());
	app.use(compression());
	app.use(
		helmet({
			contentSecurityPolicy: true,
		}),
	);
	app.useLogger(app.get(Logger));
	app.flushLogs();
	app.enableShutdownHooks();

	const port = configService.getOrThrow<number>("PORT");
	await app.listen(port);
}

bootstrap();

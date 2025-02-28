import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient, Prisma } from "@prisma/client";
import { Logger } from "nestjs-pino";

@Injectable()
export class PrismaService
	extends PrismaClient<Prisma.PrismaClientOptions, string>
	implements OnModuleInit, OnModuleDestroy
{
	constructor(
		private readonly logger: Logger,
		private readonly configService: ConfigService,
	) {
		super({
			log: [
				{
					emit: "event",
					level: "info",
				},
				{
					emit: "event",
					level: "warn",
				},
				{
					emit: "event",
					level: "error",
				},
				{
					emit: "event",
					level: "query",
				},
			],
			datasources: {
				db: {
					url: configService.getOrThrow<string>("DATABASE_URL"),
				},
			},
		});
	}
	async onModuleInit() {
		await this.$connect();
		if (this.configService.getOrThrow<string>("NODE_ENV") === "development") {
			this.$on("info", (e) => {
				this.logger.log(e);
			});
			this.$on("warn", (e) => {
				this.logger.warn(e);
			});
			this.$on("error", (e) => {
				this.logger.error(e);
			});
			this.$on("query", (e) => {
				this.logger.debug(e);
			});
		}
	}

	async OnErrorEventHandler() {
		await this.OnErrorEventHandler();
		this.logger.error("error", "Connection to the database failed");
	}

	async onModuleDestroy() {
		await this.$disconnect();
		this.logger.log("info", "App is restarting");
	}
}

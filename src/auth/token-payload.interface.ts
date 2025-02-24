export interface ITokenPayload {
	userId?: string;
	username?: string;
	email?: string;
	image?: string;
	accessToken: string;
	refreshToken: string;
	expiresAccessToken: Date;
	expiresRefreshToken: Date;
}

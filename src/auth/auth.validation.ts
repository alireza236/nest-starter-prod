import { z, ZodSchema } from "zod/v3";

export const RegisterSchema = z
	.object({
		name: z
			.string()
			.trim()
			.max(50, { message: "Name cannot exceed 50 characters." })
			.regex(/^[a-zA-Z0-9_]+$/, {
				message: "Username can only contain letters, numbers, and underscores.",
			})
			.optional(),
		username: z
			.string()
			.trim()
			.min(3, { message: "Username must be at least 3 characters long." })
			.max(30, { message: "Username cannot exceed 30 characters." }),
		email: z
			.string()
			.trim()
			.min(1, { message: "Email is required." })
			.email({ message: "Please provide a valid email address." }),
		password: z
			.string()
			.trim()
			.min(6, { message: "Password must be at least 6 characters long." })
			.max(100, { message: "Password cannot exceed 100 characters." })
			.regex(/[A-Z]/, {
				message: "Password must contain at least one uppercase letter.",
			})
			.regex(/[a-z]/, {
				message: "Password must contain at least one lowercase letter.",
			})
			.regex(/[0-9]/, { message: "Password must contain at least one number." })
			.regex(/[^a-zA-Z0-9]/, {
				message: "Password must contain at least one special character.",
			}),
		confirmPassword: z
			.string({
				message: "confirm password is required",
			})
			.trim()
			.min(6, {
				message:
					"Confirm password is required and must be at least 6 characters.",
			}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "password does not match",
	});

export class AuthValidation {
	static readonly REGISTER: ZodSchema = RegisterSchema;
}

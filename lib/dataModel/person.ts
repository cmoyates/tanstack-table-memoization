import z from "zod";

export const PersonSchema = z.object({
	id: z.uuid(),
	index: z.number(),
	name: z.string().min(1).max(100),
	avatar: z.url(),
	email: z.email(),
	age: z.number().min(0).optional(),
	createdAt: z.date(),
	updatedAt: z.date().optional(),
	employed: z.boolean().default(false),
});

export type Person = z.infer<typeof PersonSchema>;

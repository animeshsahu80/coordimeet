import { z } from "zod";

export const formSchema = z.object({
    username: z
      .string()
      .min(4, {
        message: "Username must be at least 4 characters.",
      })
      .max(20, {
        message: "Username can be at max 20 characters.",
      })
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
  });
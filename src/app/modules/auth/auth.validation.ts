import { z } from "zod";

const loginUser = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

export const authValidation = {
  loginUser,
};

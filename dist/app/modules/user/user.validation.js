"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        role: zod_1.z.nativeEnum(user_constant_1.USER_ROLE).default(user_constant_1.USER_ROLE.user),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email("Invalid email address"),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        // address: z.string({
        //   required_error: "Address is required",
        // }),
        // phone: z.string({
        //   required_error: "Phone number is required",
        // }),
    }),
});
const UpdateUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }).optional(),
        role: zod_1.z.nativeEnum(user_constant_1.USER_ROLE).default(user_constant_1.USER_ROLE.user).optional(),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email("Invalid email address").optional(),
        password: zod_1.z.string({
            required_error: "Password is required",
        }).optional(),
        address: zod_1.z.string({
            required_error: "Address is required",
        }).optional(),
        phone: zod_1.z.string({
            required_error: "Phone number is required",
        }).optional(),
    }),
});
exports.UserValidations = {
    createUser,
    UpdateUser
};

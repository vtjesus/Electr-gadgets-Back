/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { USER_ROLE } from "./user.constant";
import bcrypt from "bcrypt";
import config from "../../config";

export const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    // phone: {
    //   type: String,
    //   required: [true, "Phone Number is Required"],
    // },
    role: {
      type: String,
      required: [true, "Role is Required"],
      enum: Object.keys(USER_ROLE),
    },
    // address: {
    //   type: String,
    //   required: [true, "Address is Required"],
    // },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt_round));
  next();
});

// userSchema.post("save", function (doc, next) {
//   doc.password = "";
//   next();
// });

export const User = model<TUser>("User", userSchema);

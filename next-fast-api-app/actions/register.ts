"use server";

import * as z from "zod";
// import bcrypt from "bcryptjs";

// import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
// import { getUserByEmail } from "@/data/user";
// import { sendVerificationEmail } from "@/lib/mail";
// import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, fullname, username } = validatedFields.data;

  // Send Data in JSON Format

  const signup_request = await fetch(`${process.env.BACKEND_URL}/api/auth/users/signup/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "username": username,
      "email": email,
      "full_name": fullname,
      "password": password
    }),
    cache: "no-store",
  });

  console.log('signup_request', signup_request.status, signup_request.statusText);
  

  if (signup_request.status !== 200) {
    const error = await signup_request.json();
    return { error: error.detail };
  }

  return { success: "Signup Success - Please Login!" };
};

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { db, client } from "./db";

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  trustedOrigins: process.env.NODE_ENV === 'production' 
    ? ["https://learnwithrobiulislam.vercel.app"] 
    : [],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "placeholder",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder",
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID || "placeholder",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "placeholder",
    },
  },
});

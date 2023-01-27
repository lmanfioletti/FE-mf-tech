import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { firebaseConfig } from "../../../services/firebase";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    pages: {
        signIn: "/",
        error: "/",
    },
    adapter: FirestoreAdapter({ ...firebaseConfig }),
});
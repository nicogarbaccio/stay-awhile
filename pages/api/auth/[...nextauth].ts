import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb"

export const authOptions: AuthOptions = {
    // Specifying the adapter to be used for authentication with the PrismaAdapter
    adapter: PrismaAdapter(prisma),
    // Configuring providers such as GithubProvider, GoogleProvider, and CredentialsProvider
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text"},
                password: { label: "password", type: "password"}
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials")
                }
                // Querying the Prisma user object based on the email provided
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                // If the user object or hashedPassword field is empty, throw an error
                if (!user || !user.hashedPassword) {
                    throw new Error("Invalid credentials")
                }
                // Comparing the entered password with the hashed password in the user object
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );
                // If the entered password is incorrect, throw an error
                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials")
                }
                // If the entered credentials are valid, return the user object
                return user;
            }
        })
    ],
    // Specifying the pages to be used for authentication such as sign in
    pages: {
        signIn: "/",
    },
    // Enable debug only if in development
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
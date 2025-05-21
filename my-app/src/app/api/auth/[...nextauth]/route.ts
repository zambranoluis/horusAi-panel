import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Asegúrate de que el alias @ está configurado en tsconfig.json

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

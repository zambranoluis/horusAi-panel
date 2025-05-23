import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { getToken } from "next-auth/jwt";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Obtener el token del usuario usando NextAuth
    const tokenData = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const token = tokenData?.accessToken;

    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Realizar la llamada al endpoint de logout en Spring Boot
    const response = await axios.post(`${BACKEND_URL}/users/logout`, null, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      console.log("Error during logout:", err.response?.data || err.message);

      return NextResponse.json(
        { error: err.response?.data || err.message },
        { status: err.response?.status || 500 }
      );
    } else if (error instanceof Error) {
      console.log("Error during logout:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.log("Unknown error during logout");
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}

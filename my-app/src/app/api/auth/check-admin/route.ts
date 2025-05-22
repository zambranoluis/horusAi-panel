import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;
const API_KEY = process.env.API_KEY as string;

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json(); // ← lee el JSON correctamente
    const email = body.email;

    const response = await axios.post(
      `${BACKEND_URL}/users/check-admin`,
      { email: email },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
      },
    );

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      console.error("Error during check-admin:", err.response?.data || err.message);
      return NextResponse.json(
        { error: err.response?.data || err.message },
        { status: err.response?.status || 500 },
      );
    } else if (error instanceof Error) {
      console.error("Error during check-admin:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.error("Unknown error during check-admin");
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

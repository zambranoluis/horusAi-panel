import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_NEXT_API_URL as string;
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/logout`, null, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

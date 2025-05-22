import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

interface DecodedToken {
  exp: number; // Tiempo de expiración en segundos (UNIX timestamp)
  [key: string]: unknown; // Otras propiedades opcionales
}

export default function useTokenExpirationCheck(): void {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.accessToken) return;

    const decoded: DecodedToken = jwtDecode(session.accessToken);
    const exp = decoded.exp;
    const currentTime = Math.floor(Date.now() / 1000);

    const secondsUntilExpiration = exp - currentTime;
    const warningBefore = 2 * 60; // 2 minutos

    if (secondsUntilExpiration <= 0) {
      signOut({ callbackUrl: "/" });
      return;
    }

    if (secondsUntilExpiration <= warningBefore) {
      showExpirationWarning();
    } else {
      const timeout = setTimeout(() => {
        showExpirationWarning();
      }, (secondsUntilExpiration - warningBefore) * 1000);

      return () => clearTimeout(timeout);
    }

    function showExpirationWarning() {
      Swal.fire({
        title: "⚠️ Your session is about to expire",
        text: "You will be logged out automatically and redirected to the login page.",
        icon: "warning",
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: warningBefore * 1000,
        timerProgressBar: true,
        didOpen: () => {
          const timer = setTimeout(() => {
            signOut({ callbackUrl: "/" });
          }, warningBefore * 1000);

          return () => clearTimeout(timer);
        },
      }).then(() => {
        signOut({ callbackUrl: "/" });
      });
    }
  }, [session?.accessToken]);
}

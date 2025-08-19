import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserState, useSnackbarState } from "@/hooks/useGlobalState";

export function useRequireSignedIn() {
  const [user] = useUserState();
  const [, setSnackbar] = useSnackbarState();
  const router = useRouter();

  useEffect(() => {
    if (user.isFetched && !user.isSignedIn) {
      setSnackbar({
        message: "サインインしてください",
        severity: "error",
        pathname: "/sign_in",
      });
      router.push("/sign_in");
    }
  }, [setSnackbar, user, router]);
}

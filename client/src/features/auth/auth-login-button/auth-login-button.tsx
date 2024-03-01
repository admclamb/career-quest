import { Button } from "@/components/ui/button";
import { useAuthLoginButton } from "./auth-login-button.hooks";
import { ReactNode } from "react";

type Props = {
  variant?:
    | "secondary"
    | "default"
    | "destructive"
    | "outline"
    | "ghost"
    | "link"
    | null
    | undefined;
  children?: ReactNode;
};
const AuthLoginButton = ({ variant = "ghost", children }: Props) => {
  const { handleLogin } = useAuthLoginButton();

  return (
    <Button onClick={handleLogin} variant={variant}>
      {children}
    </Button>
  );
};

export default AuthLoginButton;
